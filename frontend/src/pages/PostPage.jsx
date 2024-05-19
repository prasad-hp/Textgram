import React, { useEffect, useState } from "react";
import NavbarTop from "../components/NavbarTop";
import NavbarBottom from "../components/NavbarBottom";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import PostSingle from "../components/PostSingle";
import Comment from "../components/Comment";

function PostPage() {
    const [postData, setPostData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [postUrlData] = useSearchParams();
    const postId = postUrlData.get("id");
    
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
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, [postId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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
                            likeCount={postData.post.like} 
                            firstName={postData.firstName} 
                            lastName={postData.lastName} 
                            id={postData._id} 
                        />
                        {postData.post.comment && <Comment comment={postData.post.comment} />}
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
