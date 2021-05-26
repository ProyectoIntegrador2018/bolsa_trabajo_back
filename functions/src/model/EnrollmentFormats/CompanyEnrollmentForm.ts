import { EnrollmentMetadata } from "./EnrollmentMetadata";

export interface CompanyEnrollmentFormat extends EnrollmentMetadata {
  nombre_empresa: string,
  calle: string,
  municipio: string,
  codigo_postal: string,
  telefono_1: string,
  telefono_2: string,
  aceptactionPolitica: AceptacionPolitica
}

export interface AceptacionPolitica {
  aceptacion: boolean,
}