import React from "react";
import Post from "./Post";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

function PostCard(){
    return(
        <div>
            <PostHeader />
            <Post />
            <PostFooter />
        </div>
    )
}

export default PostCard;