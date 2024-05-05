import React from "react";
import Likes from "./Likes";
import Comments from "./Comments";

function PostFooter(props){
    return(
        <div>
            <div className="flex justify-start pl-16">
                <Likes />
                {/* <Likes posts = {props.posts} />
                <Comments posts = {props.posts} /> */}
            </div>
        </div>

    )
}

export default PostFooter;