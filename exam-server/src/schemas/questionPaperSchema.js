import mongoose from "mongoose";
import { questionSchema } from "./questionSchema";

const questionPaperSchema = new mongoose.Schema({
    paperName: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    shuffleable: {
        type: mongoose.SchemaTypes.Boolean,
        default: false
    },
    questions: {
        type: [ questionSchema ],
        required: true
    },
    time: {
        type: mongoose.SchemaTypes.Number,
        default: 2 * 60 * 60
    },
}, {
    timestamps: true,
});

questionPaperSchema.virtual('maxScore').get(function() {
    let sum = 0
    this.questions.forEach((a) => sum += a.score);
    return sum;
});

questionPaperSchema.virtual('numQuestions').get(function() {
    return this.questions.length;
});

export { questionPaperSchema };