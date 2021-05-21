import Joi = require("joi");
import { kUSERS } from "../../helpers/constants";
import { validateRequest } from "../../helpers/utility";
import { AuthRequest } from "../../model/AuthRequest";

const actividadDeseadaSchema = {
  jornada_de_trabajo: Joi.string().required(),
  funcion: Joi.string().required(),
  capacitacion_o_entrenamiento: Joi.string().optional(),
  consultoria: Joi.string().optional(),
  coaching: Joi.string().optional(),
};
const posicionVacanteSchema = actividadDeseadaSchema;

export function formSchema(req: AuthRequest, res: any, next: any) {
  const schema = req.user?.type == kUSERS.employee ? getEmployeeSchema() : getCompanySchema();
  validateRequest(req, res, next, schema);
}

// TODO: Validate fields way more strictly, add regexes, etc.
function getEmployeeSchema() {
    const schema = Joi.object({
        nombre: Joi.string().required(),
        fecha_de_nacimiento: Joi.string().required(),
        lugar_de_nacimiento: Joi.string().optional(),
        calle: Joi.string().optional(),
        municipio: Joi.string().required(),
        codigo_postal: Joi.string().optional(),
        telefono_casa: Joi.string().optional(),
        telefono_celular: Joi.string().optional(),
        secciones: Joi.object({
          
          ultimo_ejemplo_o_actividad: Joi.object({
            ultimo_periodo: Joi.string().required(),
            empresa: Joi.string().required(),
            puesto: Joi.string().required(),
            responsabilidad: Joi.string().optional(),
          }),

          actividad_deseada: Joi.object(
            actividadDeseadaSchema
          ),

          nivel_de_estudios: Joi.object({
            nivel_escolar: Joi.string().required(),
            nombre_institucion: Joi.string().required(),
            fecha_inicio: Joi.string().required(),
            fecha_fin: Joi.string().required()
          }),

          comentarios: Joi.object({
            porque_quieres_trabajo: Joi.string().required(),
          }),

          tus_habilidades_son: Joi.object({
            habilidades: Joi.array().items(Joi.string()).required(),
          }),

          clasificacion_puesto: Joi.object ({
            clasificacion: Joi.string().required(),
          }),
  
          aceptacion_politica : Joi.object({
            aceptacion : Joi.boolean().required(),
          })
        })
        
    });
    return schema;
}

// TODO: Validate fields way more strictly, add regexes, etc.
function getCompanySchema() {
    const schema = Joi.object({
        nombre_empresa: Joi.string().required(),
        calle: Joi.string().required(),
        municipio: Joi.string().required(),
        codigo_postal: Joi.string().required(),
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
    return schema;
}
