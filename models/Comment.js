const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        commentBody: {
            type: String,
            required: true,
            maxlength: 500,
        },
        userId: {
            type: String,
            required: true,
        },
        questionId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

// commentSchema.statics.listComments = async function (questionId) {
//     console.log(questionId)
//     const comments = await this.find({ questionId:questionId });//.exec();
//     console.log("in model comment: " , comments);
//     if (comments) {
//         return comments;
//     }
//     return null;
//     // throw Error("there is no comment!");
// };

const Comment = mongoose.model("comment", commentSchema);

module.exports = {
    Comment,
};
