import express from "express";
import postSchema from "../database/zodValidation/post.js";
import {mainPost} from "../database/post.js";
import authMiddleware from "../middileware.js";
import User from "../database/user.js";
import commentRouter from "./comment.js"

const router = express.Router()
router.use("/comment", commentRouter)
router.use(express.json())

router.get("/list",authMiddleware, async(req, res)=>{
    try {
        const posts = await mainPost.find({})
        const user = await User.findOne({
            email:req.email
        })
        if(!posts){
            return res.status(400).json({message:"Unable to find Posts"})
        }
        const postsWithLiked = posts.map((post)=>{
            const hasLiked = post.post.likes.some(like=>like.equals(user._id))
            return{
                ...post.toObject(),
                likedByUser:hasLiked
            }
        })
        res.status(200).json(postsWithLiked)
    } catch (error) {
        res.status(500).json(error.message)
    }
})
router.get("/hello", async(req, res)=>{
    try {
        res.status(200).json({message:"Hello"})
    } catch (error) {
        res.status(500).json(error.message)
    }
})
router.get("/userlist", authMiddleware, async(req, res)=>{
    try {
        const userId = req.query.userId
        const loggedUser = await User.findOne({
            email: req.email 
        })
        const user = await User.findOne({
            _id: userId 
        })
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        const posts = await mainPost.find({
            userId: user._id
        })
        if(!posts){
            return res.status(400).json({message:"Unable to find Posts"})
        }
        const postsWithLiked = posts.map((post)=>{
            const hasLiked = post.post.likes.some(like=>like.equals(loggedUser._id))
            return{
                ...post.toObject(),
                likedByUser:hasLiked
            }
        })
        res.status(200).json(postsWithLiked)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post("/create",authMiddleware ,async(req, res)=>{
    try {
        const postData = req.body;
        const user = await User.findOne({
            email : req.email
        })
        const post = {
            firstName : user.firstName,
            lastName : user.lastName,
            userId : user._id,
            post : {
                postText : postData.postText
            } 
        }
        const parsedPost = postSchema.safeParse(post)
        if(!parsedPost.success){
            return res.status(400).json(parsedPost.error.issues[0].message)
        }
        const createPost = await mainPost.create(post)
        res.status(200).json({message:"Your post has been successfully Posted"})
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.delete("/delete",authMiddleware, async(req, res)=>{
    try {
        const user = await User.findOne({
            email:req.email
        })
        if(!user){
            return res.status(400).json({message:"Invalid User/User not loggedIn"})
        }
        const userId = user._id.toString()
        if(userId !== req.body.userId ){
            return res.status(400).json({message:"User not authorized to delete the post"})
        }
        const deletePost = await mainPost.findByIdAndDelete({
            _id:req.body.postId
        })
        if(!deletePost){
            return res.status(400).json({message:"Post not found/Already Deleted"})
        }
        res.status(200).json({message:"Your post has been successfully Deleted"})
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.get("/single",authMiddleware, async(req, res)=>{
    const data = req.query;
    const user = await User.findOne({
        email:req.email
    })
    if(!user){
        return res.status(400).json({message:"Invalid User/User Not loggedin"})
    }
    try {
        const getPost = await mainPost.findOne({_id:data.id}).populate("post.likes")
        const hasLiked = getPost.post.likes.some(like=>like.equals(user._id))
        res.status(200).json({
            post:getPost,
            likedByUser:hasLiked    
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post("/like", authMiddleware, async (req, res) => {
    const userEmail = req.email;
    const postId = req.body.postId;

    try {
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(400).json({ message: "Invalid User/User not loggedIn" });
        }
        const userId = user._id;

        const checkLiked = await mainPost.findOne({ _id: postId, "post.likes": userId });
        if (checkLiked) {
            return res.status(400).json({ message: "You have already liked the post" });
        }

        const postUpdate = await mainPost.findByIdAndUpdate(postId, {
            $push: { "post.likes": userId }
        });
        const userUpdate = await User.findByIdAndUpdate(userId, {
            $push: { likedPosts: postId }
        });

        if (!postUpdate || !userUpdate) {
            return res.status(500).json({ message: "Please try after sometime" });
        }

        res.status(200).json({ message: "Post successfully liked by the user" });
    } catch (error) {
        res.status(500).json(error.message);
    }
});


router.post("/unlike", authMiddleware, async (req, res) => {
    const userEmail = req.email;
    const postId = req.body.postId;

    try {
        const user = await User.findOne({ email: userEmail });
        const userId = user._id;

        if (!user) {
            return res.status(400).json({ message: "Invalid User/User not loggedIn" });
        }

        const checkLiked = await mainPost.findOne({ _id: postId, "post.likes": userId });
        if (!checkLiked) {
            return res.status(400).json({ message: "You have not liked the post to undo the like" });
        }

        const postUpdate = await mainPost.findByIdAndUpdate(postId, {
            $pull: { "post.likes": userId }
        });
        const userUpdate = await User.findByIdAndUpdate(userId, {
            $pull: { likedPosts: postId }
        });

        if (!postUpdate || !userUpdate) {
            return res.status(500).json({ message: "Please try after sometime" });
        }

        res.status(200).json({ message: "Post successfully unliked by the user" });
    } catch (error) {
        res.status(500).json(error.message);
    }
});

export default router;