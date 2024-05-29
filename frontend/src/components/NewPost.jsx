import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../store/atoms/user.jsx";
import axios from "axios";

function NewPost({ newPost, onClose }) {
    const textAreaRef = useRef(null);
    const [text, setText] = useState("");
    const user = useRecoilValue(userAtom);
    const [statusMessage, setStatusMessage] = useState("")

    const handleInput = (event) => {
        setText(event.target.value);
    };

    useEffect(() => {
        const textArea = textAreaRef.current;
        if (textArea) {
            textArea.style.height = "auto";
            textArea.style.height = textArea.scrollHeight + "px";
        }
    }, [text]);

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            const response = await axios({
                method:"post",
                url:"http://localhost:3001/api/v1/post/create",
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
                    <form onSubmit={handleSubmit} className="h-auto">
                        <textarea
                            ref={textAreaRef}
                            className="w-full resize-none outline-none overflow-y-hidden text-xl"
                            placeholder="Start Writing the post"
                            onChange={handleInput}
                            value={text}
                            rows={1}

                        />
                        <div className="flex justify-end mt-2">
                            <button type="submit" className="h-10 bg-blue-500 font-semibold w-16 rounded-3xl text-white flex items-center justify-center">
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
            </div>
        </div>
    );
}

export default NewPost;
