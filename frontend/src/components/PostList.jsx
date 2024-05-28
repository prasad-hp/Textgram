import React, { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";

function PostList(){
    const [statusMessage, setStatusMessage] = useState("")
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
                setPosts(response.data)
            } catch (error) {
                setStatusMessage(error.response.data.message)
            }
        }
        getData()
    }, [])

    const postList = posts.slice().reverse().map((postData, index)=>{
        return(<Post key={index} postText={postData.post.postText} likeCount={postData.post.likes.length} firstName={postData.firstName} lastName={postData.lastName} id={postData._id}/>)
    })
    return(
        <div>
            {postList}
            {statusMessage && <p>{statusMessage}</p>}
        </div>
    )
}
export default PostList;