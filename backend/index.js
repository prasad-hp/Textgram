import express, { urlencoded } from "express"
import mainRouter from "./routes/index.js"
import cors from "cors"

const app = express()
const port = 3001;
app.use(cors({
    origin:"http://localhost:5173"
}))
app.use("/api/v1", mainRouter)
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.listen(port, ()=>{
    console.log(`Listening to post ${port}`)
})