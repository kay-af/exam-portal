import mongoose from "mongoose";

const optionKeySchema = new mongoose.Schema({
    key: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    value: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
});

export { optionKeySchema };