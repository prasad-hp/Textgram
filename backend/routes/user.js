import express from "express"
import User from "../database/user.js"
import userSchema from "../database/zodValidation/user.js"

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
        await User.create(createUser)

        res.status(200).json({
            message:"User Created Successfully",
            data:""
        })
        
    } catch (error) {
        res.status(500).json(error.message)
    }
})



export default router;
