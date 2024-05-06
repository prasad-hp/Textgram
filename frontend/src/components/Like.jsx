import React, { useState } from "react";
import axios from "axios";
import unikedIcon from "../assets/like-unfilled.svg"
import likedIcon from "../assets/like-filled.svg"

function Like(props){
    const [liked, setLiked] = useState(false)


    async function handleLikeClick(id){
        try {
            if(liked==true){
                await axios({
                    method:"patch",
                    url:`http://localhost:3000/post/${id}/unlike`
                })
            } else{
                await axios({
                    method:"patch",
                    url:`http://localhost:3000/post/${id}/like`
                })
            }
            setLiked(!liked)
        } catch (error) {
            console.error(error.message)
        }
    }


    

    return(
        <div>
            <div className="flex"> <img src={liked ? likedIcon : unikedIcon} className="hover:cursor-pointer" onClick={()=>handleLikeClick(props.todo._id)}/><p className="text-xl">{props.todo.likes}</p></div>
        </div>
    )
}

export default Like;