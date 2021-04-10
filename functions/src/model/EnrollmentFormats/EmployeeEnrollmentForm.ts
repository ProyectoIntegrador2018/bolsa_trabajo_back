import { EnrollmentMetadata } from "./EnrollmentMetadata";

export interface EmployeeEnrollmentFormat extends EnrollmentMetadata {
  nombre: string,
  fecha_de_nacimiento: string,
  lugar_de_nacimiento: string,
  direccion_actual: string,
  telefono_casa?: string,
  telefono_celular: string,
  secciones: SeccionesEmployee, 
}

export interface SeccionesEmployee {
  ultimo_ejemplo_o_actividad: UltimoEmpleoOActividad,
  actividad_deseada: ActividadDeseada,
  nivel_de_estudios: NivelDeEstudios,
  comentarios: Comentarios,
  tus_habilidades_son: TusHabilidadesSon, 
}

export interface UltimoEmpleoOActividad {
  ultimo_anio: string,
  ultimos_tres_anios: string,
  empresa: string,
  puesto: string,
  responsabilidad: string,
}

// TODO: Validate possible types. Check (circular) in Employee Format pdf.
// Equivalent to PosicionVacante in Company
export interface ActividadDeseada {
  jornada_de_trabajo: string,
  funcion: string,
  capacitacion_o_entrenamiento: string,
  consultoria: string,
  coaching: string,
}

export interface NivelDeEstudios {
  primaria: InstitucionFechasPar,
  secundaria: InstitucionFechasPar,
  tecnica_o_bachillerato: InstitucionFechasPar,
  profesional: InstitucionFechasPar,
  maestria_o_doctorado: InstitucionFechasPar, 
}

export interface InstitucionFechasPar {
  institucion: string,
  fechas: string,
}

export interface Comentarios {
  porque_quieres_trabajo: string,
}

// TODO: Define if it's going a default list of abilities or random user-defined abilities.
export interface TusHabilidadesSon {
  habilidades: Set<string>,
}