import React from "react";
import profileIcon from "../assets/profileIcon.svg"


function PostHeader(){

    return(
        <div className="flex justify-start items-center w-full">
            <img src={profileIcon} className="rounded-full w-10 m-1 mr-2"/>
            <h1 className="font-semibold">{"Unkonwn" + " " + "User"}</h1>
        </div>
    )
}

export default PostHeader;