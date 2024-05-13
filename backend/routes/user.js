import express from "express"
import User from "../database/user.js"
import {signupSchema, loginSchema} from "../database/zodValidation/user.js"
import JWT_SECRET from "../config.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const router = express.Router()
router.use(express.json())

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
            data:token
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



export default router;
