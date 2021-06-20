import mongoose, { mongo } from 'mongoose';
import { questionPaperSchema } from '../schemas/questionPaperSchema';

const QuestionPaperModel = mongoose.model('QuestionPaper', questionPaperSchema);

export { QuestionPaperModel };