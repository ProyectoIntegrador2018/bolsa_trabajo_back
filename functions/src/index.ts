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
import { isCompany, isCompanyOrAnyAdmin, isEmployeeOrCompany, isMinAdmin, isMinEmployee } from './middleware/userTypePerms';
import { userSchema } from './middleware/schemas/userSchema';
import { userService } from './routes/user';
import { formSchema } from './middleware/schemas/enrollmentFormSchema';
import { enrollmentService } from './routes/enrollment';
import { matchesService } from './routes/matches';
import { matchesSchema } from './middleware/schemas/matchesSchema';

//initialize express server
const app = express();

// middleware for cors, json and urlencoded
app.use(cors({origin: true}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// api
app.get('/', (_, res) => { res.send('Alohawaii').status(200) })
app.get('/auth-check', [validateToken], (_: any, res: any) => { res.send('Auth cheeeeeck').status(200) })

// ADMINS(kinda) CRUD:
// Create
app.post('/api/admin', [validateToken, isMinAdmin, adminSchema.create], (req: any, res: any) => adminService.create(req, res));
// Read
app.get('/api/admin', [validateToken, isMinAdmin, adminSchema.read], (req: any, res: any) => adminService.read(req, res));
// Update: IMPORTANT: Send id but it will be ignored. ID will be grabbed from JWT (User can only updated (him|her)self)
app.put('/api/admin/:id', [validateToken, isMinAdmin, adminSchema.update], (req: any, res: any) => adminService.update(req, res));
// Delete: IMPORTANT: Send id but it will be ignored. ID will be grabbed from JWT (User can only updated (him|her)self)
app.delete('/api/admin/:id', [validateToken, isMinAdmin, adminSchema.deletee], (req: any, res: any) => adminService.deletee(req, res));

// ENROLLMENT FORMS
app.get('/api/user/enrollment-form/:id', [validateToken, formSchema.read], (req: any, res: any) => enrollmentService.readForm(req, res));
app.post('/api/user/enrollment-form', [validateToken, formSchema.bothForms], (req: any, res: any) => enrollmentService.createForm(req, res));

// MATCHES:
app.post('/api/matches', [validateToken, isCompany, matchesSchema.create], (req: any, res: any) => matchesService.create(req, res));
app.get('/api/matches', [validateToken, isEmployeeOrCompany, matchesSchema.read], (req: any, res: any) => matchesService.read(req, res));


// Create: Register for 'employee' and 'company' users.
app.post('/api/user/register', [userSchema.register], (req: any, res: any) => userService.register(req, res));
// Read: Get your user.
app.get('/api/user', [validateToken, isMinEmployee, userSchema.read], (req: any, res: any) => userService.read(req, res));

// Filter: users
app.post('/api/user/filter', [validateToken, isCompanyOrAnyAdmin, userSchema.filter], (req: any, res: any) => userService.filter(req, res));






// This HTTPS endpoint can only be accessed by your Firebase Users.
// Requests need to be authorized by providing an `Authorization` HTTP header
// with value `Bearer <Firebase ID Token>`.
exports.app = functions.https.onRequest(app);
