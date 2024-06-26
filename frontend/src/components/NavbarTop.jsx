import React, { useState } from "react";
import homeIcon from "../assets/homeIcon.svg";
import postAdd from "../assets/postAdd.svg";
import profile from "../assets/profile.svg";
import menuIcon from "../assets/menuIcon.svg";
import atIcon from "../assets/atIcon.svg";
import NewPost from "./NewPost.jsx";
import MenuTop from "./MenuTop.jsx";
import { useNavigate } from "react-router-dom";

function NavbarTop() {
    const [newPost, setNewPost] = useState(false);
    const [displayMenu, setDisplayMenu] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => {
        setNewPost(false);
    };

    return (
            <div className="w-screen hidden justify-center h-18 md:inline-block">
                <div className="flex justify-around items-top w-full h-full">
                    <div className="w-28">
                        <img
                            src={atIcon}
                            onClick={() => navigate("/home")}
                            className="hover:cursor-pointer w-12 h-12 p-2 rounded-full hover:bg-slate-300"
                        />
                    </div>
                    <div className="md:inline-block hidden h-16">
                        <div className="flex md:justify-around w-475 h-full justify-end items-center border border-gray-200 bg-white bg-opacity-75">
                            <img
                                src={homeIcon}
                                onClick={() => navigate("/home")}
                                className="hover:cursor-pointer w-10 h-10 p-2 rounded-md hover:bg-slate-300"
                            />
                            <img
                                src={postAdd}
                                alt="Add Post"
                                onClick={() => setNewPost(true)}
                                className="w-10 h-10 p-2 rounded-md hover:bg-slate-300"
                            />
                            <img
                                src={profile}
                                onClick={() => navigate("/userprofile")}
                                className="hover:cursor-pointer w-10 h-10 p-2 rounded-md hover:bg-slate-300"
                            />
                        </div>
                    </div>
                    <div className="w-28 relative">
                        <img
                            src={menuIcon}
                            className="hover:cursor-pointer w-12 h-12 p-2 rounded-full hover:bg-slate-300"
                            onClick={() => setDisplayMenu(!displayMenu)}
                        />
                        <MenuTop menu={displayMenu} />
                    </div>
                </div>
                {newPost && (
                    <div className="z-200 absolute top-0 left-0 w-screen h-screen">
                        <NewPost newPost={newPost} onClose={handleClose} />
                    </div>
                )}
            </div>
    );
}

export default NavbarTop;
