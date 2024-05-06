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
        default:0}
})

const Post = mongoose.model("Post", postSchema)

export default Post;