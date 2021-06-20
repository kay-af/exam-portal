import {Router} from 'express';
import { adminAuthenticator } from '../middlewares/adminAuthenticator';
import { studentAuthenticator } from '../middlewares/studentAuthenticator';
import { adminApiRouter } from './adminApiRouter';
import { studentApiRouter } from './studentApiRouter';

const apiRouter = Router();

apiRouter.use('/student', studentAuthenticator, studentApiRouter);
apiRouter.use('/admin', adminAuthenticator, adminApiRouter);

export { apiRouter };