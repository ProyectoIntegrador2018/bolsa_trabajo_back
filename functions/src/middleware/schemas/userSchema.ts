
import * as Joi from 'joi';
import { kUSERS } from '../../helpers/constants';
import { phoneNumberRegex, validateRequest } from '../../helpers/utility';

export const userSchema = {
    filter,
    read,
    register,
};

export function filter(req: any, res: any, next: any) {
    const schema = Joi.object({
        field: Joi.string()
            .valid(...[
                "municipio",
                "secciones.actividad_deseada.jornada_de_trabajo", 
                "secciones.ultimo_ejemplo_o_actividad.puesto",
                "secciones.nivel_de_estudios.nivel_escolar"])
            .required(),
        operator: Joi.string()
            .valid(...["<", ">", "<=", ">=", "=="])
            .required(),
        target: Joi.string().required(),
    });
    validateRequest(req, res, next, schema);
}

export function read(req: any, res: any, next: any) {
    const schema = Joi.object({});
    validateRequest(req, res, next, schema);
}

export function register(req: any, res: any, next: any) {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        phoneNumber: Joi.string().trim().regex(phoneNumberRegex()).required(),
        type: Joi.string()
            .valid(...[kUSERS.employee, kUSERS.company,])
            .required(),
    });
    validateRequest(req, res, next, schema);
}
