import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import notLikedIcon from "../assets/notLikedIcon.svg";
import likedIcon from "../assets/likedIcon.svg";
import commentIcon from "../assets/commentIcon.svg";
import threeDots from "../assets/threeDots.svg";
import CreateComment from "./CreateComment";
import ConfirmDeletePost from "./ConfirmDeletePost";
import url from "../config";

function Post(props) {
    const [icon, setIcon] = useState(props.liked ? likedIcon : notLikedIcon);
    const [liked, setLiked] = useState(props.liked);
    const [likeCount, setLikeCount] = useState(props.likeCount);
    const [comment, setComment] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [deleteButton, setDeleteButton] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const navigate = useNavigate();

    function toggleLikeApi() {
        if (liked === null) return;
        if (liked === true) {
            async function postUnLike() {
                try {  
                    const response = await axios({
                        method: "post",
                        url: `${url}/api/v1/post/unlike`,
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token")
                        },
                        data: {
                            postId: props.id,
                        }
                    });
                    setLikeCount(prev => prev - 1);
                    setIcon(notLikedIcon);

                } catch (error) {
                    setStatusMessage(error.response?.data?.message || "An error occurred");
                }
            }
            postUnLike();
        } else if (liked === false) {
            async function postLike() {
                try {  
                    const response = await axios({
                        method: "post",
                        url: `${url}/api/v1/post/like`,
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
                    setStatusMessage(error.response?.data?.message || "An error occurred");
                }
            }
            postLike();
        }
    }

    function handleClose() {
        setComment(false);
    }

    function handleDeleteClose() {
        setConfirmDelete(false);
    }

    function toggleLike(e) {
        e.stopPropagation();
        e.preventDefault();
        setLiked(!liked);
        toggleLikeApi();
    }

    function toProfile(e) {
        e.stopPropagation();
        navigate(`/profile?userId=${props.userId}`);
    }

    function deleteButtonFn(e) {
        e.stopPropagation();
        setDeleteButton(!deleteButton);
    }

    return (
        <div 
            className="w-11/12 md:w-475 rounded-sm border-x border-y border-gray-200 hover:bg-slate-100" 
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img src="./defaultprofilepic.png" className="h-12 pt-2 px-2" />
                    <h1 
                        className="font-semibold mx-0 hover:underline-offset-2 hover:underline hover:cursor-pointer" 
                        onClick={toProfile}
                    >
                        {props.firstName}{" "}{props.lastName}
                    </h1>
                </div>
                <div className="relative">
                    <img 
                        src={threeDots} 
                        className="w-11 h-11 px-2.5 hover:cursor-pointer hover:bg-slate-300 rounded-full" 
                        onClick={deleteButtonFn}
                    />
                    {deleteButton && 
                        <div 
                            className="absolute z-0 right-10 top-7 w-20 flex items-center justify-center bg-white h-8 rounded-md hover:bg-slate-200 hover:cursor-pointer font-semibold text-center" 
                            onClick={(e) => { 
                                e.stopPropagation(); 
                                setConfirmDelete(true); 
                                setDeleteButton(false); 
                            }}
                        >
                            Delete
                        </div>
                    }
                </div>
            </div>
            <div 
                className="px-16 w-full" 
                style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', overflowWrap: 'break-word' }}
            >
                <p className="w-full" onClick={() => navigate(`/post?id=${props.id}`)}>{props.postText}</p>
            </div>
            <div 
                className="md:mx-16 py-3 flex justify-start mx-14" 
                onClick={(e) => e.stopPropagation()}
            >
                <span className="flex justify-start items-center">
                    <span className="flex justify-start hover:cursor-pointer" onClick={toggleLike}>
                        <img src={icon} className="h-6" />
                        <p className={`text-md mx-1 ${liked ? "text-red-600" : "text-black"}`}>{likeCount}</p> 
                    </span>
                    <img 
                        src={commentIcon} 
                        className="h-5 mx-3" 
                        onClick={(e) => { 
                            e.stopPropagation(); 
                            setComment(true); 
                        }} 
                    />
                </span>
            </div>
            {comment && 
                <div className="z-50 absolute top-0 left-0">
                    <CreateComment 
                        id={props.id} 
                        postText={props.postText} 
                        firstName={props.firstName} 
                        lastName={props.lastName} 
                        newComment={comment} 
                        onClose={handleClose}
                    />
                </div>
            }
            {confirmDelete && 
                <ConfirmDeletePost 
                    onClose={handleDeleteClose} 
                    id={props.id} 
                    userId={props.userId} 
                />
            }
            {statusMessage && <p>{statusMessage}</p>}
        </div>
    );
}

export default Post;
