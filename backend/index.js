import express from "express"
import mainRouter from "./routes/index.js"

const app = express()
const port = 3001;

app.use("/api/v1", mainRouter)

app.listen(port, ()=>{
    console.log(`Listening to post ${port}`)
})