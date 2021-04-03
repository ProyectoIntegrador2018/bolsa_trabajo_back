import * as express from 'express';
import { kUSERS } from '../helpers/constants';
import { hasPermission } from '../helpers/utility';
import { AuthRequest } from '../model/AuthRequest';

// Usage:
//   If you want a user that is at least an admin,
//      desiredUserType => admin
//      currUserType => req.user?.type
function isMin(desiredUserType: string, currUserType: string | undefined): boolean {
  return hasPermission(desiredUserType, currUserType);
}

export const isEmployee =
  async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
    if (req.user?.type == kUSERS.employee) next();
    else res.send(401).json({message: "Unauthorized"});
    return;
};

export const isMinEmployee = 
  async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
    if (isMin(kUSERS.employee, req.user?.type)) next();
    else res.send(401).json({message: "Unauthorized"});
    return;
};

export const isAdmin =
  async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
    if (req.user?.type == kUSERS.admin) next();
    else res.send(401).json({message: "Unauthorized"});
    return;
};

export const isMinAdmin = 
  async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
    if (isMin(kUSERS.admin, req.user?.type)) next();
    else res.send(401).json({message: "Unauthorized"});
    return;
};

export const isSuperAdmin =
  async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
    if (req.user?.type == kUSERS.superAdmin) next();
    else res.send(401).json({message: "Unauthorized"});
    return;
};

export const isMinSuperAdmin = 
  async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
    if (isMin(kUSERS.superAdmin, req.user?.type)) next();
    else res.send(401).json({message: "Unauthorized"});
    return;
};