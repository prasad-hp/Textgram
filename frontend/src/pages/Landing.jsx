import React, {useState} from "react";
import PostCard from "../components/PostCard";

function LandingPage() {
    return(
        <div className="h-screen flex justify-center w-screen">
            <div className="flex flex-col align-start w-screen lg:w-1/3">
                <PostCard />
                <PostCard />
                <PostCard />
            </div>
        </div>
    )
};

export default LandingPage;
