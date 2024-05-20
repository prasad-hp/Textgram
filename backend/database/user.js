import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

mongoose.connect(process.env.MONGODB)

const userSchema = mongoose.Schema({
    firstName: {
        type:String,
        required: true 
    },
    lastName: {
        type:String,
        required: false 
    },
    email: {
        type:String,
        required: true 
    },
    password: {
        type: String,
        required : false 
    },
    likedPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]

})

const User = mongoose.model("User", userSchema)

export default User;