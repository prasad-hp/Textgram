import React from "react";
import CreatePost from "../components/CreatePost";
import PostList from "../components/PostList";

function LandingPage(){
    return(
        <div className="w-screen h-screen">
            <div className="">
                <CreatePost />
                <PostList />
            </div>
        </div>
    )
}

export default LandingPage;