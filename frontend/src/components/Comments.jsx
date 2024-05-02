import React, { useState } from "react";
import commentIcon from "../assets/images/commentIcon.svg"



function Comments(){
    const [comments, setComments] = useState(false)

    return(
        <div>
            <div className="flex">
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
                {comments == false ? null : <h1 className="">Hello from Comment</h1>}
                
            </div>

        </div>
    )
}

export default Comments;