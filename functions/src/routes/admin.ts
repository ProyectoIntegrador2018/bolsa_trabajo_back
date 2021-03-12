// CRUD Basic Template
import * as express from 'express';
import * as admin from 'firebase-admin';
import { UsersCollection } from "../helpers/collections";
import { ERROR_checkReqFields } from '../helpers/utility';
import { AuthRequest } from "../model/AuthRequest";

export const adminService = {
  create,
  read,
  update,
  deletee,
};

// AUTHORIZATION: Only other admins can create admins. (middleware isAdmin)
async function create(req: AuthRequest, res: express.Response) {
  const required_fields = ["username", "phoneNumber", "email", "password"];
  const data = req.body;

  // This ends execution onError
  ERROR_checkReqFields(required_fields, data);
  
  // TODO: Create middleware that validates required fields.
  // Receive this in req sent by the middleware, use this for auditing.
  const createdBy = "CREADOR-DE-ADMINS";
  
  // Create admin auth user
  let userRecord = null;
  try {
    userRecord = await admin.auth().createUser({
      email: data.email,
      emailVerified: data.emailVerified,
      phoneNumber: data.phoneNumber,
      password: data.password,
      disabled: false,
    });
  } catch (error) {
    console.error(`Couldn't create auth user. ${error}`);
    res.status(403).send("No se pudo crear el usuario.");
    return;
  }

  // Create db user
  const id = userRecord?.uid;
  const admin_obj = {
    username: data.username,
    email: data.email,
    type: "admin",
    createdBy,
  };
  const writeResult = await UsersCollection.doc(id).set(admin_obj);
  const userJson = { id, ...admin_obj };
  console.log(`Admin ${JSON.stringify(userJson)} created at ${writeResult.writeTime}`);
  res.status(200).json(userJson);
}

async function read(req: any, res: any) {

}

async function update(req: any, res: any) {

}

async function deletee(req: any, res: any) {

}