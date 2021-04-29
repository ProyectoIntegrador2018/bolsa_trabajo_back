
// CRUD Basic Template
import * as express from 'express';
import * as admin from 'firebase-admin';
import { UsersCollection } from "../helpers/collections";
import { kUSER_STATES } from '../helpers/constants';
import { AuthRequest } from '../model/AuthRequest';
import { User } from '../model/User';

export const userService = {
  read,
  register,
};

/*
  Default structure for 200/500 json resposes.
  result: {
    message: "Message indicating success."
  }
*/

// Returns self.
async function read(req: AuthRequest, res: any) {
  if (req.user == undefined) throw "Undefined user.";
  const userDoc = await UsersCollection.doc(req.user.id).get();
  const user = {id: req.user.id, ...userDoc.data()} as User;
  res.status(200).json(user);
  return;
}

// AUTHORIZATION: UserSchema validates that only users of type
//                'employee' and 'company' can be created.
async function register(req: express.Request, res: express.Response) {
  const data = req.body;

  // Create auth user
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
    res.status(403).json({message: "No se pudo registrar el usuario."});
    return;
  }

  // Create db user
  const id = userRecord?.uid;
  const createdBy = id;
  const user_obj = {
    username: data.username,
    email: data.email,
    type: data.type,
    state: kUSER_STATES.inactive,
    createdBy: createdBy,
  };
  const writeResult = await UsersCollection.doc(id).set(user_obj);
  const userJson = { id, ...user_obj };
  console.log(`${req.body.type} ${JSON.stringify(userJson)} created at ${writeResult.writeTime.toDate().toString()} by ${createdBy}`);
  res.status(200).json(userJson);
  return;
}