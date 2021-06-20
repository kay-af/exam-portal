import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        firstName: {
            type: mongoose.SchemaTypes.String,
            required: true
        },
        lastName: {
            type: mongoose.SchemaTypes.String,
            required: true
        }
    },
    email: {
        type: mongoose.SchemaTypes.String,
        unique: true,
        required: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true
    }
}, {
    timestamps: true
});

export { studentSchema };