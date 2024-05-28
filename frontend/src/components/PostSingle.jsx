import React, { useEffect, useState } from "react";
import notLikedIcon from "../assets/notLikedIcon.svg"
import likedIcon from "../assets/likedIcon.svg"
import commentIcon from "../assets/commentIcon.svg"
import CreateComment from "./CreateComment";
import { useNavigate } from "react-router-dom";

function PostSingle(props){
    const [icon, setIcon] = useState(notLikedIcon)
    const [liked, setLiked] = useState(false)
    const [comment, setComment] = useState(false)
    const [statusMessage, setStatusMessage] = useState("")
    const navigate = useNavigate()
    useEffect(()=>{
        if(liked){
            setIcon(likedIcon)
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
                    setStatusMessage(response.data.message)
                    console.log(statusMessage)

                } catch (error) {
                    console.log(error.response)
                }
            }
            postUnLike()
        }else{
            setIcon(notLikedIcon)
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
                    setStatusMessage(response.data.message)
                    console.log(statusMessage)
                } catch (error) {
                    console.log(error.response.data.message)
                }
            }
            postlike()
        }
    }, [liked])
    function handleClose(){
        setComment(false)
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
                        <span className="flex justify-start hover:cursor-pointer" onClick={()=>setLiked(!liked)}>
                            <img src={icon} className="h-7" />
                            <p className="text-lg mx-1">{props.likeCount}</p>
                        </span>
                        <img src={commentIcon} className="h-6.5 mx-3" onClick={()=>setComment(true)}/>
                    </span>
                </div>
                <div className={`${comment} z-10 absolute top-0 left-0`} >
                    <CreateComment id={props.id} postText={props.postText} firstName={props.firstName} lastName={props.lastName} onClose={handleClose} newComment={comment}/>
                </div>
        </div>
    )
}

export default PostSingle;
