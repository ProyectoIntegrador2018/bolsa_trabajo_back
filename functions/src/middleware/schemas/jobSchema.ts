import Joi = require("joi");
import { validateRequest } from "../../helpers/utility";
import { actividadDeseadaSchema } from "./enrollmentFormSchema";

const posicionVacanteSchema = actividadDeseadaSchema;

export const jobSchema = {
  create,
};

export function create(req: any, res: any, next: any) {
    const schema = Joi.object({
        nombre_puesto: Joi.string().required(),
        posicion_vacante: Joi.object(
          posicionVacanteSchema
        ),
        habilidades_necesarias: Joi.object({
          operacion_de_maquinaria: Joi.string().optional(),
          conocimientos_tecnicos: Joi.string().optional(),
          manejo_de_equipo_de_computo: Joi.string().optional(),
          programacion_u_office: Joi.string().optional(),
          analisis_logico: Joi.string().optional(),
          analisis_numerico: Joi.string().optional(),
          titulo_profesional: Joi.string().optional()
        }),
        competencias_requeridas: Joi.object({
          competencias: Joi.array().items(Joi.string()).optional(),
        }),
    });
    validateRequest(req, res, next, schema);
}