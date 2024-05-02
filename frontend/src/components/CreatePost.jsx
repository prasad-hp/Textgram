import React from "react";

function CreatePost(){
    return(
        <div className="w-full border rounded-lg my-2 p-3 flex">
            <textarea placeholder="Click here to create new Post" className="justify-start w-10/12"></textarea>
            
            <button className="justify-end align-bottom w-2/12 bg-blue-600 mx-3 my-1.5 rounded-xl">Post</button>
        </div>
    )
}

export default CreatePost;