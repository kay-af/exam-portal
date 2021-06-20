import { Router } from 'express';
import { StudentModel } from '../models/studentModel';

const studentApiRouter = Router();

studentApiRouter.get('/info', (req, res) => {
    const { userId } = req.auth;

    StudentModel.findById(userId).then((doc) => {
        return res.status(200).json(doc.toJSON());
    }).catch((err) => {
        console.log(err);
        return res.sendStatus(500);
    });
});

export { studentApiRouter };