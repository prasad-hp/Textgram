import express from "express"
import mongoose from "mongoose";
import Post from "./schema";

const port = 3000;
const app = express();

mongoose.connect("mongodb://localhost:27017/Textgram")

app.get("/", (req, res) => {
    res.send("hello")
})

app.listen(port, ()=> console.log("port is running on the port" + port))