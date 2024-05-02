import React, { useState } from "react";
import commentIcon from "../assets/images/commentIcon.svg"

function Comments(props){
    const [comments, setComments] = useState(false)

    const commentsList = (props.posts.comments).map((comment, index)=>{
        return(
            <div className="w-full">
                <ul key={index}>
                    <li>{comment}</li>
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