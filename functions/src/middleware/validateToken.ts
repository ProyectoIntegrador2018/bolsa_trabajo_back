import * as admin from 'firebase-admin';
import * as express from 'express';
import { AuthRequest } from '../model/AuthRequest';
import { getUserById } from '../helpers/utility';

export const validateToken =
  async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  console.log('Check if request is authorized with Firebase ID token');

  if (!req.headers.authorization?.startsWith('Bearer ')) {
    console.error(
      'No Firebase ID token was passed as a Bearer token in the Authorization header.',
      'Make sure you authorize your request by providing the following HTTP header:',
      'Authorization: Bearer <Firebase ID Token>');
    res.status(403).send('Unauthorized');
    return;
  }

  // Read the Token from the Authorization header.
  console.log('Found "Authorization" header');
  let token = req.headers.authorization.split('Bearer ')[1];

  try {
    const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(token);
    console.log('ID Token correctly decoded', decodedToken);
    req.token = decodedToken
    req.user = await getUserById(decodedToken.uid);
    next();
    return;
  } catch (error) {
    console.error('Error while verifying Firebase ID token:', error);
    res.status(403).send('Unauthorized');
    return;
  }
};