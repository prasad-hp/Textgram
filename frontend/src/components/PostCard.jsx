import React from "react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import PostText from "./PostText";

function PostCard(){
    return(
        <div className="w-full border rounded-lg mb-2">
            <PostHeader />
            <PostText />
            <PostFooter />
        </div>
    )
}

export default PostCard;