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
        <div className="md:w-475 w-412 h-16">
            <div className="w-screen md:hidden flex justify-around py-4 items-center border border-gray-200 bg-white bg-opacity-75">
                <a href="/home">
                    <img src={homeIcon} alt="Home" className="w-10 h-10 p-2 rounded-md hover:bg-slate-300"/>
                </a>
                <img
                    src={postAdd}
                    alt="Add Post"
                    onClick={()=>setNewPost(true)}
                    className="w-10 h-10 p-2 rounded-md hover:bg-slate-300"
                />
                <a href="/profile">
                    <img src={profile} alt="Profile" className="w-10 h-10 p-2 rounded-md hover:bg-slate-300"/>
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
