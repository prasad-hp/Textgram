import React, { useEffect, useState } from "react";
import notLikedIcon from "../assets/notLikedIcon.svg"
import likedIcon from "../assets/likedIcon.svg"
import commentIcon from "../assets/commentIcon.svg"
import CreateComment from "./CreateComment";


function Post(){
    const [icon, setIcon] = useState(notLikedIcon)
    const [liked, setLiked] = useState(false)
    const [comment, setComment] = useState("hidden")
    useEffect(()=>{
        if(liked){
            setIcon(likedIcon)
        }else{
            setIcon(notLikedIcon)
        }
    }, [liked])
    return(
        <div className="w-full sm:w-11/12 md:w-475 rounded-md items-center">
                <div className="flex items-center">
                    <img src="./defaultprofilepic.png" className="h-14 p-2" />
                    <h1 className="font-semibold m-2">Prasad Hp</h1>
                </div>
                <div className="px-16 w-full">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
                <div  className="md:mx-16 my-3 flex justify-start mx-14">
                    <span className="flex justify-start">
                        <span className="flex justify-start hover:cursor-pointer" onClick={()=>setLiked(!liked)}>
                            <img src={icon} className="h-7" />
                            <p className="text-lg mx-1">56</p>
                        </span>
                        <img src={commentIcon} className="h-6.5 mx-3" onClick={()=>setComment("inline")}/>
                    </span>
                </div>
                <div className={`${comment} z-10 absolute top-0 left-0`} onDoubleClick={()=>setComment("hidden")}>
                    <CreateComment />
                </div>
        </div>
    )
}

export default Post;
