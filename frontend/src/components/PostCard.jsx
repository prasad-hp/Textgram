import React from "react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import PostText from "./PostText";

function PostCard(props){
    return(
        <div className="w-full border rounded-lg mb-2">
            <PostHeader posts = {props.posts}/>
            <PostText posts = {props.posts}/>
            <PostFooter posts = {props.posts}/>
        </div>
    )
}

export default PostCard;