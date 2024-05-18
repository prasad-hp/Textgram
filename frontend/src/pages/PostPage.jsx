import React, { useEffect, useState } from "react";
import NavbarTop from "../components/NavbarTop";
import NavbarBottom from "../components/NavbarBottom";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import PostSingle from "../components/PostSingle";

function PostPage(){
    const [postText, setPostText] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [like, setLike] = useState(0)
    const [comments, setComments] = useState([])
    const [postData] = useSearchParams()
    const postId = postData.get("id");
    
    console.log(postId)
    useEffect(()=>{
        async function getData(){
            const response = await axios({
                method:"get",
                url:"http://localhost:3001/api/v1/post/single",
                params:{
                    id:postId
                }
            })
            console.log(response)
            const apiData = response.data;
            setPostText(apiData.post.postText)
            setComments(apiData.post.comment)
            setFirstName(apiData.firstName)
            setLastName(apiData.lastName)
            setLike(apiData.post.like)
        }
        getData()
    }, [postId])
    return(
        <div>
            <header>
                <NavbarTop />
            </header>
            <div className="flex flex-col items-center mt-16">
                <PostSingle postText={postText} likeCount={like} firstName={firstName} lastName={lastName} id={postId}/>
            </div>
            <footer className="z-0 left-0">
                <NavbarBottom />
            </footer>
        </div>
    )
}

export default PostPage;