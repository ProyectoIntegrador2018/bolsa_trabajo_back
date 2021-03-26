import * as Joi from 'joi';
import { validateRequest } from '../../helpers/utility';

export function createAdminSchema(req: any, res: any, next: any) {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        phoneNumber: Joi.string().trim().regex(/^\+[0-9]{10}$/).required(),
    });
    validateRequest(req, res, next, schema);
}