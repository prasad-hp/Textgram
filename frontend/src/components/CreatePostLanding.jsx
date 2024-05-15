import React from "react";

function CreatePostLanding(){
    return(
        <div className="md:flex md:w-full md:items-center md:min-w-md hidden">
            <img src="./defaultprofilepic.png" className="h-10"/>
            <span className="text-gray-400 pl-5 w-450">Start the post...</span>
            <div className="h-10 bg-gray-400 font-semibold w-16 rounded-3xl text-white flex flex-col items-center justify-center">Post</div>
        </div>
    )
}
export default CreatePostLanding;