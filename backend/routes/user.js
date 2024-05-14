import express from "express"
import User from "../database/user.js"
import {signupSchema, loginSchema, updateSchema} from "../database/zodValidation/user.js"
import JWT_SECRET from "../config.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import authMiddleware from "../middileware.js"
import multer from "multer"
import dotenv from "dotenv"
import {GetObjectCommand,PutObjectCommand, S3Client} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
dotenv.config()

const s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY
    }
});

const router = express.Router()
router.use(express.json())
router.use(express.urlencoded({extended:false}))

router.post("/signup", async(req, res)=>{
    try {
        const createUser = req.body
        const parsedUser = signupSchema.safeParse(createUser)
        if(!parsedUser.success){
            return res.status(400).json(parsedUser.error.issues[0].message)
        }
        const existingEmail = await User.findOne({email: createUser.email})
        if(existingEmail){
            return res.status(400).json({message:"Email Already Used for Registering"})
        }
        const hashedPassword = await bcrypt.hash(createUser.password, 1)
        const createdUser = await User.create({
            firstName: createUser.firstName,
            lastName: createUser.lastName,
            email: createUser.email,
            password: hashedPassword
        })
        const tokenInput = hashedPassword;
        const token = jwt.sign({tokenInput}, JWT_SECRET)

        res.status(200).json({
            message:`${createUser.firstName} your account created Successfully`,
            token:token
        })
        
    } catch (error) {
        res.status(500).json(error.message)
    }
})
router.post("/login", async(req, res)=>{
    try {
        const loginUser = req.body;
        const parsedUser = loginSchema.safeParse(loginUser)
        if(!parsedUser.success){
            return res.status(400).json(parsedUser.error.issues[0].message)
        }
        const findUser = await User.findOne({
            email: loginUser.email
        })
        const loginPassword = await bcrypt.compare(loginUser.password, findUser.password)
        if(!loginPassword){
            return res.status(400).json({message:"Please enter valid password"})
        }
        const tokenInput = loginUser.password;
        const token = jwt.sign(tokenInput, JWT_SECRET)
        res.status(200).json({
            message:"You Are successfully logged in.",
            token: token
        })
    } catch (error) {
        res.status(500).json(error.message)
        
    }
})

router.put("/update",authMiddleware ,async(req, res)=>{
    try {
        const updateUser = req.body;
        const parsedUser = updateSchema.safeParse(updateUser)
        if(!parsedUser.success){
            return res.status(400).json({message: "Please Enter Valid User data"})
        }
        const hashedPassword = await bcrypt.hash(updateUser.password, 2)
        const user = await User.findOneAndUpdate({
            email:updateUser.email
        }, {
            firstName: updateUser.firstName,
            lastName: updateUser.lastName,
            password: hashedPassword
        })
        const tokenInput = hashedPassword
        const token = jwt.sign(tokenInput, JWT_SECRET)
        if(user){
            res.status(200).json({
                token:token,
                message: "User details Updated"})
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.delete("/delete",authMiddleware, async(req, res)=>{
    try {
        
        const deleteUser = req.body;
        const parsedUser = loginSchema.safeParse(deleteUser);
        if(!parsedUser.success){
            return res.status(400).json({message:"Please enter valid inputs"})
        }
        const user = await User.findOne({
            email:deleteUser.email
        })
        if(!user){
            return res.status(400).json({message:"Please enter the valid email"})
        }
        const hashedPassword = await bcrypt.compare(deleteUser.password, user.password)
        if(!hashedPassword){
            return res.status(400).json({message:"Please enter the valid password"})
        }
        await User.findOneAndDelete({
            email:deleteUser.email
        })
        res.status(200).json({message:"User Deleted Successfully"})
    } catch (error) {
        res.status(500).json(error.message)
    }
})
const storage = multer.memoryStorage({
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
const upload = multer({ storage: storage });

router.post("/profile",authMiddleware, upload.single("avatar"), async(req, res)=>{
    try {
        const photo = req.file;
        const params = {
            Bucket:"prasadhp-textgram",
            Key:"profile-pictures/" + photo.originalname,
            Body:photo.buffer
        }
        const command = new PutObjectCommand(params);
        const result = await s3Client.send(command);
        console.log('File uploaded successfully:', result.Location);
        res.send('File uploaded successfully'); 

    } catch (error) {
        res.status(500).json(error.message)
    }
})  
router.get("/profile", authMiddleware, async(req, res)=>{
    try {
        async function getObjectURL(folder, key){
            const command = new GetObjectCommand({
                Bucket:"prasadhp-textgram",
                Key:folder + "/" + key
            });
            const url = await getSignedUrl(s3Client, command)
            return url;
        }
        (async ()=> {
            try {
                const url = await getObjectURL("profile-pictures","145915658.jpeg")
                console.log("URL for image", url)
            } catch (error) {
                console.error({"Message":error.message})
            }
        }) ();  
    } catch (error) {
        res.status(500).json(error.message)
    }
})
export default router;
