import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "../store/atoms/user.jsx";
import axios from "axios";

function NewPost({ newPost, onClose }) {
    const textAreaRef = useRef(null);
    const [text, setText] = useState("");
    const [user, setUser] = useRecoilState(userAtom);
    const [statusMessage, setStatusMessage] = useState("")
    const [textLengthLeft, setTextLengthLeft] = useState(0)


    const handleInput = (event) => {
        setText(event.target.value);
    };

    useEffect(() => {
        setTextLengthLeft(200-text.length)
        const textArea = textAreaRef.current;
        if (textArea) {
            textArea.style.height = "auto";
            textArea.style.height = textArea.scrollHeight + "px";
        }
    }, [text]);
    useEffect(()=>{
        async function getUser(){
            const response = await axios({
                method:"get",
                url:"https://textgram.onrender.com/api/v1/user",
                headers:{
                    Authorization:"Bearer " + localStorage.getItem("token")
                }
            })
            setUser(response.data)
        }
        getUser()
    }, [])

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            const response = await axios({
                method:"post",
                url:"https://textgram.onrender.com/api/v1/post/create",
                data:{

                        postText:text
                },
                headers:{
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            setStatusMessage(response.data.message)
        } catch (error) {
            setStatusMessage(error.response.data.message)
        }
        console.log("Post submitted:", text);
        setText("");
        onClose()
        location.reload();
    };

    if (!newPost) return null;

    return (
        <div className="bg-black/40 fixed inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-white font-semibold text-xl pb-2">New Post</h1>
                <div className="w-96 md:w-475 border-2 rounded-lg bg-white h-auto p-4">
                    <div className="flex items-center mb-2">
                        <img src="./defaultprofilepic.png" alt="Profile" className="w-14 h-14 p-2" />
                        <h1 className="font-semibold ml-2">{user.firstName} {user.lastName}</h1>
                    </div>
                    <form onSubmit={text ? handleSubmit: undefined} className="h-auto">
                        <textarea
                            ref={textAreaRef}
                            className="w-11/12 resize-none outline-none text-lg pl-16 max-h-72"
                            placeholder="Start Writing the post"
                            onChange={handleInput}
                            value={text}
                            rows={1}
                            maxLength={200}
                        />
                        <p className={`pl-16 font-semibold ${textLengthLeft<20 ? "text-red-600" : "text-blue-700"}`}>{textLengthLeft} Charaters Left</p>
                        <div className="flex justify-end mt-2">
                            <button 
                            type="submit" 
                            className={`h-10  ${text ? "bg-blue-500" : "bg-gray-400" } font-semibold w-16 rounded-3xl text-white flex items-center justify-center`}
                            disabled={!text}>
                                Post
                            </button>
                        </div>
                    </form>
                </div>
                <button
                    className="text-white font-semibold text-xl mt-4"
                    onClick={onClose}
                >
                    Close
                </button>
                {statusMessage && <p className="text-center">{statusMessage}</p>}   
            </div>
        </div>
    );
}

export default NewPost;
