import React, {useState} from "react";
import PostCard from "../components/PostCard";

function LandingPage() {
    return(
        <div className="h-screen">
            <div className="flex flex-col justify-center lg:w-1/3">
                <PostCard />
            </div>
        </div>
    )
};

export default LandingPage;
