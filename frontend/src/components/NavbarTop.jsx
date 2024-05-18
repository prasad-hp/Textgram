import React from "react";
import homeIcon from "../assets/homeIcon.svg"
import postAdd from "../assets/postAdd.svg"
import profile from "../assets/profile.svg"
import menuIcon from "../assets/menuIcon.svg"
import atIcon from "../assets/atIcon.svg"

function NavbarTop(){
    return(
        <div className="w-screen flex justify-center py-3">
            <div className="flex justify-around md:w-3/4 w-full">
                <img src={atIcon} />
                <div className="md:inline-block hidden">
                    <div className="flex md:justify-between w-412 justify-end">
                        <img src={homeIcon} />
                        <img src={postAdd} />
                        <img src={profile} />
                    </div>
                </div>
                <img src={menuIcon} />
            </div>
        </div>
    )
}

export default NavbarTop;