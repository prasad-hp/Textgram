import React, {useState} from "react";
import PostCard from "../components/PostCard";
import userPosts from "../../dbTest"; 
import CreatePost from "../components/CreatePost";

function LandingPage() {

    const postList = userPosts.map((userPost)=> {
        return(
            <div key={userPost.id}>
                <PostCard 
                posts = {userPost}/>
            </div>
        )
    })

    return(
        <div className="h-screen flex justify-center w-screen">
            <div className="flex flex-col align-start w-screen lg:w-1/3 md:w-1/2 max-w-xl">
                <CreatePost />
                {postList}
            </div>
        </div>
    )
};

export default LandingPage;
