import * as admin from 'firebase-admin'
import {Request} from "express"

export interface AuthRequest extends Request {
    user?: admin.auth.DecodedIdToken
}