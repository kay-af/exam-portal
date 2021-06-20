import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        unique: true,
        required: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true
    }
});

export { adminSchema };