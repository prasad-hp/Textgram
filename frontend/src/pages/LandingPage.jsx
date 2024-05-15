import React from "react";
import CreatePostLanding from "../components/CreatePostLanding";

function LandingPage(){
    return(
        <div className="w-screen">
            <div className="w-full flex flex-col items-center">
                <div className="">
                    <CreatePostLanding />
                </div>
            </div>
        </div>
    )
}

export default LandingPage;