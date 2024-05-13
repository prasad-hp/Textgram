import mongoose from "mongoose";
import User from "./user.js";

mongoose.connect("mongodb://localhost:27017/Textgram")

const commentSchema = mongoose.Schema({
    commentText:{
        type:String,
        required:false
    }
})

const postSchema = mongoose.Schema({
    postText:{
        type:String,
        required: true
    },
    like:{
        type: Number,
        default: 0
    },
    comment:{
        type: [commentSchema]
    }
})

const mainSchema = mongoose.Schema({
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    post:postSchema
})

const mainPost = mongoose.model("Post", mainSchema)

export default mainPost;