import React, { useEffect, useState } from "react";
import notLikedIcon from "../assets/notLikedIcon.svg"
import likedIcon from "../assets/likedIcon.svg"
import commentIcon from "../assets/commentIcon.svg"
import CreateComment from "./CreateComment";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PostSingle(props){
    const [icon, setIcon] = useState(props.liked ? likedIcon : notLikedIcon)
    const [liked, setLiked] = useState(props.liked)
    const [likeCount, setLikeCount] = useState(props.likeCount)
    const [comment, setComment] = useState(false)
    const [statusMessage, setStatusMessage] = useState("")
    const navigate = useNavigate()
    console.log(liked)
    useEffect(()=>{
        if(liked === undefined) return
        if(liked === true){
            async function postUnLike(){
                try {  
                    const response = await axios({
                        method:"post",
                        url:"http://localhost:3001/api/v1/post/unlike",
                        headers:{
                            Authorization:"Bearer " + localStorage.getItem("token")
                        },
                        data:{
                            postId:props.id
                        }
                    })
                    setLikeCount(prev => prev-1)
                    setIcon(notLikedIcon)
                } catch (error) {
                    setStatusMessage(error.response?.data?.message || "An Error Occured")

                }
            }
            postUnLike()
        }else if (liked === false){
            async function postlike(){
                
                try {  
                    const response = await axios({
                        method:"post",
                        url:"http://localhost:3001/api/v1/post/like",
                        headers:{
                            Authorization:"Bearer " + localStorage.getItem("token")
                        },
                        data:{
                            postId:props.id
                        }
                    })
                    setLikeCount(prev =>prev+1)
                    setIcon(likedIcon)
                } catch (error) {
                    setStatusMessage(error.response?.data?.message || "An Error Occured")
                }
            }
            postlike()
        }
    }, [liked])
    function handleClose(){
        setComment(false)
    }
    function likeFunction(e){
        e.preventDefault();
        setLiked(!liked)
    }
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
                        <span className="flex justify-start hover:cursor-pointer" onClick={likeFunction}>
                            <img src={icon} className="h-7" />
                            <p className="text-lg mx-1">{likeCount}</p>
                        </span>
                        <img src={commentIcon} className="h-6.5 mx-3" onClick={()=>setComment(true)}/>
                    </span>
                </div>
                <div className={`${comment} z-10 absolute top-0 left-0`} >
                    <CreateComment id={props.id} postText={props.postText} firstName={props.firstName} lastName={props.lastName} onClose={handleClose} newComment={comment}/>
                </div>
                {statusMessage && <p>{statusMessage}</p>}
        </div>
    )
}

export default PostSingle;
