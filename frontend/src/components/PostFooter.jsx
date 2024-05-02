import React from "react";
import Likes from "./Likes";
import Comments from "./Comments";

function PostFooter(){
    return(
        <div>
            <div className="flex justify-start">
                <Likes />
                <Comments />
            </div>
        </div>

    )
}

export default PostFooter;