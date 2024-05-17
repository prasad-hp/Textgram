import React, { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";

function PostList(){
    const [message, setMessage] = useState("")
    const [posts, setPosts] = useState([])
    const [likeCount, setLikeCount] = useState(0)

    useEffect(()=>{
        async function getData () {
            try {
                const response = await axios({
                    method:"get",
                    url:"http://localhost:3001/api/v1/post/list"
                })
                console.log(response)
                setPosts(response.data)
            } catch (error) {
                setMessage(error.response.data.message)
            }
        }
        getData()
    }, [])

    const postList = posts.map((post, index)=>{
        return(<Post key={index} postText={post.post.postText} likeCount={post.post.like} firstName={post.firstName} lastName={post.lastName}/>)
    })
    return(
        <div>
            {postList}
        </div>
    )
}
export default PostList;