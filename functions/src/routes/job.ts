import express = require("express");
import { JobsCollection } from "../helpers/collections";
import { getCurrSeconds } from "../helpers/utility";
import { AuthRequest } from "../model/AuthRequest";
import { Job } from "../model/Job/Job";

export const jobService = {
  create,
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
