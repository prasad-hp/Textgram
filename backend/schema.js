import mongoose from "mongoose";


const postSchema = mongoose.Schema({
    postText: {
        type:String,
        required: true},
    comments: {
        type:String,
        required:false},
    likes: {
        type:Number,
        required: false}
})

const Post = mongoose.model("Post", postSchema)

export default Post;