import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../store/atoms/user";

function CreateComment(props){
    const textAreaRef = useRef(null)
    const[text, setText] = useState("")
    const [height, setHeight] = useState("12px")
    const user = useRecoilValue(userAtom)

    function handleInput(event){
        setText(event.target.value)
        setHeight("h-auto")

    }
    useEffect(()=>{
        const textArea = textAreaRef.current
        if(textArea){
            textArea.style.height = "auto"
            textArea.style.height = textAreaRef.current.scrollHeight + "px"
        }
    }, [text])

    return(
        <div className="w-screen md:h-screen bg-black/40 flex flex-col items-center justify-center">
            <h1 className="text-white font-semibold text-xl pb-2">New Comment</h1>
            <div className="md:w-475 w-96 border-2 rounded-lg bg-white h-auto ">
            <div className="flex items-center">
                <img src="./defaultprofilepic.png" className="w-14 h-14 p-2" />
                <h1 className="font-semibold m-2">{props.firstName}{" "}{props.lastName}</h1>
            </div>
            <div className="mx-16">
                <p>{props.postText}</p>
            </div>
                <div className="flex items-center">
                    <img src="./defaultprofilepic.png" className="w-14 h-14 p-2" />
                    <h1 className="font-semibold m-2">{user.firstName} {" "} {user.lastName} </h1>
                </div>
                    <form className="h-auto">
                        <textarea ref={textAreaRef} className={`md:w-425 w-82 resize-none mx-16 outline-0 overflow-y-hidden ${height} min-h-6` } placeholder="Start Writing the Comment" onInput={handleInput} value={text} rows={1} />
                        <div className="float-right">
                            <div type="submit" className="h-10 m-3 bg-blue-500 font-semibold w-16 rounded-3xl text-white flex flex-col items-center justify-center">Post</div>
                        </div>
                    </form>
            </div>
        </div>
    )
}

export default CreateComment;