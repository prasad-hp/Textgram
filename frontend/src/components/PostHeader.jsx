import React from "react";
import profileIcon from "../assets/images/profileIcon.jpeg"

function PostHeader(){
    return(
        <div className="flex justify-start items-center">
            <img src={profileIcon} className="rounded-full w-10 m-4 mr-2"/>
            {/* <img src="../assets/images/profileIcon.svg" /> */}
            <h1 className="font-semibold">Prasad Hp</h1>
        </div>
    )
}

export default PostHeader;