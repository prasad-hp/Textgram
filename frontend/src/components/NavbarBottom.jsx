import React, { useState } from "react";
import homeIcon from "../assets/homeIcon.svg";
import postAdd from "../assets/postAdd.svg";
import profile from "../assets/profile.svg";
import NewPost from "./NewPost";
import MenuBottom from "./MenuBottom.jsx"; 
import menuGray from "../assets/menuGray.svg";

function NavbarBottom() {
    const [newPost, setNewPost] = useState(false);
    const [displayMenu, setDisplayMenu] = useState(false);

    function handleClose() {
        setNewPost(false);
    }

    return (
        <div className="relative md:w-475 w-412 h-16">
            <div className="w-screen md:hidden flex justify-around py-4 items-center border border-gray-200 bg-white bg-opacity-75 fixed bottom-0 z-100">
                <a href="/">
                    <img src={homeIcon} alt="Home" className="w-10 h-10 p-2 rounded-md hover:bg-slate-300" />
                </a>
                <img
                    src={postAdd}
                    alt="Add Post"
                    onClick={() => setNewPost(true)}
                    className="w-10 h-10 p-2 rounded-md hover:bg-slate-300"
                />
                <div className="w-10 relative">
                    <img
                        src={menuGray}
                        className="hover:cursor-pointer w-10 h-10 p-2 rounded-md hover:bg-slate-300"
                        onClick={() => setDisplayMenu(!displayMenu)}
                    />
                    <MenuBottom menu={displayMenu} />
                </div>
                <a href="/userprofile">
                    <img src={profile} alt="Profile" className="w-10 h-10 p-2 rounded-md hover:bg-slate-300" />
                </a>
            </div>
            {newPost && (
                <div className="z-200 absolute top-0 left-0 w-screen h-screen">
                    <NewPost newPost={newPost} onClose={handleClose} />
                </div>
            )}
        </div>
    );
}

export default NavbarBottom;
