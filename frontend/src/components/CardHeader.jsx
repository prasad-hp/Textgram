import React from "react";
import profileIcon from "../assets/images/profileIcon.jpeg"

function CardHeader(){
    return(
        <div className="flex justify-start items-center">
            <img src={profileIcon} className="rounded-full w-10 m-4"/>
            <h1>Prasad Hp</h1>
        </div>
    )
}

export default CardHeader;