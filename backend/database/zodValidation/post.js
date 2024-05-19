import zod from "zod"

const commentSchema = zod.object({
    commentText:zod.string().max(200, {message:"Maximun characters per comment is 200"})
})

const postSchema = zod.object({
    post:zod.object({
        postText: zod.string().max(200, {message:"Maximum characters per post is 200"}),
        comments: zod.array(commentSchema).optional()

    })

})
export const commentTextSchema = zod.object({
    id : zod.string(),
    commentText : zod.string().max(200, { message:"Maximun characters per comment is 200"})
})

export default postSchema;