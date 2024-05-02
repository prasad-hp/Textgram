import React, {useState} from "react";
import PostCard from "../components/PostCard";
import userPosts from "../../dbTest"; 

function LandingPage() {

    const postList = userPosts.map((userPost)=> {
        return(
            <PostCard 
            key={userPost.id}
            posts = {userPost}/>
        )
    })

    return(
        <div className="h-screen flex justify-center w-screen">
            <div className="flex flex-col align-start w-screen lg:w-1/3">
                
                {postList}

            </div>
        </div>
    )
};

export default LandingPage;
