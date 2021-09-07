
// CRUD Basic Template
import * as express from 'express';
import * as admin from 'firebase-admin';
import { EnrollmentFormsCollection, UsersCollection } from "../helpers/collections";
import { kUSER_STATES } from '../helpers/constants';
import { AuthRequest } from '../model/AuthRequest';
import { EmployeeEnrollmentFormat } from '../model/EnrollmentFormats/EmployeeEnrollmentForm';
import { User } from '../model/User';

export const userService = {
  filter,
  read,
  register,
};

/*
  Default structure for 200/500 json resposes.
  result: {
    message: "Message indicating success."
  }
*/

/*
  EXPENSIVE AF. Try to not use it a lot. Or use different impl.
  Filters users by fields: 
    - municipio, 
    - secciones.actividad_deseada.jornada_de_trabajo, 
    - secciones.ultimo_ejemplo_o_actividad.puesto, 
    - secciones.nivel_de_estudios.nivel_escolar
*/
async function filter(req: AuthRequest, res: any) {
  if (req.user == undefined) throw "Undefined user.";
  const {field, operator, target} = req.body;
  const formDocs = await EnrollmentFormsCollection.where(`enrollmentForm.${field}`, operator, target).get();
  let employeeIds: Array<string> = [];
  formDocs.forEach(formDoc => {
    const data = {id: formDoc.id, ...formDoc.data()} as EmployeeEnrollmentFormat;
    employeeIds.push(data.userId);
  });
  if (employeeIds.length == 0) {
    res.status(200).json({});
    return;
  }
  const users: Array<User> = [];
  // EXPENSIVE PART:
  // Firestore's IN query supports maximum 10 values per read. So we need
  // to fragment the employeeIds array in groups of max 10 values.
  // Gets how many arrays of 10 max values we need.
  const n = Math.floor(employeeIds.length / 10) + ((employeeIds.length % 10) ? 1 : 0);
  for (let i = 0; i < n; i++) {
    const cursor = 10 * i;
    const currEmpIds = employeeIds.slice(cursor, cursor + 10);
    const userDocs = await UsersCollection.where(
      admin.firestore.FieldPath.documentId(), "in", currEmpIds).get();
    userDocs.forEach(userDoc => {
      const user = {id: userDoc.id, ...userDoc.data()} as User;

      // TODO: quick fix, better to filter on query
      if(user.type == "employee") {
        users.push(user);
      }
    });
  }
  res.status(200).json({users});
  return;
}

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