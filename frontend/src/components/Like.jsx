import React, { useEffect, useState } from "react";
import axios from "axios";
import unikedIcon from "../assets/like-unfilled.svg"
import likedIcon from "../assets/like-filled.svg"

function Like(props){
    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(props.todo.likes)

    useEffect(()=>{
        try {
            async function getData(){
                const response = await axios({
                    method:"get",
                    url:`http://localhost:3000/post/${props.todo._id}/likeCount`
                    })
                setLikeCount(response.data)
            }
            getData()
        } catch (error) {
            console.error(error.message)
        }
    },[])


    async function handleLikeClick(id){
        try {
            if(liked==true){
                await axios({
                    method:"patch",
                    url:`http://localhost:3000/post/${id}/unlike`
                })
                setLikeCount(prevCount =>prevCount-1)
            } else{
                await axios({
                    method:"patch",
                    url:`http://localhost:3000/post/${id}/like`
                })
                setLikeCount(prevCount => prevCount+1)
            }
            setLiked(!liked)
        } catch (error) {
            console.error(error.message)
        }
    }

    return(
        <div>
            <div className="flex"> <img src={liked ? likedIcon : unikedIcon} className="hover:cursor-pointer" onClick={()=>handleLikeClick(props.todo._id)}/><p className="text-xl">{likeCount}</p></div>
        </div>
    )
}

export default Like;