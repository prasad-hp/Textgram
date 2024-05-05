import express, { urlencoded } from "express"
import mongoose from "mongoose";
import Post from "./schema.js";
import cors from "cors"

const port = 3001;
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
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})


app.listen(port, ()=> console.log("port is running on the port" + port))