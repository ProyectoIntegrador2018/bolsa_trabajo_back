import * as Joi from 'joi';
import { kUSERS } from '../../helpers/constants';
import { validateRequest } from '../../helpers/utility';

export const adminSchema = {
  create,
  read,
  update,
  deletee,
};

export function create(req: any, res: any, next: any) {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        phoneNumber: Joi.string().trim().regex(/^\+[0-9]{10}$/).required(),
        type: Joi.string()
            .valid(...[kUSERS.employee, kUSERS.admin, kUSERS.superAdmin])
            .required(),
    });
    validateRequest(req, res, next, schema);
}

export function read(req: any, res: any, next: any) {
    const schema = Joi.object({});
    validateRequest(req, res, next, schema);
}

export function update(req: any, res: any, next: any) {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.string().trim().regex(/^\+[0-9]{10}$/).required(),
    });
    validateRequest(req, res, next, schema);
}

export function deletee(req: any, res: any, next: any) {
    const schema = Joi.object({});
    validateRequest(req, res, next, schema);
}

