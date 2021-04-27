
import * as Joi from 'joi';
import { kUSERS } from '../../helpers/constants';
import { phoneNumberRegex, validateRequest } from '../../helpers/utility';

export const userSchema = {
    register,
};

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
