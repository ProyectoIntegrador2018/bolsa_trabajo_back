// CRUD Basic Template
import * as express from 'express';
import { MatchesCollection } from "../helpers/collections";
import { kMATCH_STATES, kUSERS } from '../helpers/constants';
import { getCurrSeconds, getMatchById, getObjFromData, getUserById, getUserFormat, getWriteResultDate, jobBelongsTo, matchBelongsTo } from '../helpers/utility';
import { AuthRequest } from '../model/AuthRequest';
import { Match } from '../model/Match';

export const matchService = {
  create,
  read,
  update,
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
  // Maybe move these 2 checks to a middleware? idk..
  // TODO: Add these 2 to try and catch blocks to try and catch block
  const employee = await getUserById(data.employeeId);
  const isValidEmployee = employee.type == kUSERS.employee;
  const isValidJob = await jobBelongsTo(req.user.id, data.jobId);
  if (!isValidEmployee) {
    console.error(`${data.employeeId} is not a valid employee.`);
    res.status(403).json({message: "Empleado invalido."});
    return;
  }
  if (!isValidJob) {
    console.error(`${data.jobId} is not a valid job.`);
    res.status(403).json({message: "Puesto invalido."});
    return;
  }
  const matchRef = MatchesCollection.doc();
  const {employeeId, description} = data;
  const match = {
    matchMetadata,
    id: matchRef.id,
    jobId: data.jobId,
    description,
    employee: {
      id: employeeId,
      username: employee.username,
    },
    company: {
      id: req.user.id,
      username: req.user.username,
    },
    state: kMATCH_STATES.pending
  };
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
  const idType = req.user.type == kUSERS.employee ? "employee.id" : "company.id";
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

async function update(req: AuthRequest, res: any) {
  if (req.user == undefined) throw "Undefined user.";
  const matchId = req.params.id;
  const data = req.body;
  // Maybe move this check to a middleware??? idk..
  // TODO: Add isValidJob to try and catch block.
  const isValidJob = await jobBelongsTo(req.user.id, data.jobId);
  const isValidMatch = await matchBelongsTo(req.user.id, matchId);
  if (!isValidJob) {
    console.error(`${data.jobId} is not a valid job.`);
    res.status(403).json({message: "Puesto invalido."});
    return;
  }
  if (!isValidMatch) {
    console.error(`${matchId} is not a valid match.`);
    res.status(403).json({message: "Match invalido."});
    return;
  }
  let writeResult = null;
  try {
    // Update database
    writeResult = await MatchesCollection.doc(matchId).update(
      getObjFromData(["state"], data));
  } catch (error) {
    console.error(`Failed to update match(${matchId}), by ${getUserFormat(req.user)}. ${error}`);
    res.status(403).json({message: "Failed to update admin."});
    return;
  }
  const updatedMatch = await getMatchById(matchId);
  console.log(`Match(${matchId}) updated by ${getUserFormat(req.user)}, in ${writeResult.writeTime.toDate().toString()}.`);
  res.status(200).json(updatedMatch);
  return;
}
