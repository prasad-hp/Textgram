import React, { useEffect, useState } from "react";
import threeDots from "../assets/threeDots.svg"
import ConfirmDeleteComment from "./ConfirmDeleteComment";

function Comment(props){
    const [statusMessage, setStatusMessage] = useState("")
    const [deleteButton, setDeleteButton] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    
    function handleDeleteClose(){
        setConfirmDelete(false)
    }
    console.log(props.comments)
    return(
        <div className="w-screen sm:w-11/12 md:w-475 rounded-md items-center border border-gray-200">
                <div className="flex items-center justify-between">
                <div className="flex items-center">
                        <img src="./defaultprofilepic.png" className="h-12 pt-2 px-2" />
                        <h1 className="font-semibold mx-0">{props.comments.firstName}{" "}{props.comments.lastName}</h1>
                    </div>
                    <div className="relative">
                        <img src={threeDots} className="w-11 h-11 px-2.5 hover:cursor-pointer hover:bg-slate-300 rounded-full" onClick={()=>setDeleteButton(!deleteButton)}/>
                        {deleteButton && 
                            <div className={`${deleteButton ? "inline-block" : "hidden"} absolute z-10 right-10 top-7 w-20 justify-center flex items-center bg-white h-8 rounded-md hover:bg-slate-200 hover:cursor-pointer font-semibold text-center`} onClick={()=>setConfirmDelete(true)}>Delete</div>
                        }
                    </div>
                </div>
                <div className="px-16 w-full pb-5">
                    <p>{props.comments.commentText}</p>
                </div>
                {confirmDelete && <ConfirmDeleteComment onClose={handleDeleteClose} postId={props.postId} commentedUserId={props.comments.userId} commentId={props.comments._id}/>}
                {statusMessage && <p>{statusMessage}</p>}
        </div>
    )
}

export default Comment;
