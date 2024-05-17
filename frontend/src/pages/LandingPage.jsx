import React, { useState } from "react";
import CreatePostLanding from "../components/CreatePostLanding";
import Post from "../components/Post";
import NavbarBottom from "../components/NavbarBottom";
import NavbarTop from "../components/NavbarTop";

function LandingPage(){

    return(
        <div className="w-screen">
            <header className="fixed top-0 left-0 md:inline-block hidden">
                <NavbarTop />
            </header>
                <div className="flex flex-col items-center mt-16">
                    <CreatePostLanding />
                    <Post />
                </div>
            <footer className="fixed bottom-0 left-0 ">
                <NavbarBottom />
            </footer>
        </div>
    )
}
export default LandingPage;