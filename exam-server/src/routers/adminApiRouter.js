import { Router } from 'express';
import { adminApiController } from '../controllers/adminApiController';

const adminApiRouter = Router();

adminApiRouter.get('/info', adminApiController.dashboardInfo);
adminApiRouter.get('/questionPaper', adminApiController.getPaper);
adminApiRouter.post('/questionPaper', adminApiController.addPaper);
adminApiRouter.delete('/questionPaper', adminApiController.deletePaper);
adminApiRouter.post('/paperVisibility', adminApiController.makePaperVisible);
adminApiRouter.get('/student', adminApiController.getStudent);
adminApiRouter.put('/credentials', adminApiController.updateCredentials);

export { adminApiRouter };