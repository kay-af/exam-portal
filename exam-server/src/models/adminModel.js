import mongoose from 'mongoose'
import { adminSchema } from '../schemas/adminSchema';

const AdminModel = mongoose.model('Admin', adminSchema);

export { AdminModel };