import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/Textgram")

const userSchema = mongoose.Schema({
    firstName: {
        type:String,
        required: true },
    lastName: {
        type:String,
        required: false },
    email: {
        type:String,
        required: true },
    password: {
        type: String,
        required : false }
})

const User = mongoose.model("User", userSchema)

export default User;