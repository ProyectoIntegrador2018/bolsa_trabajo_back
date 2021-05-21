import { ActividadDeseada } from "./EmployeeEnrollmentForm";
import { EnrollmentMetadata } from "./EnrollmentMetadata";

export interface CompanyEnrollmentFormat extends EnrollmentMetadata {
  nombre_empresa: string,
  calle: string,
  municipio: string,
  codigo_postal: string,
  telefono_1: string,
  telefono_2: string,
}

export interface SeccionesCompany {
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