import React, { useState } from "react";
import homeIcon from "../assets/homeIcon.svg";
import postAdd from "../assets/postAdd.svg";
import profile from "../assets/profile.svg";
import NewPost from "./NewPost";

function NavbarBottom() {
    const [newPost, setNewPost] = useState(false);

    function handleClose(){
        setNewPost(false)
    }
    return (
        <div className="md:w-475 w-412">
            <div className="w-screen md:hidden flex justify-around py-4">
                <a href="/home">
                    <img src={homeIcon} alt="Home" className="h-7"/>
                </a>
                <img
                    src={postAdd}
                    alt="Add Post"
                    onClick={()=>setNewPost(true)}
                    className="h-7"
                />
                <a href="/profile">
                    <img src={profile} alt="Profile" className="h-7"/>
                </a>
            </div>
            {newPost && (
                <div className="z-10 absolute top-0 left-0 w-screen h-screen">
                    <NewPost newPost={newPost} onClose={handleClose} />
                </div>
            )}
        </div>
    );
}

export default NavbarBottom;
