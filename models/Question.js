const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        maxlength: 500

    },
    userid: {
        type: String,
        required: true,
    },
    
}, { timestamps: true });

const Question = mongoose.model("question", questionSchema);

module.exports = {
    Question
};
