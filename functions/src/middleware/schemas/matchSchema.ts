import * as Joi from 'joi';
import { getMatchStates } from '../../helpers/constants';
import { validateRequest } from '../../helpers/utility';

export const matchSchema = {
  create,
  read,
  update,
};

export function create(req: any, res: any, next: any) {
    const schema = Joi.object({
        employeeId: Joi.string().required(),
        jobId: Joi.string().required(),
        description: Joi.string().required(),
    });
    validateRequest(req, res, next, schema);
}

export function read(req: any, res: any, next: any) {
    const schema = Joi.object({});
    validateRequest(req, res, next, schema);
}

export function update(req: any, res: any, next: any) {
    const schema = Joi.object({
        //jobId: Joi.string().required(),
        state: Joi.string().valid(...getMatchStates()).required(),
    });
    validateRequest(req, res, next, schema);
}
