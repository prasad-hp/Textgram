import React, { useState } from "react";
import CreatePostLanding from "../components/CreatePostLanding";
import Post from "../components/Post";

function LandingPage(){

    return(
        <div className="w-screen">
            <div className="w-full flex flex-col items-center">
                <div className="">
                    <CreatePostLanding />
                    <Post />
                </div>
            </div>
        </div>
    )
}

export default LandingPage;