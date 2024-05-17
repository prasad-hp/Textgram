import React from "react";
import homeIcon from "../assets/homeIcon.svg"
import postAdd from "../assets/postAdd.svg"
import profile from "../assets/profile.svg"
import menuIcon from "../assets/menuIcon.svg"
import atIcon from "../assets/atIcon.svg"

function NavbarTop(){
    return(
        <div className="w-screen flex justify-center py-3">
            <div className="flex justify-around w-3/4">
                <img src={atIcon} />
                <div className="flex justify-between w-412">
                    <img src={homeIcon} />
                    <img src={postAdd} />
                    <img src={profile} />
                </div>
                <img src={menuIcon} />
            </div>
        </div>
    )
}

export default NavbarTop;