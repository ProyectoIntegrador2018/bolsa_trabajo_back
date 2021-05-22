import { ActividadDeseada } from "../EnrollmentFormats/EmployeeEnrollmentForm";
import { JobMetadata } from "./JobMetadata";

export interface Job extends JobMetadata {
  id: string,
  // Activdad Deseada from EmployeeEnrollmentForm is equivalent to PosicionVacante
  posicion_vacante: ActividadDeseada, 
  habilidades_necesarias: HabilidadesNecesarias,
  competencias_requeridas: CompetenciasRequeridas,
}

export interface HabilidadesNecesarias {
  operacion_de_maquinaria: string,
  conocimientos_tecnicos: string,
  manejo_de_equipo_de_computo: string,
  programacion_u_office: string,
  analisis_logico: string,
  analisis_numerico: string,
}

export interface CompetenciasRequeridas {
  competencias: Set<string>,
}