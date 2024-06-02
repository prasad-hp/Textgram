import React, { useEffect, useState } from "react";
import notLikedIcon from "../assets/notLikedIcon.svg"
import likedIcon from "../assets/likedIcon.svg"
import commentIcon from "../assets/commentIcon.svg"
import CreateComment from "./CreateComment";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import threeDots from "../assets/threeDots.svg"
import ConfirmDeletePost from "./ConfirmDeletePost";

function PostSingle(props){
    const [icon, setIcon] = useState(props.liked ? likedIcon : notLikedIcon)
    const [liked, setLiked] = useState(props.liked)
    const [likeCount, setLikeCount] = useState(props.likeCount)
    const [comment, setComment] = useState(false)
    const [deleteButton, setDeleteButton] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [statusMessage, setStatusMessage] = useState("")
    const navigate = useNavigate()
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
    function handleDeleteClose(){
        setConfirmDelete(false)
    }
    function likeFunction(e){
        e.preventDefault();
        setLiked(!liked)
    }
    return(
        <div className="w-screen sm:w-11/12 md:w-475 rounded-md items-center border border-gray-200">
                <div className="flex items-center justify-between">
                        <div className="flex items-center">
                        <img src="./defaultprofilepic.png" className="h-12 pt-2 px-2" />
                        <h1 className="font-semibold mx-0">{props.firstName}{" "}{props.lastName}</h1>
                    </div>
                    <div className="relative">
                        <img src={threeDots} className="w-11 h-11 px-2.5 hover:cursor-pointer hover:bg-slate-300 rounded-full" onClick={()=>setDeleteButton(!deleteButton)}/>
                        {deleteButton && 
                            <div className={`${deleteButton ? "inline-block" : "hidden"} absolute z-10 right-10 top-7 w-20 justify-center flex items-center bg-white h-8 rounded-md hover:bg-slate-200 hover:cursor-pointer font-semibold text-center`} onClick={()=>setConfirmDelete(true)}>Delete</div>
                        }
                    </div>
                </div>
                <div className="px-16 w-full" style={{ whiteSpace: 'pre-wrap' }} onClick={()=>navigate(`/post?id=${props.id}`)}>
                    <p>{props.postText}</p>
                </div>
                <div  className="md:mx-16 my-3 flex justify-start mx-14">
                    <span className="flex justify-start items-center">
                        <span className="flex justify-start items-center hover:cursor-pointer" onClick={likeFunction}>
                            <img src={icon} className="h-6" />
                            <p className="text-lg mx-1">{likeCount}</p>
                        </span>
                        <img src={commentIcon} className="h-5 mx-3" onClick={()=>setComment(true)}/>
                    </span>
                </div>
                <div className="md:w-475 w-412 border-x border-t border-gray-200">
                    <div className="md:flex md:w-full md:items-center md:min-w-md hidden">
                        <img src="./defaultprofilepic.png" className="h-14 p-2"/>
                        <span className="text-gray-400 pl-5 md:w-450 w-96 text-lg" onClick={()=>setComment(true)}>Post Your Reply</span>
                        <div className="h-9 bg-gray-400 font-semibold w-16 rounded-3xl text-white flex flex-col items-center justify-center mx-2">Post</div>
                    </div>
                </div>
                <div className={`${comment} z-10 absolute top-0 left-0`} >
                    <CreateComment id={props.id} postText={props.postText} firstName={props.firstName} lastName={props.lastName} onClose={handleClose} newComment={comment}/>
                </div>
                {confirmDelete && <ConfirmDeletePost onClose={handleDeleteClose} id={props.id} userId={props.userId} toHome={true}/>}
                {statusMessage && <p className="text-center">{statusMessage}</p>}
        </div>
    )
}

export default PostSingle;
