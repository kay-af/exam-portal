import { Router } from 'express';
import mongoose from 'mongoose';
import { QuestionPaperModel } from '../models/questionPaperModel';

const adminApiRouter = Router();

adminApiRouter.get('/questionPaper', (req, res) => {
    QuestionPaperModel.find({}).then((doc) => {
        return res.status(200).json(doc);
    }).catch((err) => {
        console.log(err.message);
        return res.sendStatus(500);
    });
});

adminApiRouter.post('/questionPaper', (req, res) => {
    const paper = req.body;
    QuestionPaperModel.create(paper).then((doc) => {
        console.log(doc);
        return res.sendStatus(201);
    }).catch((err) => {
        console.log(err.message);
        if (err instanceof mongoose.Error)
            return res.sendStatus(400);
        else
            return res.sendStatus(500);
    });
});

adminApiRouter.put('/questionPaper', (req, res) => {
    const { paperId } = req.query;
    const updated = req.body;

    if(paperId) {
        QuestionPaperModel.findByIdAndUpdate(paperId, updated, (err, updated) => {
            if(err) {
                console.log(err.message);
                if (err instanceof mongoose.Error)
                    return res.sendStatus(400);
                else
                    return res.sendStatus(500);
            }
            return res.sendStatus(204);
        });
    } else {
        return res.sendStatus(400);
    }
});

export { adminApiRouter };