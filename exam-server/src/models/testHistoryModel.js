import mongoose from 'mongoose'
import { testHistorySchema } from '../schemas/testHistorySchema';

const TestHistoryModel = mongoose.model('TestHistory', testHistorySchema);

export { TestHistoryModel };