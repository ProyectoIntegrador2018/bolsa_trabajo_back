//import libraries
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
//initialize firebase inorder to access its services, from other files without error
admin.initializeApp(functions.config().firebase);
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import { validateToken } from './middleware/validateToken';
import { adminService } from './routes/admin';
import { adminSchema } from './middleware/schemas/adminSchema';
import { isMinAdmin } from './middleware/userTypes';

//initialize express server
const app = express();

// middleware for cors, json and urlencoded
app.use(cors({origin: true}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// api
app.get('/', (_, res) => { res.send('Alohawaii').status(200) })
app.get('/auth-check', [validateToken], (_: any, res: any) => { res.send('Auth cheeeeeck').status(200) })

// CRUD example:
// Create
app.post('/api/admin', [validateToken, isMinAdmin, adminSchema.create], (req: any, res: any) => adminService.create(req, res));
// Read
app.get('/api/admin/', [validateToken, isMinAdmin, adminSchema.read], (req: any, res: any) => adminService.read(req, res));
// Update: IMPORTANT: Send id but it will be ignored. ID will be grabbed from JWT (User can only updated (him|her)self)
app.put('/api/admin/:id', [validateToken, isMinAdmin, adminSchema.update], (req: any, res: any) => adminService.update(req, res));
// Delete: IMPORTANT: Send id but it will be ignored. ID will be grabbed from JWT (User can only updated (him|her)self)
app.delete('/api/admin/:id', [validateToken, isMinAdmin, adminSchema.deletee], (req: any, res: any) => adminService.deletee(req, res));



// This HTTPS endpoint can only be accessed by your Firebase Users.
// Requests need to be authorized by providing an `Authorization` HTTP header
// with value `Bearer <Firebase ID Token>`.
exports.app = functions.https.onRequest(app);