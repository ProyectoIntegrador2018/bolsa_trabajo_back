import * as express from 'express';
import { AuthRequest } from '../model/AuthRequest';

// TODO: Finish implementig this. Lookup db for admin.
//       req.token => decodedToken
export const isAdmin =
  async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  next();
  return;
};