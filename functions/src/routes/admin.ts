// CRUD Basic Template
import * as express from 'express';
import * as admin from 'firebase-admin';
import { UsersCollection } from "../helpers/collections";
import { kADMIN_TYPES } from '../helpers/constants';
import { getUpdateObj, getUserById, hasPermission } from '../helpers/utility';
import { AuthRequest } from "../model/AuthRequest";
import { User } from '../model/User';

export const adminService = {
  create,
  read,
  update,
  deletee,
};

/*
  Default structure for 200/500 json resposes.
  result: {
    message: "Message indicating success."
  }
*/

// AUTHORIZATION: Only other admins can create admins. (middleware isAdmin)
async function create(req: AuthRequest, res: express.Response) {
  if (req.user == undefined) throw "Undefined user.";
  const data = req.body;

  if (!hasPermission(req.body.type, req.user?.type)) {
    res.status(401).json({message: "Unauthorized"});
    return;
  }
  
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
    res.status(403).json({message: "No se pudo crear el usuario."});
    return;
  }

  // Create db user
  const id = userRecord?.uid;
  const admin_obj = {
    username: data.username,
    email: data.email,
    type: data.type,
    createdBy,
  };
  const writeResult = await UsersCollection.doc(id).set(admin_obj);
  const userJson = { id, ...admin_obj };
  console.log(`${req.body.type} ${JSON.stringify(userJson)} created at ${writeResult.writeTime.toDate().toString()} by ${createdBy}`);
  res.status(200).json(userJson);
  return;
}

function getAdminsICanSee(adminType: string) {
  const admins: any = [];
  kADMIN_TYPES.forEach(currType => {
    if (hasPermission(currType, adminType)) {
      admins.push(currType);
    }
  });
  return admins;
}

// Authorization: Only admins can see other admins.
// Returns a list of every admin users.
async function read(req: AuthRequest, res: any) {
  if (req.user == undefined) throw "Undefined user.";
  const admins: any = {}
  const adminTypes = getAdminsICanSee(req.user.type);
  adminTypes.forEach((adminType: string) => { admins[`${adminType}s`] = []; });
  const adminsDoc = await UsersCollection.where("type", "in", adminTypes).get();
  adminsDoc.forEach(doc => {
    const currAdmin = {id: doc.id, ...doc.data()} as User;
    admins[`${currAdmin.type}s`].push(currAdmin);
  });
  res.status(200).json(admins);
  return;
}

// Authorization: Only admins can update other admins.
// Receives fields to update 
// TODO: Update password, from front end with FIREBASE AUTH LIBRARY:
//       https://firebase.google.com/docs/auth/web/manage-users#set_a_users_password
async function update(req: AuthRequest, res: any) {
  if (req.user == undefined) throw "Undefined user.";
  const possible_fields = ["username", "phoneNumber", "email"];
  const data = req.body;
  const obj = getUpdateObj(possible_fields, data);
  console.log(obj);
  let writeResult = null;
  try {
    writeResult = await UsersCollection.doc(req.user.id).update(obj);
  } catch (error) {
    console.error(`Failed to update admin(${req.user.id}):${req.user.username}. ${error}`)
    res.status(403).json({message: "Failed to update admin."});
    return;
  }
  const new_admin = await getUserById(req.user.id);
  console.log(`Updated admin from ${req.user} to ${new_admin}, in ${writeResult.writeTime.toDate().toString()}.`);
  res.status(200).json(new_admin);
  return;
}

async function deletee(req: AuthRequest, res: any) {
  if (req.user == undefined) throw "Undefined user.";
  console.log(`Deleting admin(${req.user.id}):${req.user.username}.`)
  
  try {
    await admin.auth().deleteUser(req.user.id);
    console.log(`Deleted admin(${req.user.id}):${req.user.username}, from Google Auth in ${Date().toString()}.`)
  } catch (error) {
    console.error(`Failed to delete admin(${req.user.id}):${req.user.username} from Google Auth. ${error}`)
    res.status(403).json({message: "Failed to delete admin."});
    return;
  }

  try {
    const writeResult = await UsersCollection.doc(req.user.id).delete();
    console.log(`Deleted admin(${req.user.id}):${req.user.username}, from Users Collection in ${writeResult.writeTime.toDate().toString()}.`)
  } catch (error) {
    console.error(`Failed to delete admin(${req.user.id}):${req.user.username} from Users Collection. ${error}`)
  }

  res.status(200).json({message: "Deleted admin succesfully."})
  return;
}