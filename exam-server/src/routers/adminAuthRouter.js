import { Router } from 'express';
import { adminAuthController } from '../controllers/adminAuthController';

const adminAuthRouter = Router();

adminAuthRouter.post('/login', adminAuthController.login);

export { adminAuthRouter };