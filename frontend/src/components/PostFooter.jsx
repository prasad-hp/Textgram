import React, { useState } from "react";
import notLikedIcon from "../assets/images/likeWithoutBg.svg"
import LikedIcon from "../assets/images/likeWithBg.svg"


function PostFooter(){
    const [likeIcon, setLikeIcon] = useState(notLikedIcon)
    const [likeCount, setLikeCount] = useState(35)
    return(
        <div>
            <div className="flex">
                <button onClick={()=>{
                    if(likeIcon == notLikedIcon){
                        setLikeCount(likeCount + 1);
                        setLikeIcon(LikedIcon)
                    }
                    else{
                        setLikeCount(likeCount - 1);
                        setLikeIcon(notLikedIcon)
                    }
                }}>
                    <img src={likeIcon} />
                </button>
                <h2>{likeCount}</h2>
            </div>

        </div>
    )
}

export default PostFooter;