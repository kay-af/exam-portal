import { StudentModel } from "../models/studentModel";
import { QuestionPaperModel } from '../models/questionPaperModel';
import { TestHistoryModel } from '../models/testHistoryModel';
import mongoose from 'mongoose';

const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

const processQuestionDoc = (doc) => {

    let questions = doc.questions.map((ques) => {

        let options = ques.optionKeys.map((opt) => {
            return {
                key: opt.key,
                value: opt.value
            }
        });

        if (ques.shuffleable) options = shuffle(options);

        return {
            id: ques._id,
            score: ques.score,
            questionText: ques.questionText,
            options: options,
            isMultiple: ques.isMultiple
        }
    });

    if (doc.shuffleable) questions = shuffle(questions);

    return {
        id: doc._id,
        paperName: doc.paperName,
        time: doc.time,
        questions: questions,
        numQuestions: questions.length,
        timestamp: doc.createdAt,
        maxScore: doc.maxScore
    }
}

const compareAnswers = (ans, original) => {
    let res = true;
    ans.forEach((a) => {
        if (res) {
            if (!original.includes(a)) {
                res = false;
            }
        }
    })

    return res;
}

const assignScores = (questions, submission) => {
    let quesMap = new Map();
    let attempted = 0;
    let score = 0;

    questions.forEach((q) => {
        quesMap.set(q._id.toString(), q);
    });

    submission.forEach((sub) => {
        if (quesMap.has(sub.id) && sub.answers.length > 0) {

            attempted++;

            const ques = quesMap.get(sub.id);
            const originalAns = ques.answers;
            const givenAns = sub.answers;

            if (compareAnswers(givenAns, originalAns)) {
                score += ques.score;
            }
        }
    });

    return {
        score: score,
        attempted: attempted
    };
}

const studentApiController = {
    info: (req, res) => {
        const { userId } = req.auth;

        StudentModel.findById(userId).then((doc) => {

            TestHistoryModel.find({
                studentId: userId
            }).sort({
                createdAt: "descending"
            }).then((docs) => {

                const payload = {
                    name: doc.name,
                    email: doc.email,
                    testHistory: docs.map((doc) => {
                        return {
                            id: doc._id,
                            paperName: doc.paperName,
                            numQuestions: doc.numQuestions,
                            time: doc.time,
                            maxScore: doc.maxScore,
                            score: doc.score,
                            timestamp: doc.updatedAt
                        }
                    })
                }

                return res.status(200).json(payload);
            }).catch((err) => {
                console.log(err);
                return res.sendStatus(500);
            });
        }).catch((err) => {
            console.log(err);
            return res.sendStatus(500);
        });
    },
    examList: (req, res) => {

        TestHistoryModel.find({
            studentId: req.auth.userId
        }, (err, histTests) => {
            if (err) {
                console.log(err.message);
                return res.sendStatus(500);
            }

            const excludedTests = histTests.map((doc) => doc.questionPaper);

            QuestionPaperModel.find({
                _id: {
                    $nin: excludedTests
                },
                deleted: 0
            }).sort({
                createdAt: "descending"
            }).then((availableTests) => {
                const payload = availableTests.map((doc) => {
                    return {
                        id: doc._id,
                        paperName: doc.paperName,
                        time: doc.time,
                        maxScore: doc.maxScore,
                        numQuestions: doc.numQuestions,
                        timestamp: doc.updatedAt
                    };
                });

                return res.status(200).json(payload);
            }).catch((err) => {
                console.log(err.message);
                return res.sendStatus(500);
            })
        });
    },
    getQuestionPaper: (req, res) => {
        const { id } = req.query;

        if (!id) return res.status(400).json({
            error: 'MISSING_EXAM_ID'
        });

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.sendStatus(400).json({
                error: 'INVALID_EXAM_ID'
            });
        }

        TestHistoryModel.findOne({
            questionPaper: id,
            studentId: req.auth.userId
        }, (err, doc) => {
            if (err) {
                console.log(err.message);
                return res.sendStatus(500);
            }

            if (doc) {
                return res.status(403).json({
                    error: 'ALREADY_SUBMITTED'
                });
            }

            QuestionPaperModel.findById(id).then((doc) => {
                if (!doc) return res.status(404).json({
                    error: 'EXAM_NOT_FOUND'
                });

                if(doc.deleted !== 0) {
                    return res.status(404).json({
                        error: 'EXAM_DELETED'
                    });
                }

                res.status(200).json(processQuestionDoc(doc));
            }).catch((err) => {
                console.log(err.message);
                return res.sendStatus(500);
            });
        });
    },
    postAnswers: (req, res) => {

        const { id } = req.query;

        if (!id) return res.status(400).json({
            error: 'MISSING_EXAM_ID'
        });

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.sendStatus(400).json({
                error: 'INVALID_EXAM_ID'
            });
        }

        const sub = req.body;

        TestHistoryModel.findOne({
            questionPaper: id,
            studentId: req.auth.userId
        }, (err, doc) => {
            if (err) {
                console.log(err.message);
                return res.sendStatus(500);
            }

            if (doc) {
                return res.status(403).json({
                    error: 'ALREADY_SUBMITTED'
                });
            }

            QuestionPaperModel.findById(id).then((doc) => {

                if (!doc) {
                    return res.status(404).json({
                        error: 'EXAM_NOT_FOUND'
                    });
                }

                if (doc.deleted !== 0) {
                    return res.status(404).json({
                        error: 'EXAM_DELETED'
                    });
                }

                try {
                    const payload = assignScores(doc.questions, sub);

                    TestHistoryModel.create({
                        questionPaper: doc._id,
                        studentId: req.auth.userId,
                        paperName: doc.paperName,
                        numQuestions: doc.numQuestions,
                        time: doc.time,
                        maxScore: doc.maxScore,
                        score: payload.score,
                    }).then(() => {
                        return res.status(200).json(payload);
                    }).catch((err) => {
                        console.log(err.message);
                        return res.sendStatus(500);
                    });
                } catch (err) {
                    console.log(err.message);
                    return res.sendStatus(400);
                }

            }).catch((err) => {
                console.log(err.message);
                return res.sendStatus(500);
            });
        });
    }
}

export { studentApiController };