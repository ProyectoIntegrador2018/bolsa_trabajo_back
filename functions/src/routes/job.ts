import express = require("express");
import { JobsCollection } from "../helpers/collections";
import { getCurrSeconds } from "../helpers/utility";
import { AuthRequest } from "../model/AuthRequest";
import { Job } from "../model/Job/Job";

export const jobService = {
  create,
  read,
  findOne
  // read,
  // update,
  // deletee,
};

/*
  Default structure for 200/500 json resposes.
  result: {
    message: "Message indicating success."
  }
*/

// AUTHORIZATION: Only companies can create jobs.
async function create(req: AuthRequest, res: express.Response) {
  if (req.user == undefined) throw "Undefined user.";
  const jobMetadata = { createdAt: getCurrSeconds() }
  const createdBy = req.user?.id;
  const data = req.body;
  data.createdBy = createdBy;
  const job = data;
  job.jobMetadata = jobMetadata;
  //const job = {jobMetadata: jobMetadata, data};
  try {
    const jobRef = await JobsCollection.add(job);
    const jobDoc = await jobRef.get();
    const newJob = {id: jobRef.id, ...jobDoc.data()} as Job;
    console.log(`Job ${JSON.stringify(newJob)} created at ${jobDoc.createTime?.toDate().toString()} by ${createdBy}`);
    res.status(200).json(newJob);
  } catch (error) {
    console.error(`Couldn't create job. ${error}`);
    res.status(403).json({message: "No se pudo crear el puesto."});
    return;
  }
}

async function read(req: AuthRequest, res: express.Response) {
  if (req.user == undefined) throw "Undefined user.";
  //const idType = req.user.type == kUSERS.employee ? "employee.id" : "company.id";
  // TODO: Should we wrap this in try and catch or does it just return empty if something fails??
  const snapshot = await JobsCollection.where('createdBy', "==", req.user.id).get();
  const jobs: Array<Job> = [];
  snapshot.forEach(j => {
    const job = {id: j.id, ...j.data()} as Job;
    jobs.push(job);
  });
  res.status(200).json({jobs});
  return;
}

async function findOne(req: AuthRequest, res: express.Response) {
  if (req.user == undefined) throw "Undefined user.";
  //const idType = req.user.type == kUSERS.employee ? "employee.id" : "company.id";
  // TODO: Should we wrap this in try and catch or does it just return empty if something fails??
  const data = await JobsCollection.doc(req.params.id).get();
  const job = {id: data.id, ...data.data()} as Job;
  res.status(200).json(job);
  return;
}
