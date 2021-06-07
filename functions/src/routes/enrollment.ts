import express = require("express");
import { EnrollmentFormsCollection, UsersCollection } from "../helpers/collections";
import { kUSERS } from "../helpers/constants";
import { getCurrSeconds, getUserById, getUserFormat, getWriteResultDate } from "../helpers/utility";
import { AuthRequest } from "../model/AuthRequest";

export const enrollmentService = {
  readForm,
  createForm,
};

// IMPORTANT: If user creates new enrollmentForm ios important to have in mind
//  that there will exist N enrollmentForms referencing the userId that created it.
//  Users will only reference the latest created enrollmentForm though.
async function createForm(req: AuthRequest, res: express.Response) {
  if (req.user == undefined) throw "Undefined user.";
  const enrollmentMetadata = { createdAt: getCurrSeconds() }
  const enrollmentForm = { userId: req.user.id, enrollmentForm: req.body, enrollmentMetadata};
  const formRef = EnrollmentFormsCollection.doc();
  try {
    const formWResult = await formRef.create(enrollmentForm);
    console.log(`${getUserFormat(req.user)} created enrollment form at ${getWriteResultDate(formWResult)}`);
    const userWResult = await UsersCollection.doc(req.user?.id).update({
      enrollmentFormId: formRef.id,
    });
    console.log(`Linked enrollment form(${formRef.id}) to ${getUserFormat(req.user)} at ${getWriteResultDate(userWResult)}`);
  } catch (error) {
    console.error(error);
    res.status(403).json({message: "Unable to create enrollment form."});
    return;
  }
  res.status(200).json({message: "Succesfully added enrollment format."});
  return;
}

async function readForm(req: AuthRequest, res: express.Response) {
  if (req.user == undefined) throw "Undefined user.";
  let isAuthorized = true;
  const paramsId = req.params.id;
  const currId = req.user.id;
  const user = await getUserById(paramsId);
  // Authorization check:
  // employee: can only see their own form
  // company: can see their own form and employees forms
  // admins & super-admins: can see their own form and company and employees forms
  if (paramsId != currId) {
    if (req.user.type == kUSERS.employee) {
      if (user.type != kUSERS.company)
        isAuthorized = false;
    } else if (req.user.type == kUSERS.company) {
      if (user.type != kUSERS.employee)
        isAuthorized = false;
    }
    else if (req.user.type == kUSERS.admin || req.user.type == kUSERS.superAdmin) {
      if (user.type == kUSERS.admin || user.type == kUSERS.superAdmin)
        isAuthorized = false;
    }
  }
  if (!isAuthorized) {
    res.status(403).json({message: "Unauthorized."});
    return;
  }
  if (user.enrollmentFormId == undefined) {
    res.status(200).json({message: "El usuario no tiene formulario registrado."});
    return;
  }
  try {
    const enrollmentDoc = await EnrollmentFormsCollection.doc(user.enrollmentFormId).get();
    const form = {id: enrollmentDoc.id, ...enrollmentDoc.data()};
    // NOTE: It's returned as "form" and not "{form}"" on purpose.
    res.status(200).json(form);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "No se encontro el formulario del usuario."});
    return;
  }
}
