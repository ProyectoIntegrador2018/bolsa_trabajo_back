import { EnrollmentMetadata } from "./EnrollmentMetadata";


export interface PositionEnrollmentFormat extends EnrollmentMetadata {
    // Activdad Deseada from EmployeeEnrollmentForm is equivalent to PosicionVacante
    nombre_puesto: string,
    posicion_vacante: ActividadDeseada, 
    habilidades_necesarias: HabilidadesNecesarias,
    competencias_requeridas: CompetenciasRequeridas,
  }

  export interface ActividadDeseada {
    jornada_de_trabajo: string,
    funcion: string,
    capacitacion_o_entrenamiento: string,
    consultoria: string,
    coaching: string,
  }
  
  export interface HabilidadesNecesarias {
    operacion_de_maquinaria: string,
    conocimientos_tecnicos: string,
    manejo_de_equipo_de_computo: string,
    programacion_u_office: string,
    analisis_logico: string,
    analisis_numerico: string,
    titulo_profesional: string
  }
  
  export interface CompetenciasRequeridas {
    competencias: Set<string>,
  }