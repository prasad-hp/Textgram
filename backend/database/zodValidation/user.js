import zod from "zod";

const userSchema = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6, {message:"Password must be minimun 6 characters"})
})

export default userSchema;