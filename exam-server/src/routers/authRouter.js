import { Router } from 'express';
import { adminAuthRouter } from './adminAuthRouter';
import { studentAuthRouter } from './studentAuthRouter';

const authRouter = Router();

authRouter.use('/student', studentAuthRouter);
authRouter.use('/admin', adminAuthRouter);

export { authRouter };