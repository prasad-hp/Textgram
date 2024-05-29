import React, { useState } from "react";
import NewPost from "./NewPost";

function CreatePostLanding(){
    const [newPost, setNewPost] = useState(false)

    function handleClose(){
        setNewPost(false)
    }
    return(
        <div className="md:w-475 w-412 border-x border-t border-gray-200">
            <div className="md:flex md:w-full md:items-center md:min-w-md hidden">
                <img src="./defaultprofilepic.png" className="h-14 p-2"/>
                <span className="text-gray-400 pl-5 md:w-450 w-96 text-xl" onClick={()=>setNewPost(true)}>Start the post...</span>
                <div className="h-9 bg-gray-400 font-semibold w-16 rounded-3xl text-white flex flex-col items-center justify-center mx-2">Post</div>
            </div>
            {newPost && 
            (<div className="z-10 absolute top-0 left-0 w-screen h-screen">
                    <NewPost newPost={newPost} onClose={handleClose} />
            </div>)
            }
        </div>
    )
}
export default CreatePostLanding;