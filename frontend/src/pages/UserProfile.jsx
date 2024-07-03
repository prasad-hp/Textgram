import React, { useState, useEffect } from "react";
import NavbarTop from "../components/NavbarTop";
import NavbarBottom from "../components/NavbarBottom";
import axios from "axios";
import profile from "../../public/defaultprofilepic.png";
import PostListProfile from "../components/PostListProfile";
import { useNavigate } from "react-router-dom";
import url from "../config";

function UserProfile() {
    const [statusMessage, setStatusMessage] = useState("");
    const [user, setUser] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        if(!localStorage.getItem("token")){
            navigate("/login")
        }
        async function getUser() {
            try {
                const response = await axios({
                    method: "get",
                    url: `${url}/api/v1/user`,
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });
                setUser(response.data);
            } catch (error) {
                setStatusMessage(error.response?.data?.message || "An error occurred");
            }
        }
        getUser();
    }, []);

    return (
        <div className="w-screen">
            <div className="flex flex-col items-center">
                <header className="fixed top-0 left-0 md:inline-block hidden">
                    <NavbarTop />
                </header>
                <div className="w-full flex flex-col items-center md:mt-16 mt-3">
                    <div className="md:w-475 sm:w-11/12 w-full border">
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col items-start m-4">
                                <h1 className="font-semibold text-xl">{user.firstName} {user.lastName}</h1>
                                <h2>{user.email}</h2>
                            </div>
                            <img src={user.profilePic || profile} className="w-20 m-4" alt="Profile" />
                        </div>
                        <h1 className="flex justify-center items-center font-semibold text-xl">Posts</h1>
                        <div className="w-full flex flex-col items-center">
                            {user._id && <PostListProfile userId={user._id} />}
                        </div>
                    </div>
                </div>
                <footer className="fixed bottom-0 left-0">
                    <NavbarBottom />
                    {statusMessage && <p>{statusMessage}</p>}
                </footer>
            </div>
        </div>
    );
}

export default UserProfile;
