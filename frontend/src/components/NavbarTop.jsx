import React, { useState } from "react";
import homeIcon from "../assets/homeIcon.svg";
import postAdd from "../assets/postAdd.svg";
import profile from "../assets/profile.svg";
import menuIcon from "../assets/menuIcon.svg";
import atIcon from "../assets/atIcon.svg";
import { useNavigate } from "react-router-dom";
import NewPost from "./NewPost.jsx";

function NavbarTop() {
    const [newPost, setNewPost] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => {
        setNewPost(false);
    };

    return (
        <div>
            <div className="w-screen flex justify-center py-3">
                <div className="flex justify-around md:w-3/4 w-full">
                    <img src={atIcon} onClick={() => navigate("/")} className="hover:cursor-pointer" />
                    <div className="md:inline-block hidden">
                        <div className="flex md:justify-between w-412 justify-end">
                            <img src={homeIcon} onClick={() => navigate("/")} className="hover:cursor-pointer w-7" />
                            <img src={postAdd} onClick={() => setNewPost(true)} className="hover:cursor-pointer w-7" />
                            <img src={profile} onClick={() => navigate("/profile")} className="hover:cursor-pointer w-7"/>
                        </div>
                    </div>
                    <img src={menuIcon} />
                </div>
            </div>
            {newPost && (
                <div className="z-10 absolute top-0 left-0 w-screen h-screen">
                    <NewPost newPost={newPost} onClose={handleClose} />
                </div>
            )}
        </div>
    );
}

export default NavbarTop;
