import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "../store/atoms/user.jsx";
import axios from "axios";

function CreateComment(props) {
    const textAreaRef = useRef(null);
    const [text, setText] = useState("");
    const [user, setUser] = useRecoilState(userAtom);
    const [statusMessage, setStatusMessage] = useState("");
    const [textLengthLeft, setTextLengthLeft] = useState(200);

    const handleInput = (event) => {
        const inputText = event.target.value;
        const cleanedText = inputText
            .replace(/\s{3,}/g, '  ')     
            .replace(/\n{3,}/g, '\n\n');  
        setText(cleanedText);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatusMessage("Loading...");
        try {
            const response = await axios.patch("https://textgram.onrender.com/api/v1/post/comment/add", {
                id: props.id,
                text: text,
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            setStatusMessage(response.data.message);
        } catch (error) {
            setStatusMessage(error.response?.data?.message || "An error occurred");
        }
        setText("");
        props.onClose();
        location.reload();
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("https://textgram.onrender.com/api/v1/user/", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });
                setUser(response.data);
            } catch (error) {
                setStatusMessage(error.response?.data?.message || "An error occurred");
            }
        };
        fetchUser();
    }, [setUser]);

    useEffect(() => {
        setTextLengthLeft(200 - text.length);
        const textArea = textAreaRef.current;
        if (textArea) {
            textArea.style.height = "auto";
            textArea.style.height = textArea.scrollHeight + "px";
        }
    }, [text]);

    if (!props.newComment) return null;

    return (
        <div className="bg-black/40 fixed inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-white font-semibold text-xl pb-2">New Comment</h1>
                <div className="w-96 md:w-475 border-2 rounded-lg bg-white h-auto p-4">
                    <div className="flex items-center">
                        <img src="./defaultprofilepic.png" className="h-14 p-2" alt="Profile" />
                        <h1 className="font-semibold m-2">{props.firstName}{" "}{props.lastName}</h1>
                    </div>
                    <div className="px-16 w-full" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                        <p>{props.postText}</p>
                    </div>
                    <div className="flex items-center mb-2">
                        <img src="./defaultprofilepic.png" alt="Profile" className="w-14 h-14 p-2" />
                        <h1 className="font-semibold ml-2">{user.firstName} {user.lastName}</h1>
                    </div>
                    <form onSubmit={handleSubmit} className="h-auto">
                        <textarea
                            ref={textAreaRef}
                            className="w-11/12 resize-none outline-none max-h-64 pl-16 text-lg"
                            placeholder="Start Writing the post"
                            onChange={handleInput}
                            value={text}
                            rows={1}
                            maxLength={200}
                            style={{ whiteSpace: 'pre-wrap' }}
                        />
                        <p className={`pl-16 font-semibold ${textLengthLeft < 20 ? "text-red-600" : "text-blue-700"}`}>{textLengthLeft} Characters Left</p>
                        <div className="flex justify-end mt-2">
                            <button type="submit"
                                className={`h-10 ${text ? "bg-blue-500" : "bg-gray-400"} font-semibold w-16 rounded-3xl text-white flex items-center justify-center`}
                                disabled={!text}
                            >
                                Post
                            </button>
                        </div>
                    </form>
                </div>
                <button
                    className="text-white font-semibold text-xl mt-4"
                    onClick={props.onClose}
                >
                    Close
                </button>
                {statusMessage && <p className="text-center">{statusMessage}</p>}
            </div>
        </div>
    );
}

export default CreateComment;
