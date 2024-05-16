import React, { useEffect, useState } from "react";
import notLikedIcon from "../assets/notLikedIcon.svg"
import likedIcon from "../assets/likedIcon.svg"


function Post(){
    const [icon, setIcon] = useState(notLikedIcon)
    const [liked, setLiked] = useState(false)
    useEffect(()=>{
        if(liked){
            setIcon(likedIcon)
        }else{
            setIcon(notLikedIcon)
        }
    }, [liked])
    return(
        <div className="w-475 bg-rose-50 rounded-md">
                <div className="flex items-center">
                    <img src="./defaultprofilepic.png" className="w-14 h-14 p-2" />
                    <h1 className="font-semibold m-2">Prasad Hp</h1>
                </div>
                <div className="mx-16">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
                <div  className="mx-16 my-3 flex justify-start">
                    <span className="flex justify-start">
                        <img src={icon} className="h-6.5" onClick={()=>setLiked(!liked)}/>
                        <p className="text-lg mx-1">56</p>
                    </span>
                    <span>

                    </span>
                </div>
        </div>
    )
}

export default Post;
