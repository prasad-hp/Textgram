import zod from "zod"

const zodSchema = zod.object({
    postText:zod.string()
})

export default zodSchema;