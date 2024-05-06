import express, { urlencoded } from "express"
import mongoose from "mongoose";
import Post from "./schema.js";
import cors from "cors"
import zodSchema from "./zodSchema.js";

const port = 3000;
const app = express();

app.use(express.json())
app.use(urlencoded({extended:false}))
app.use(cors({
    origin:"http://localhost:5173"
}))

mongoose.connect("mongodb://localhost:27017/Textgram")
    .then(()=>{
        console.log("Connected to Database")
    })


app.get("/posts", async(req, res) => {
    try {
        const posts = await Post.find({})
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.post("/post", async(req, res)=>{
    try {
        const post = await Post.create(req.body)
        const parsedPost = zodSchema.safeParse(post)
        console.log(parsedPost)
        res.status(200).json(parsedPost)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.delete("/post/:id", async(req, res)=>{
    try {
        const id = req.params.id;
        const post = await Post.findByIdAndDelete(id)
        if(!post){
            return res.status(404).json({message:"Wrong Post ID"})
        }
        res.status(200).json({message:"Post deleted Successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
app.patch("/post/:id/like", async(req, res)=>{
    try {
        const id = req.params.id;
        const post = await Post.findByIdAndUpdate(id, {$inc:{likes: +1 }})
        if(!post){
            return res.status(404).json({message:"Wrong Post ID"})
        }
        return res.status(200).json({message:"Post Liked Successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.patch("/post/:id/unlike", async(req, res)=>{
    try {
        const id = req.params.id;
        const post = await Post.findByIdAndUpdate(id, {$inc:{likes:-1}})
        if(!post){
            return res.status(404).json({message:"wrong Post Id"})
        }
        res.status(200).json({message:"Post Unliked Successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})


app.listen(port, ()=> console.log("port is running on the port" + port))