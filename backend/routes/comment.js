import express from "express";
import postSchema from "../database/zodValidation/post.js";
import mainPost from "../database/post.js";
import authMiddleware from "../middileware.js";
import User from "../database/user.js";

const router = express.Router()
router.use(express.json())
router.patch("/add", authMiddleware, async(req, res)=>{
    try {
        const userEmail = req.email;
        console.log(userEmail)
        const user = await User.findOne({
            email:userEmail
        })
        if(!user){
            return res.status(400).json({message:"User Not Found"})
        }
        const commentData = req.body;

        const addComment = await mainPost.findByIdAndUpdate(
            commentData.id,
            {
                $push: {
                    comments:{
                        firstName:user.firstName,
                        lastName:user.lastName,
                        userId:user._id,
                        commnetText:commentData.text
                    }
                }
            },
            { new : true}
        )
        if(!addComment){
            return res.status(400).json({message:"Post Not Found"})
        }
        res.status(200).json({message:" Comment Added Successfully",post:addComment})
    } catch (error) {
        res.status(500).json(error.message)
    }
})


export default router;