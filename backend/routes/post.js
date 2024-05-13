import express from "express";
import postSchema from "../database/zodValidation/post.js";
import mainPost from "../database/post.js";
import authMiddleware from "../middileware.js";

const router = express.Router()

router.use(express.json())

router.get("/", (req, res)=>{
    res.send("hello")
})

router.post("/create",authMiddleware ,async(req, res)=>{
    const post = req.body;
    const parsedPost = postSchema.safeParse(post)
    if(!parsedPost.success){
        return res.status(400).json(parsedPost.error.issues[0].message)
    }
    const createPost = await mainPost.create(post)
    res.status(200).json({message:"Your post has been successfully Posted"})
})

router.delete("/delete",authMiddleware, async(req, res)=>{
    const deletePost = await mainPost.findByIdAndDelete({
        _id:req.body._id
    })
    res.status(200).json({message:"Your post has been successfully Deleted"})
})

export default router;