import React, { useState } from "react";
import CreatePostLanding from "../components/CreatePostLanding";
import Post from "../components/Post";

function LandingPage(){

    return(
        <div className="md:w-screen">
            <div className="w-screen ">
                <div className="w-412 sm:w-full flex flex-col items-center">
                    <CreatePostLanding />
                    <Post />
                </div>
            </div>
        </div>
    )
}

export default LandingPage;