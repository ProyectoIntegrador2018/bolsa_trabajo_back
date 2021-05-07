import { Metadata } from "./Metadata";

export interface MatchMetadata extends Metadata {
}

export interface Match extends MatchMetadata {
  id: string,
  employeeId: string,
  companyId: string,
  description: string,
}