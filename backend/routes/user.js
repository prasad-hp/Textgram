import express from "express"
import User from "../database/user.js"
import {signupSchema, loginSchema, updateSchema, passwordSchema} from "../database/zodValidation/user.js"
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
        const tokenInput = createUser.email;
        const token = jwt.sign({tokenInput}, JWT_SECRET)

        res.status(200).json({
            message:`${createUser.firstName} your account created Successfully`,
            token:token
        })
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
router.post("/login", async(req, res)=>{
    try {
        const loginUser = req.body;
        const parsedUser = loginSchema.safeParse(loginUser)
        if(!parsedUser.success){
            return res.status(400).json({message:parsedUser.error.errors[0].message})
        }
        const findUser = await User.findOne({
            email: loginUser.email
        })
        if(!findUser){
            return res.status(400).json({message:"User is not registed"})
        }
        const loginPassword = await bcrypt.compare(loginUser.password, findUser.password)
        if(!loginPassword){
            return res.status(400).json({message:"Please enter valid password"})
        }
        const tokenInput = loginUser.email;
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
        const user = await User.findOneAndUpdate({
            email:req.email
        }, {
            firstName: updateUser.firstName,
            lastName: updateUser.lastName
        })
        if(user){
            res.status(200).json({
                message: "User details Updated"})
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})
router.put("/changepassword",authMiddleware ,async(req, res)=>{
    try {
        const changepassword = req.body;
        const checkUser = await User.findOne({
            email:req.email
        })
        if(!checkUser){
            return res.status(400).json({message:"User not found/Please login"})
        }
        const loginPassword = await bcrypt.compare(changepassword.initialPassword, checkUser.password)
        if(!loginPassword){
            return res.status(400).json({message:"Password Doesn't Match"})
        }
        const parsedUser = passwordSchema.safeParse(changepassword.newPassword)
        if(!parsedUser.success){
            return res.status(400).json({message: parsedUser.message || "Please Enter Valid Password"})
        }
        const hashedPassword = await bcrypt.hash(changepassword.newPassword, 1)
        const user = await User.findOneAndUpdate({
            email:req.email
        }, {
            password: hashedPassword
        })
        if(user){
            res.status(200).json({
                message: "User Password Changed Successfully"})
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.delete("/delete",authMiddleware, async(req, res)=>{
    try {
        const deleteUser = req.body;
        if(req.email !== deleteUser.email ){
            return res.status(400).json({message:"Invalid User Email"})
        }
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
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/profilepic",authMiddleware, upload.single("profile-picture"), async(req, res)=>{
    try {
        const photo = req.file;
        const newFileName = Date.now() + '-'+ Math.floor(Math.random()*10000) + photo.originalname
        const params = {
            Bucket:"prasadhp-textgram",
            Key:"profile-pictures/" + newFileName,
            Body:photo.buffer
        }
        const command = new PutObjectCommand(params);
        await s3Client.send(command);
        res.status(200).json({Message:'File uploaded successfully', newFileName}); 
    } catch (error) {
        res.status(500).json(error.message)
    }
})  
router.get("/profilepic", authMiddleware, async(req, res)=>{
    try {
        const photo = req.body;
        const photoName = photo.name;
        console.log(photoName)

        async function getObjectURL(folder, key){
            const command = new GetObjectCommand({
                Bucket:"prasadhp-textgram",
                Key:folder + "/" + key
            });
            const url = await getSignedUrl(s3Client, command)
            return url;
        }
        async function getImage(){
            const imageUrl = await getObjectURL("profile-pictures", photoName)
            res.status(200).json({Message:"Photo Successfully received", imageUrl})
        }
        
        getImage()


    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.get("/", authMiddleware, async(req, res)=>{
    try { 
        const userEmail = req.email;
        const userData = await User.findOne({
            email:userEmail
        })
        res.status(200).json(userData)
    } catch (error) {
        res.status(500).json(error.message)
    }
})
router.get("/profile", authMiddleware, async(req, res)=>{
    try {
        const newUser = req.query;
        const {userId} = req.query;
        const user = await User.findOne({
            _id:userId
        })
        if(!user){
            return res.status(403).json({message:"User Not Found"})
        }
        const userData = {firstName:user.firstName, lastName:user.lastName, email:user.email, userId: user._id}
        res.status(200).json(userData)
    } catch (error) {
        res.status(500).json(error.json)
    }
})
export default router;
