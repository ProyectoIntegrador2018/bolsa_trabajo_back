import { Job } from "../model/Job/Job";
import { Match } from "../model/Match";
import { User } from "../model/User";
import { JobsCollection, MatchesCollection, UsersCollection } from "./collections";
import { kPERMISISON_NUMBER, kUSERS } from "./constants";

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

export function getObjFromData(possible_fields: string[], data: any) {
  const obj: any = {};
  possible_fields.forEach(field => {
    if (data[field] != undefined) {
      obj[field] = data[field];
    }
  })
  return obj;
}

export function getUserFormat(user: User) {
  return `${user.type}(${user.id}):${user.username}`;
}

export async function getUserById(id: string): Promise<User> {
  //TODO: Wrap this around try/catch block to not leak stack trace to front-end.
  const user_doc = await UsersCollection.doc(id).get();
  if (!user_doc.exists) throw `User with id(${id} doesn't exist.)`;
  const user = {id, ...user_doc.data()} as User;
  return user;
}

export async function getJobById(id: string): Promise<Job> {
  //TODO: Wrap this around try/catch block to not leak stack trace to front-end.
  const job_doc = await JobsCollection.doc(id).get();
  if (!job_doc.exists) throw `Job with id(${id} doesn't exist.)`;
  const job = {id, ...job_doc.data()} as Job;
  return job;
}

export async function getMatchById(id: string): Promise<Match> {
  //TODO: Wrap this around try/catch block to not leak stack trace to front-end.
  const match_doc = await MatchesCollection.doc(id).get();
  if (!match_doc.exists) throw `Match with id(${id} doesn't exist.)`;
  const match = {id, ...match_doc.data()} as Match;
  return match;
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

export async function isUserType(id: string, desiredType: kUSERS): Promise<boolean> {
  const user = await getUserById(id);
  return user.type == desiredType;
}

export async function jobBelongsTo(userId: string, jobId: string): Promise<boolean> {
  const job = await getJobById(jobId);
  return userId == job.createdBy;
}

export async function matchBelongsTo(userId: string, matchId: string): Promise<boolean> {
  const match = await getMatchById(matchId);
  return (userId == match.company.id || userId == match.employee.id);
}

export function getWriteResultDate(writeResult: FirebaseFirestore.WriteResult): string {
  return writeResult.writeTime.toDate().toString();
}

export function getCurrSeconds() {
  return Math.floor(Date.now() / 1000);
}

export function phoneNumberRegex(): RegExp {
  return /^\+[0-9][0-9]?[0-9]{10}$/;
}
