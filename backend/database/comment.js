import mongoose from "mongoose";
import User from "./user.js";

const commentSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    commentText:{
        type:String,
        required:true
    }
})

export default commentSchema;