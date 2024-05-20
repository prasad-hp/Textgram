import mongoose from "mongoose";
import User from "./user.js";
import dotenv from "dotenv"
import commentSchema from "./comment.js";
dotenv.config()

mongoose.connect(process.env.MONGODB)

const postSchema = mongoose.Schema({
    postText:{
        type:String,
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: User
        }
    ],
    comments:{
        type: [commentSchema],  
        required:false
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

export {mainPost};