import React, { useEffect, useState } from "react";
import NavbarTop from "../components/NavbarTop";
import NavbarBottom from "../components/NavbarBottom";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import PostSingle from "../components/PostSingle";
import Comment from "../components/Comment";

function PostPage() {
    const [postData, setPostData] = useState({});
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState()
    const [statusMessage, setStatusMessage] = useState("");
    const [postUrlData] = useSearchParams();
    const [commentsList, setCommentsList] = useState([])
    const postId = postUrlData.get("id");
    const navigate = useNavigate()

    useEffect(() => {
        if(!localStorage.getItem("token")){
            navigate("/login")
        }
        async function getData() {
            try {
                const response = await axios({
                    method: "get",
                    url: "http://localhost:3001/api/v1/post/single",
                    params: { id: postId },
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                setLiked(response.data.likedByUser)
                setPostData(response.data.post);
                setCommentsList(response.data.post.post.comments);
            } catch (error) {
                setStatusMessage(error.response?.data?.message || "An Error Occured")
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const listedComments = commentsList.slice().reverse().map((comment, index)=>{
        return(
            <Comment key={index} comments={comment} postId={postId}/>
        )
    })
    return (
        <div>
            <header>
                <NavbarTop />
            </header>
            <div className="flex flex-col items-center">
                {postData && postData.post && (
                    <>
                    
                        <PostSingle 
                            postText={postData.post.postText} 
                            likeCount={postData.post.likes.length}
                            firstName={postData.firstName} 
                            lastName={postData.lastName} 
                            id={postData._id} 
                            userId={postData.userId}
                            liked={liked}
                        />
                        { commentsList && listedComments }
                    </>
                )}
            </div>
            {statusMessage && <p>{statusMessage}</p>}
            <footer className="z-0 left-0">
                <NavbarBottom />
            </footer>
        </div>
    );
}

export default PostPage;
