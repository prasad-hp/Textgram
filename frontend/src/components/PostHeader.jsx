import React from "react";
import profileIcon from "../assets/images/profileIcon.svg"

function PostHeader(props){

    return(
        <div className="flex justify-start items-center">
            <img src={profileIcon} className="rounded-full w-10 m-4 mr-2"/>
            <h1 className="font-semibold">{props.posts.firstName + " " + props.posts.lastName}</h1>
        </div>
    )
}

export default PostHeader;