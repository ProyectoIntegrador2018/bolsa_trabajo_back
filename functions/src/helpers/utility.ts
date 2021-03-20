import { User } from "../model/User";
import { UsersCollection } from "./collections";

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

export function getUpdateObj(possible_fields: string[], data: any) {
  const obj: any = {};
  possible_fields.forEach(field => {
    if (data[field] != undefined) {
      obj[field] = data[field];
    }
  })
  return obj;
}

export async function getUserById(id: string): Promise<User> {
  const user_doc = await UsersCollection.doc(id).get();
  const user = {id, ...user_doc.data()} as User;
  return user;
}