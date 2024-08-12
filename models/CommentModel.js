import mongoose from "mongoose";

// Comment Model
const commentSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    recipesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resep',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;