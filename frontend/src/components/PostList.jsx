import React, { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";

function PostList(){
    const [message, setMessage] = useState("")
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        async function getData () {
            try {
                const response = await axios({
                    method:"get",
                    url:"http://localhost:3001/api/v1/post/list",
                    headers:{
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
                console.log(response)
                setPosts(response.data)
            } catch (error) {
                setMessage(error.response.data.message)
            }
        }
        getData()
    }, [])

    const postList = posts.map((postData, index)=>{
        return(<Post key={index} postText={postData.post.postText} likeCount={postData.post.like} firstName={postData.firstName} lastName={postData.lastName} id={postData._id}/>)
    })
    return(
        <div>
            {message}
            {postList}
        </div>
    )
}
export default PostList;