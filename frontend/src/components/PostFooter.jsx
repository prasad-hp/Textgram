import React from "react";
import Likes from "./Likes";
import Comments from "./Comments";

function PostFooter(){
    return(
        <div>
            <div className="flex justify-start pl-16">
                <Likes />
                <Comments />
            </div>
        </div>

    )
}

export default PostFooter;