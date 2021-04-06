import { User } from "../model/User";
import { UsersCollection } from "./collections";
import { kPERMISISON_NUMBER } from "./constants";

// TODO: Move this function to utility
export function ERROR_checkReqFields(required_fields: string[], data: any) {
  const missing_fields: string[] = [];
  required_fields.forEach(field => {
    if (data[field] == undefined) {
      missing_fields.push(field);
    }
  });
  if (missing_fields.length > 0) {
    const error_msg = `Request has missing fields: ${missing_fields}`;
    console.error(error_msg);
    // TODO: Create custom ERRORS and an error handler
    throw error_msg;
  }
}

// Usage:
//   If you want a user that is at least an admin,
//      desiredUserType => admin
//      currUserType => req.user?.type
export function hasPermission(desiredUserType: string, currUserType: string | undefined): boolean {
  const currPermValue = kPERMISISON_NUMBER.get(currUserType);
  const desiredPermValue = kPERMISISON_NUMBER.get(desiredUserType);
  return currPermValue >= desiredPermValue;
}

export function getUpdateObj(possible_fields: string[], data: any) {
  const obj: any = {};
  possible_fields.forEach(field => {
    if (data[field] != undefined) {
      obj[field] = data[field];
    }
  })
  return obj;
}

export function getAdminFormat(admin: User) {
  return `${admin.type}(${admin.id}):${admin.username}`;
}

export async function getUserById(id: string): Promise<User> {
  const user_doc = await UsersCollection.doc(id).get();
  if (!user_doc.exists) throw `User with id(${id} doesn't exist.)`;
  const user = {id, ...user_doc.data()} as User;
  return user;
}

export function validateRequest(req: any, res: any, next: any, schema: any) {
  console.log("Entrant request:");
  console.log(req.body);
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    // TODO: Fix this message to only contain missing fields.
    // const message = `Validation error: ${error.details.map((x: any) => x.message).join(', ')}`;
    console.error(error);
    res.status(403).json({message: "Missing fields"})
  } else {
    req.body = value;
    console.log("Validated request:")
    console.log(req.body)
    next();
  }
}

export function phoneNumberRegex(): RegExp {
  return /^\+[0-9][0-9]?[0-9]{10}$/;
}