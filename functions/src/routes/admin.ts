// CRUD Basic Template
import * as express from 'express';
import * as admin from 'firebase-admin';
import { UsersCollection } from "../helpers/collections";
import { ERROR_checkReqFields, getUpdateObj, getUserById } from '../helpers/utility';
import { AuthRequest } from "../model/AuthRequest";

export const adminService = {
  create,
  read,
  update,
  deletee,
};

// AUTHORIZATION: Only other admins can create admins. (middleware isAdmin)
async function create(req: AuthRequest, res: express.Response) {
  if (req.user == undefined) throw "Undefined user.";
  const required_fields = ["username", "phoneNumber", "email", "password"];
  const data = req.body;

  // This ends execution onError
  ERROR_checkReqFields(required_fields, data);
  
  // TODO: Create middleware that validates required fields.
  // Receive this in req sent by the middleware, use this for auditing.
  const createdBy = req.user?.id;
  
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
  console.log(`Admin ${JSON.stringify(userJson)} created at ${writeResult.writeTime} by ${createdBy}`);
  res.status(200).json(userJson);
}

// Authorization: Only admins can see other admins.
// Returns a list of every admin users.
async function read(req: any, res: any) {
  const admins: any[] = []
  const adminsDoc = await UsersCollection.where("type", "==", "admin").get();
  adminsDoc.forEach(doc => {
    admins.push({id: doc.id, ...doc.data()});
  });
  res.status(200).json(admins);
}

// Authorization: Only admins can update other admins.
// Receives fields to update 
async function update(req: AuthRequest, res: any) {
  if (req.user == undefined) throw "Undefined user.";
  const possible_fields = ["username", "phoneNumber", "email", "password"];
  const data = req.body;
  const obj = getUpdateObj(possible_fields, data);
  console.log(obj);
  let writeResult = null;
  try {
    writeResult = await UsersCollection.doc(req.user.id).update(obj);
  } catch (error) {
    console.error(`Failed to update admin(${req.user.id}):${req.user.username}. ${error}`)
    res.status(500).json({message: "Failed to update admin."});
    return;
  }
  const new_admin = await getUserById(req.user.id);
  console.log(`Updated admin from ${req.user} to ${new_admin}, in ${writeResult.writeTime.toDate().toString()}.`);
  res.status(200).json(new_admin);
}

async function deletee(req: any, res: any) {
}