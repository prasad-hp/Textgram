import React from "react";
import Likes from "./Likes";
import Comments from "./Comments";

function PostFooter(props){
    return(
        <div>
            <div className="flex justify-start pl-16">
                <Likes likesCount = {props.post.likes} />
                <Comments />
            </div>
        </div>

    )
}

export default PostFooter;