import React, { useEffect, useState } from "react";
import CreatePostLanding from "../components/CreatePostLanding";
import Post from "../components/Post";
import NavbarBottom from "../components/NavbarBottom";
import NavbarTop from "../components/NavbarTop";
import PostList from "../components/PostList";
import axios from "axios";

function Home(){
    useEffect(()=>{
        async function getUser(){
            const response = await axios({
                method:"get",
                url:""
            })
        }
        getUser()
    })

    return(
        <div className="w-screen">
            <header className="fixed top-0 left-0 md:inline-block hidden">
                <NavbarTop />
            </header>
                <div className="flex flex-col items-center mt-16">
                    <CreatePostLanding />
                    <PostList />
                </div>
            <footer className="fixed bottom-0 left-0 ">
                <NavbarBottom />
            </footer>
        </div>
    )
}
export default Home;