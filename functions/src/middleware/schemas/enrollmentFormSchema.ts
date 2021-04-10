import Joi = require("joi");
import { validateRequest } from "../../helpers/utility";

const actividadDeseadaSchema = {
  jornada_de_trabajo: Joi.string().required(),
  funcion: Joi.string().required(),
  capacitacion_o_entrenamiento: Joi.string().required(),
  consultoria: Joi.string().required(),
  coaching: Joi.string().required(),
};
const posicionVacanteSchema = actividadDeseadaSchema;

// TODO: Validate fields way more strictly, add regexes, etc.
export function employeeForm(req: any, res: any, next: any) {
    const institFechasParSchema = Joi.object({
      institucion: Joi.string().required(),
      fechas: Joi.string().required(),
    });
    const schema = Joi.object({
        nombre: Joi.string().required(),
        fecha_de_nacimiento: Joi.string().required(),
        lugar_de_nacimiento: Joi.string().required(),
        direccion_actual: Joi.string().required(),
        telefono_casa: Joi.string().optional(),
        telefono_celular: Joi.string().required(),
        secciones: Joi.object({
          
          ultimo_ejemplo_o_actividad: Joi.object({
            ultimo_anio: Joi.string().required(),
            ultimos_tres_anios: Joi.string().required(),
            empresa: Joi.string().required(),
            puesto: Joi.string().required(),
            responsabilidad: Joi.string().required(),
          }),

          actividad_deseada: Joi.object(
            actividadDeseadaSchema
          ),

          nivel_de_estudios: Joi.object({
            primaria: institFechasParSchema,
            secundaria: institFechasParSchema,
            tecnica_o_bachillerato: institFechasParSchema,
            profesional: institFechasParSchema,
            maestria_o_doctorado: institFechasParSchema,
          }),

          comentarios: Joi.object({
            porque_quieres_trabajo: Joi.string().required(),
          }),

          tus_habilidades_son: Joi.object({
            habilidades: Joi.array().items(Joi.string()).required(),
          }),
        })
        
    });
    validateRequest(req, res, next, schema);
}

// TODO: Validate fields way more strictly, add regexes, etc.
export function companyForm(req: any, res: any, next: any) {
    const schema = Joi.object({
        nombre_empresa: Joi.string().required(),
        direccion_actual: Joi.string().required(),
        municipio: Joi.string().required(),
        estado: Joi.string().required(),
        telefono_1: Joi.string().optional(),
        telefono_2: Joi.string().required(),
        secciones: Joi.object({
          
          posicion_vacante: Joi.object(
            posicionVacanteSchema
          ),

          habilidades_necesarias: Joi.object({
            operacion_de_maquinaria: Joi.string().required(),
            conocimientos_tecnicos: Joi.string().required(),
            manejo_de_equipo_de_computo: Joi.string().required(),
            programacion_u_office: Joi.string().required(),
            analisis_logico: Joi.string().required(),
            analisis_numerico: Joi.string().required(),
          }),

          competencias_requeridas: Joi.object({
            competencias: Joi.array().items(Joi.string()).required(),
          }),
        })
        
    });
    validateRequest(req, res, next, schema);
}
