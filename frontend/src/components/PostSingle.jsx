import React, { useEffect, useState } from "react";
import notLikedIcon from "../assets/notLikedIcon.svg";
import likedIcon from "../assets/likedIcon.svg";
import commentIcon from "../assets/commentIcon.svg";
import CreateComment from "./CreateComment";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import threeDots from "../assets/threeDots.svg";
import ConfirmDeletePost from "./ConfirmDeletePost";

function PostSingle(props) {
    const [icon, setIcon] = useState(props.liked ? likedIcon : notLikedIcon);
    const [liked, setLiked] = useState(props.liked);
    const [likeCount, setLikeCount] = useState(props.likeCount);
    const [comment, setComment] = useState(false);
    const [deleteButton, setDeleteButton] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const navigate = useNavigate();
    
        function toggleLikeApi(){
            if (liked === null) return;
            if (liked === false) {
                async function postLike() {
                    try {
                        const response = await axios({
                            method: "post",
                            url: "http://textgram.ap-south-1.elasticbeanstalk.com/api/v1/post/like",
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("token")
                            },
                            data: {
                                postId: props.id
                            }
                        });
                        setLikeCount(prev => prev + 1);
                        setIcon(likedIcon);
                    } catch (error) {
                        setStatusMessage(error.response?.data?.message || "An Error Occured");
                    }
                }
                postLike();
            } else if (liked === true) {
                async function postUnlike() {
                    try {
                        const response = await axios({
                            method: "post",
                            url: "http://textgram.ap-south-1.elasticbeanstalk.com/api/v1/post/unlike",
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("token")
                            },
                            data: {
                                postId: props.id
                            }
                        });
                        setLikeCount(prev => prev - 1);
                        setIcon(notLikedIcon);
                    } catch (error) {
                        setStatusMessage(error.response?.data?.message || "An Error Occured");
                    }
                }
                postUnlike();
            }
        }

    function handleClose() {
        setComment(false);
    }

    function handleDeleteClose() {
        setConfirmDelete(false);
    }

    function toggleLike(e) {
        e.preventDefault();
        setLiked(!liked);
        toggleLikeApi()
    }

    return(
        <div className="w-11/12 md:w-475 items-center border-gray-200 mt-3">
            <div className="border rounded-md">
                <div className="flex items-center justify-between">
                        <div className="flex items-center">
                        <img src="./defaultprofilepic.png" className="h-12 pt-2 px-2" />
                        <h1 className="font-semibold mx-0 hover:underline-offset-2 hover:underline hover:cursor-pointer" onClick={()=>navigate(`/profile?userId=${props.userId}`)}>{props.firstName}{" "}{props.lastName}</h1>
                    </div>
                    <div className="relative">
                        <img src={threeDots} className="w-11 h-11 px-2.5 hover:cursor-pointer hover:bg-slate-300 rounded-full" onClick={()=>setDeleteButton(!deleteButton)}/>
                        {deleteButton && 
                            <div className={`${deleteButton ? "inline-block" : "hidden"} absolute z-10 right-10 top-7 w-20 justify-center flex items-center bg-white h-8 rounded-md hover:bg-slate-200 hover:cursor-pointer font-semibold text-center`} onClick={()=>setConfirmDelete(true)}>Delete</div>
                        }
                    </div>
                </div>
                <div className="px-16 w-full" 
                style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', overflowWrap: 'break-word' }} onClick={()=>navigate(`/post?id=${props.id}`)}>
                    <p>{props.postText}</p>
                </div>
                <div  className="md:mx-16 my-3 flex justify-start mx-14">
                    <span className="flex justify-start items-center">
                        <span className="flex justify-start items-center hover:cursor-pointer" onClick={toggleLike}>
                            <img src={icon} className="h-6" />
                            <p className={`text-lg mx-1 ${liked ? "text-red-600" : "text-black"}`}>{likeCount}</p>
                        </span>
                        <img src={commentIcon} className="h-5 mx-3" onClick={()=>setComment(true)}/>
                    </span>
                </div>
            </div>
                <div className="md:w-475 w-full border rounded-md border-gray-200">
                    <div className="flex w-11/12 md:w-full justify-between items-center min-w-md">
                        <div className="flex items-center">
                            <img src="./defaultprofilepic.png" className="h-14 p-2"/>
                            <span className="text-gray-400 pl-5 md:w-425 w-60 text-lg" onClick={()=>setComment(true)}>Post Your Reply</span>
                        </div>
                    <div className="h-9 bg-gray-400 font-semibold w-16 rounded-3xl text-white flex flex-col items-center justify-center md:mx-2">Post</div>
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
