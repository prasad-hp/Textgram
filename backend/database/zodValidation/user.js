import zod from "zod";

const signupSchema = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6, {message:"Password must be minimun 6 characters"})
})
const loginSchema = zod.object({
    email:zod.string().email(),
    password: zod.string().min(6, {message: "Password must be min 6 charaters"})
})

export {signupSchema, loginSchema};