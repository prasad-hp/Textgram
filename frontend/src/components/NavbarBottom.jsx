import React, { useState } from "react";
import homeIcon from "../assets/homeIcon.svg";
import postAdd from "../assets/postAdd.svg";
import profile from "../assets/profile.svg";
import NewPost from "./NewPost";

function NavbarBottom() {
    const [newPostShow, setNewPostShow] = useState(false);

    const toggleNewPost = () => {
        setNewPostShow(!newPostShow);
    };

    return (
        <div className="md:w-475 w-412">
            <div className="w-screen md:hidden flex justify-around py-4">
                <a href="/home">
                    <img src={homeIcon} alt="Home" />
                </a>
                <img
                    src={postAdd}
                    alt="Add Post"
                    onClick={toggleNewPost}
                />
                <a href="/profile">
                    <img src={profile} alt="Profile" />
                </a>
            </div>
            {newPostShow && (
                <div className="z-10 absolute top-0 left-0">
                    <div className="w-96">
                        <NewPost />
                        <button onClick={toggleNewPost}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NavbarBottom;
