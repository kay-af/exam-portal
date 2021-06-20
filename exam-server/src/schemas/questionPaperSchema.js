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
}, {
    timestamps: true,
});

questionPaperSchema.virtual('maxScore').get(() => {
    return this.questions.reduce((a, b) => a.score + b.score, 0);
});

export { questionPaperSchema };