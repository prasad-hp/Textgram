import { useState, React } from "react";

function PostText(props){
    return(
        <div className="w-full pl-16 pb-5">
            <p>{props.posts.postText}</p>
        </div>
    )
}

export default PostText;