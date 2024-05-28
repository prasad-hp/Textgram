import React, { useEffect, useState } from "react";
import NavbarTop from "../components/NavbarTop";
import NavbarBottom from "../components/NavbarBottom";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import PostSingle from "../components/PostSingle";
import Comment from "../components/Comment";

function PostPage() {
    const [postData, setPostData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [postUrlData] = useSearchParams();
    const postId = postUrlData.get("id");
    const [commentsList, setCommentsList] = useState([])
    
    useEffect(() => {
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
                setPostData(response.data);
                setCommentsList(response.data.post.comments);
            } catch (err) {
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    const listedComments = commentsList.slice().reverse().map((comment, index)=>{
        return(
            <Comment key={index} comments={comment}/>
        )
    })
    return (
        <div>
            <header>
                <NavbarTop />
            </header>
            <div className="flex flex-col items-center mt-16">
                {postData && postData.post && (
                    <>
                        <PostSingle 
                            postText={postData.post.postText} 
                            likeCount={postData.post.likes.length}
                            firstName={postData.firstName} 
                            lastName={postData.lastName} 
                            id={postData._id} 
                        />
                        {commentsList && listedComments }
                    </>
                )}
            </div>
            <footer className="z-0 left-0">
                <NavbarBottom />
            </footer>
        </div>
    );
}

export default PostPage;
