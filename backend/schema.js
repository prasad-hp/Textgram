import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    postText: String,
    comments: String,
    likes: Number
})

const Post = mongoose.model("Post", postSchema)

export default Post;