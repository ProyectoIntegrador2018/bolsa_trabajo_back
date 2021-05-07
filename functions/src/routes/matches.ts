// CRUD Basic Template
import * as express from 'express';
import { MatchesCollection } from "../helpers/collections";
import { kUSERS } from '../helpers/constants';
import { getCurrSeconds, getUserFormat, getWriteResultDate, isUserType } from '../helpers/utility';
import { AuthRequest } from '../model/AuthRequest';
import { Match } from '../model/Match';

export const matchesService = {
  create,
  read,
};

/*
  Default structure for 200/500 json resposes.
  result: {
    message: "Message indicating success."
  }
*/

// Returns self.
async function create(req: AuthRequest, res: any) {
  if (req.user == undefined) throw "Undefined user.";
  const matchMetadata = { createdAt: getCurrSeconds() };
  const data = req.body;
  const isValidEmployee = await isUserType(data.employeeId, kUSERS.employee);
  if (!isValidEmployee) {
    console.error(`${data.employeeId} is not a valid employee.`);
    res.status(403).json({message: "Empleado invalido."});
    return;
  }
  const matchRef = MatchesCollection.doc();
  const {employeeId, description} = data;
  const match = {matchMetadata, id: matchRef.id, employeeId, companyId: req.user.id, description}
  const commonText = `for ${getUserFormat(req.user)} with employee ${employeeId}`;
  try {
    const writeResult = await matchRef.create(match);
    console.log(`Created match ${commonText} at ${getWriteResultDate(writeResult)}`);
  } catch (error) {
    console.error(`Failed to create match ${commonText}. ${error}`);
    res.status(403).json({message: "Error en creacion de match."});
    return;
  }
  res.status(200).json({message: "La match se creo satisfcatoriamente.", match});
  return;
}

// TODO: Define if we should hide companyId when employees request it and/or
//       hide employeeIds when companies request it.
async function read(req: AuthRequest, res: express.Response) {
  if (req.user == undefined) throw "Undefined user.";
  const idType = req.user.type == kUSERS.employee ? "employeeId" : "companyId";
  // TODO: Should we wrap this in try and catch or does it just return empty if something fails??
  const snapshot = await MatchesCollection.where(idType, "==", req.user.id).get();
  const matches: Array<Match> = [];
  snapshot.forEach(m => {
    const match = {id: m.id, ...m.data()} as Match;
    matches.push(match);
  });
  res.status(200).json({matches});
  return;
}