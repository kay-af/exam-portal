import { Router } from 'express';
import { studentAuthController } from '../controllers/studentAuthController';

const studentAuthRouter = Router()

studentAuthRouter.post('/login', studentAuthController.login);
studentAuthRouter.post('/create', studentAuthController.createAccount);

export { studentAuthRouter };