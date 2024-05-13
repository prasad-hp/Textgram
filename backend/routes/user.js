import express from "express"
import User from "../database/user.js"
import userSchema from "../database/zodValidation/user.js"
import JWT_SECRET from "../config.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const router = express.Router()
router.use(express.json())

router.post("/create", async(req, res)=>{
    try {
        const createUser = req.body
        const parsedUser = userSchema.safeParse(createUser)
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
            message:"User Created Successfully",
            data:token
        })
        
    } catch (error) {
        res.status(500).json(error.message)
    }
})



export default router;
