import express from "express";
import {commentTextSchema} from "../database/zodValidation/post.js";
import {mainPost} from "../database/post.js";
import authMiddleware from "../middileware.js";
import User from "../database/user.js";

const router = express.Router()
router.use(express.json())
router.patch("/add", authMiddleware, async(req, res)=>{
    try {
        const userEmail = req.email;
        const user = await User.findOne({
            email:userEmail
        })
        if(!user){
            return res.status(400).json({message:"User Not Found"})
        }
        const commentData = req.body;
        const parsedComment = commentTextSchema.safeParse(commentData)
        const addComment = await mainPost.findByIdAndUpdate(
            commentData.id,
            {
                $push: {
                    "post.comments":{
                        firstName:user.firstName,
                        lastName:user.lastName,
                        userId:user._id,
                        commentText:commentData.text
                    }
                }
            },
            { new : true}
        )
        if(!addComment){
            return res.status(400).json({message:"Post Not Found"})
        }
        res.status(200).json({message:" Comment Added Successfully"})
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.patch("/delete", authMiddleware, async(req, res)=>{
    try {
        const {userId, postId, commentId} = req.body;
        const user = await User.findOne({
            email: req.email
        })
        if(!user){
            return res.status(400).json({message:"Invalid User/User not logged in"})
        }
        const commentedUser = user._id.toString()
        if(commentedUser !== userId){
            return res.status(403).json({message:"You are not authorized to Delete this Comment"})
        }
        console.log(commentId, postId, userId, commentedUser)
        const deleteComment = await mainPost.findByIdAndUpdate(
            {_id:postId, "post.comments._id":commentId},
                {
                    $pull:{"post.comments":{_id:commentId}}
                },
                {new:true}
            )
        if(!deleteComment){
            return res.status(400).json({message:"Post/Comment Not Found"})
        }
        res.status(200).json({message:"Comment Deleted Successfully"})
    } catch (error) {
        res.status(500).json(error.message)
    }
})


export default router;