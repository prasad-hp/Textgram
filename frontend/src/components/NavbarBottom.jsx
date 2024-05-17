import React from "react";
import homeIcon from "../assets/homeIcon.svg"
import postAdd from "../assets/postAdd.svg"
import profile from "../assets/profile.svg"


function NavbarBottom(){
    return(
        <div className="w-screen md:hidden flex justify-around py-4">
            <img src={homeIcon} />
            <img src={postAdd} />
            <img src={profile} />
        </div>
    )
}   

export default NavbarBottom