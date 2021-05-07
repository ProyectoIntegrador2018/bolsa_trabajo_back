import * as Joi from 'joi';
import { validateRequest } from '../../helpers/utility';

export const matchesSchema = {
  create,
  read,
};

export function create(req: any, res: any, next: any) {
    const schema = Joi.object({
        employeeId: Joi.string().required(),
        description: Joi.string().required(),
    });
    validateRequest(req, res, next, schema);
}

export function read(req: any, res: any, next: any) {
    const schema = Joi.object({});
    validateRequest(req, res, next, schema);
}