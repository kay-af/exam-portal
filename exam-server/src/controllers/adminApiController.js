import { QuestionPaperModel } from '../models/questionPaperModel';
import mongoose from 'mongoose';
import { StudentModel } from '../models/studentModel';
import { AdminModel } from '../models/adminModel';
import bcrypt from 'bcrypt';
import { TestHistoryModel } from '../models/testHistoryModel';
import { PortalInner } from '../../../exam-client/node_modules/semantic-ui-react';

function processLowLevelQuestionDoc(doc) {
    return {
        ...processHighLevelQuestionDoc(doc),
        shuffleable: doc.shuffleable,
        questions: doc.questions.map((q) => {
            return {
                id: q._id,
                isMultiple: q.isMultiple,
                shuffleable: q.shuffleable,
                answers: q.answers,
                score: q.score,
                shuffleable: q.shuffleable,
                questionText: q.questionText,
                options: q.optionKeys.map((opt) => {
                    return {
                        key: opt.key,
                        value: opt.value
                    }
                })
            }
        })
    }
}

function processHighLevelQuestionDoc(doc) {
    return {
        id: doc._id,
        paperName: doc.paperName,
        time: doc.time,
        numQuestions: doc.numQuestions,
        timestamp: doc.createdAt,
        maxScore: doc.maxScore,
        visibleToStudent: doc.deleted === 0 ? true : false,
        shuffleable: doc.shuffleable
    };
}

function processHighLevelStudentDoc(doc) {
    return {
        id: doc._id,
        name: doc.name,
        email: doc.email,
        timestamp: doc.createdAt
    }
}

function processHighLevelTestHistoryDoc(doc) {
    return {
        examId: doc.questionPaper,
        studentId: doc.studentId,
        paperName: doc.paperName,
        numQuestions: doc.numQuestions,
        time: doc.time,
        maxScore: doc.maxScore,
        score: doc.score,
        timestamp: doc.createdAt
    };
}

const adminApiController = {

    getPaper: (req, res) => {

        const { id } = req.query;

        if (!id) {
            // Send all papers
            QuestionPaperModel.find({
                deleted: {
                    $ne: 2
                }
            }).sort({
                createdAt: "descending"
            }).then((docs) => {
                return res.status(200).json(docs.map(processHighLevelQuestionDoc));
            }).catch((err) => {
                console.log(err.message);
                return res.sendStatus(500);
            });
        } else {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    error: 'INVALID_EXAM_ID'
                });
            }

            QuestionPaperModel.findById(id).then((doc) => {
                if (doc.deleted === 2) {
                    return res.status(404).json({
                        error: 'EXAM_DELETED'
                    });
                }

                TestHistoryModel.find({
                    questionPaper: id
                }).sort({
                    score: "descending"
                }).populate('studentId').then((testDocs) => {
                    const attempts = testDocs.map((d) => {
                        return {
                            ...processHighLevelStudentDoc(d.studentId),
                            score: d.score
                        }
                    });
                    return res.status(200).json({
                        ...processLowLevelQuestionDoc(doc),
                        attemptCount: testDocs.length,
                        attempts: attempts
                    });
                }).catch((err) => {
                    console.log(err.message);
                    return res.sendStatus(500);
                });

            }).catch((err) => {
                console.log(err.message);
                return res.sendStatus(500);
            });
        }
    },
    addPaper: (req, res) => {
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
    },
    makePaperVisible: (req, res) => {
        const { id, set } = req.query;
        const del = set === 'true' ? 0 : 1

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                error: 'INVALID_EXAM_ID'
            });
        }

        QuestionPaperModel.updateOne({
            _id: id
        }, {
            deleted: del
        }).then(() => {
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err.message);
            return res.sendStatus(500);
        });
    },
    deletePaper: (req, res) => {
        const { id } = req.query;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                error: 'INVALID_EXAM_ID'
            });
        }

        QuestionPaperModel.updateOne({
            _id: id
        }, {
            deleted: 2
        }).then(() => {
            return res.sendStatus(200);
        }).catch((err) => {
            console.log(err.message);
            return res.sendStatus(500);
        });
    },
    getStudent: (req, res) => {
        const { id } = req.query;

        if (!id) {
            StudentModel.find({}).then((docs) => {
                return res.status(200).json(docs.map(processHighLevelStudentDoc));
            }).catch((err) => {
                console.log(err);
                return res.sendStatus(500);
            });
        } else {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    error: 'INVALID_STUDENT_ID'
                });
            }

            StudentModel.findById(id).then((doc) => {
                TestHistoryModel.find({
                    studentId: id
                }).sort({ createdAt: "descending" }).then((docs) => {
                    const payload = {
                        ...processHighLevelStudentDoc(doc),
                        testHistory: docs.map(processHighLevelTestHistoryDoc)
                    }
                    return res.status(200).json(payload);
                }).catch(err => {
                    console.log(err.message);
                    return res.sendStatus(500);
                });
            }).catch(err => {
                console.log(err.message);
                return res.sendStatus(500);
            });
        }
    },
    updateCredentials: (req, res) => {
        const { password, newPassword } = req.body;

        if (!password || !newPassword) {
            return res.status(400).json({
                error: 'PASSWORDS_REQUIRED'
            });
        }

        AdminModel.findOne({
            username: 'admin'
        }).then((doc) => {
            bcrypt.compare(password, doc.password, (err, same) => {
                if (err) {
                    console.log(err.message);
                    return res.sendStatus(500);
                }

                if (!same) {
                    return res.status(403).json({
                        error: 'PASSWORD_MISMATCH'
                    });
                } else {
                    bcrypt.hash(newPassword, 10, (err, encrypted) => {
                        if (err) {
                            console.log(err.message);
                            return res.sendStatus(500);
                        }

                        AdminModel.updateOne({
                            username: 'admin',
                        }, {
                            password: encrypted
                        }).then(() => {
                            return res.sendStatus(201);
                        }).catch(err => {
                            console.log(err.message);
                            return res.sendStatus(500);
                        })
                    })
                }
            })
        }).catch((err) => {
            console.log(err.message);
            return res.sendStatus(500);
        });
    },
    dashboardInfo: (req, res) => {

        Promise.all([
            QuestionPaperModel.find({ deleted: 0 }).countDocuments(),
            StudentModel.countDocuments(),
            TestHistoryModel.countDocuments(),
            TestHistoryModel.find({}).sort({
                createdAt: "descending"
            }).limit(15).populate('studentId')
        ]).then((values) => {

            const payload = {
                activeTests: values[0],
                numStudents: values[1],
                totalTests: values[2],
                testHistory: values[3].map((doc) => {
                    const d = processHighLevelTestHistoryDoc(doc)
                    const student = d.studentId;
                    delete d.studentId;
                    d.student = {
                        name: student.name,
                        email: student.email
                    };
                    return d;
                }),
            }

            return res.status(200).json(payload);
        }).catch((err) => {
            console.log(err.message);
            return res.sendStatus(500);
        });
    }
}

export { adminApiController }