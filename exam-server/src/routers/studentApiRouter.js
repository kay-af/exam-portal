import { Router } from 'express';
import { studentApiController } from '../controllers/studentApiController';

const studentApiRouter = Router();

studentApiRouter.get('/info', studentApiController.info);
studentApiRouter.get('/examList', studentApiController.examList);
studentApiRouter.get('/exam', studentApiController.getQuestionPaper);
studentApiRouter.post('/exam', studentApiController.postAnswers);

export { studentApiRouter };