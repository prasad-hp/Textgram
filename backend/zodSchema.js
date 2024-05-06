import zod from "zod"

const zodSchema = zod.object({
    postText:zod.string(),
    likes:zod.number()
})

export default zodSchema;