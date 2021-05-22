import Joi = require("joi");
import { validateRequest } from "../../helpers/utility";
import { actividadDeseadaSchema } from "./enrollmentFormSchema";

const posicionVacanteSchema = actividadDeseadaSchema;

export const jobSchema = {
  create,
};

export function create(req: any, res: any, next: any) {
    const schema = Joi.object({
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
    });
    validateRequest(req, res, next, schema);
}