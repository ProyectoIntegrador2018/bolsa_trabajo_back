import * as Joi from 'joi';
import { kUSERS, kUSER_STATES } from '../../helpers/constants';
import { phoneNumberRegex, validateRequest } from '../../helpers/utility';

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
        phoneNumber: Joi.string().trim().regex(phoneNumberRegex()).required(),
        type: Joi.string()
            .valid(...[kUSERS.employee, kUSERS.company, kUSERS.admin, kUSERS.superAdmin,])
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
        username: Joi.string(),
        email: Joi.string().email(),
        phoneNumber: Joi.string().trim().regex(phoneNumberRegex()),
        password: Joi.string().min(6),
        type: Joi.string()
            .valid(...[kUSERS.employee, kUSERS.admin, kUSERS.superAdmin]),
        state: Joi.string()
            .valid(...[kUSER_STATES.active, kUSER_STATES.inactive])
    });
    validateRequest(req, res, next, schema);
}

export function deletee(req: any, res: any, next: any) {
    const schema = Joi.object({});
    validateRequest(req, res, next, schema);
}

