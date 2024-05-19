import React, { useEffect, useState } from "react";
import notLikedIcon from "../assets/notLikedIcon.svg"
import likedIcon from "../assets/likedIcon.svg"
import commentIcon from "../assets/commentIcon.svg"
import CreateComment from "./CreateComment";
import { useNavigate } from "react-router-dom";

function Post(props){
    const [icon, setIcon] = useState(notLikedIcon)
    const [liked, setLiked] = useState(false)
    const [comment, setComment] = useState("hidden")
    const navigate = useNavigate()
    useEffect(()=>{
        if(liked){
            setIcon(likedIcon)
        }else{
            setIcon(notLikedIcon)
        }
    }, [liked])
    return(
        <div className="w-screen sm:w-11/12 md:w-475 rounded-md items-center bg-green-500">
                <div className="flex items-center">
                    <img src="./defaultprofilepic.png" className="h-14 p-2" />
                    <h1 className="font-semibold m-2">{props.firstName}{" "}{props.lastName}</h1>
                </div>
                <div className="px-16 w-full" onClick={()=>navigate(`/post?id=${props.id}`)}>
                    <p>{props.postText}</p>
                </div>
                <div  className="md:mx-16 my-3 flex justify-start mx-14">
                    <span className="flex justify-start">
                        <span className="flex justify-start hover:cursor-pointer" onClick={()=>setLiked(!liked)}>
                            <img src={icon} className="h-7" />
                            <p className="text-lg mx-1">{props.likeCount}</p>
                        </span>
                        <img src={commentIcon} className="h-6.5 mx-3" onClick={()=>setComment("inline")}/>
                    </span>
                </div>
                <div className={`${comment} z-10 absolute top-0 left-0`} onDoubleClick={()=>setComment("hidden")}>
                    <CreateComment postText={props.postText} firstName={props.firstName} lastName={props.lastName} />
                </div>
        </div>
    )
}

export default Post;
