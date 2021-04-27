import express = require("express");
import { EnrollmentFormsCollection, UsersCollection } from "../helpers/collections";
import { getCurrSeconds, getUserFormat, getWriteResultDate } from "../helpers/utility";
import { AuthRequest } from "../model/AuthRequest";

export const enrollmentService = {
  createFormat,
};

// IMPORTANT: If user creates new enrollmentForm ios important to have in mind
//  that there will exist N enrollmentForms referencing the userId that created it.
//  Users will only reference the latest created enrollmentForm though.
async function createFormat(req: AuthRequest, res: express.Response) {
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