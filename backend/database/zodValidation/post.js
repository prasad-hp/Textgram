import zod from "zod"

const postSchema = zod.object({
    post:zod.object({
        postText: zod.string().max(200, {message:"Maximum characters per post is 200"
    })

    })

})

export default postSchema;