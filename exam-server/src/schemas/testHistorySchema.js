import mongoose from 'mongoose';

const testHistorySchema = new mongoose.Schema({
    questionPaper: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'QuestionPaper',
        required: true
    },
    studentId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Student',
        required: true
    },
    paperName: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    numQuestions: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    time: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    maxScore: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    score: {
        type: mongoose.SchemaTypes.Number,
        required: true
    }
}, {
    timestamps: true,
    collection: "testhistories"
});

export { testHistorySchema };