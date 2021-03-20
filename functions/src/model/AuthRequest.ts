import * as admin from 'firebase-admin'
import {Request} from "express"
import { User } from './User'

export interface AuthRequest extends Request {
    user?: User,
    token?: admin.auth.DecodedIdToken,
}