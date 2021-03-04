//import libraries
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import { validateToken } from './middleware/validateToken';

//initialize firebase inorder to access its services
admin.initializeApp(functions.config().firebase);

//initialize express server
const app = express();

// middleware for cors, json and urlencoded
app.use(cors({origin: true}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// api
app.get('/', (_, res) => { res.send('Alohawaii').status(200) })
app.get('/auth-check', [validateToken], (_: any, res: any) => { res.send('Auth cheeeeeck').status(200) })

// This HTTPS endpoint can only be accessed by your Firebase Users.
// Requests need to be authorized by providing an `Authorization` HTTP header
// with value `Bearer <Firebase ID Token>`.
exports.app = functions.https.onRequest(app);