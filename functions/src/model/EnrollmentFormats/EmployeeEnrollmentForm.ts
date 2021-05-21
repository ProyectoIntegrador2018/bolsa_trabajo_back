import { EnrollmentMetadata } from "./EnrollmentMetadata";

export interface EmployeeEnrollmentFormat extends EnrollmentMetadata {
  userId: string,
  nombre: string,
  fecha_de_nacimiento: string,
  lugar_de_nacimiento: string,
  calle: string,
  municipio: string,
  codigo_postal: string,
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
  clasificacion_puesto: ClasificacionPuesto,
  aceptactionPolitica: AceptacionPolitica
}

export interface UltimoEmpleoOActividad {
  ultimo_periodo: string,
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
  nivel_escolar: string,
  nombre_institucion: string,
  fecha_inicio: string,
  fecha_fin: string,
}

export interface Comentarios {
  porque_quieres_trabajo: string,
}

// TODO: Define if it's going a default list of abilities or random user-defined abilities.
export interface TusHabilidadesSon {
  habilidades: Set<string>,
}

export interface ClasificacionPuesto {
  clasificacion: string,
}

export interface AceptacionPolitica {
  aceptacion: boolean,
}
