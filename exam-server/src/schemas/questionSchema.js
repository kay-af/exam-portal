import mongoose from 'mongoose';
import { optionKeySchema } from './optionKeySchema';

const questionSchema = new mongoose.Schema({
    questionText: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    optionKeys: {
        type: [ optionKeySchema ],
        required: true
    },
    answers: {
        type: [ mongoose.SchemaTypes.String ],
        required: true
    },
    score: {
        type: mongoose.SchemaTypes.Number,
        default: 1
    },
    shuffleable: {
        type: mongoose.SchemaTypes.Boolean,
        default: false
    }
});

questionSchema.virtual('isMultiple').get(function() {
    return this.answers.length > 1;
});

export { questionSchema };