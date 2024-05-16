import React, { useState } from "react";
import NewPost from "./NewPost";

function CreatePostLanding(){
    const [newPost, setNewPost] = useState("hidden")
    return(
        <div className="w-475">
            <div className="md:flex md:w-full md:items-center md:min-w-md hidden">
                <img src="./defaultprofilepic.png" className="h-14 p-2"/>
                <span className="text-gray-400 pl-5 w-450" onClick={()=>setNewPost("inline")}>Start the post...</span>
                <div className="h-10 bg-gray-400 font-semibold w-16 rounded-3xl text-white flex flex-col items-center justify-center">Post</div>
            </div>
            <div className={`${newPost} z-10 absolute top-0 left-0`} onDoubleClick={()=>setNewPost("hidden")}   >
                <NewPost />
            </div>
        </div>
    )
}
export default CreatePostLanding;