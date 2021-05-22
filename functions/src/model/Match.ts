import { kMATCH_STATES } from "../helpers/constants";
import { Metadata } from "./Metadata";

export interface MatchMetadata extends Metadata {
}

interface MatchEmployee {
  id: string,
  username: string,
}

interface MatchCompany {
  id: string,
  username: string,
}

export interface Match extends MatchMetadata {
  id: string,
  jobId: string,
  description: string,
  employee: MatchEmployee,
  company: MatchCompany,
  state: kMATCH_STATES,
}