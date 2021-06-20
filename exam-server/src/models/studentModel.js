import mongoose from 'mongoose'
import { studentSchema } from '../schemas/studentSchema';

const StudentModel = mongoose.model('Student', studentSchema);

export { StudentModel };