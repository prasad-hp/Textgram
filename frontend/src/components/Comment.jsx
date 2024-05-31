import React, { useEffect, useState } from "react";

function Comment(props){

    return(
        <div className="w-screen sm:w-11/12 md:w-475 rounded-md items-center border border-gray-200">
                <div className="flex items-center">
                    <img src="./defaultprofilepic.png" className="h-14 p-2" />
                    <h1 className="font-semibold m-2">{props.comments.firstName}{" "}{props.comments.lastName}</h1>
                </div>
                <div className="px-16 w-full pb-5">
                    <p>{props.comments.commentText}</p>
                </div>
        </div>
    )
}

export default Comment;
