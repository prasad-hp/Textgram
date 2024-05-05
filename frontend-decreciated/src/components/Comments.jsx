import React, { useState } from "react";
import commentIcon from "../assets/images/commentIcon.svg"

function Comments(){
    const [comments, setComments] = useState(false)

    const commentsList = (props.posts.comments).map((comment, index)=>{
        return(
            <div className="w-full">
                <ul key={index}>
                    <li><h2 className="font-semibold">{comment.userName}</h2><h2>{comment.comment}</h2></li>
                </ul>
            </div>
        )
    })
    return(
        <div>
            <div className="flex flex-col">
                <button onClick={()=>{
                    if(comments == false){
                        setComments(true)
                    }
                    else{
                        setComments(false)
                    }
                }}>
                    <img src={commentIcon} className="ml-5"/>
                </button>
                {comments == false ? null : <div>
                    {commentsList} </div>}
                
            </div>

        </div>
    )
}

export default Comments;