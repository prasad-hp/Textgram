import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/Textgram")

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
})

const User = mongoose.model("User", userSchema)

export default User;