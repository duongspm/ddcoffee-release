//luu tru cac bai post
import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author:{
        type: String,
        reuired: true,
        default: 'Duongg'
    },
    attachment: String,
    likeCount: {
        type: Number,
        default: 0
    }
    //createAt, updatedAt
}, {timestamps: true}
);
export const PostModel = mongoose.model('post',schema);