import React, { useEffect, useRef, useState } from "react";

function NewPost(){
    const textAreaRef = useRef(null)
    const[text, setText] = useState("")
    const [height, setHeight] = useState("6")

    function handleInput(event){
        setText(event.target.value)
        setHeight("auto")

    }
    useEffect(()=>{
        const textArea = textAreaRef.current
        if(textArea){
            textArea.style.height = "auto"
            textArea.style.height = textAreaRef.current.scrollHeight + "px"
        }
    }, [text])

    return(
        <div className="w-screen h-screen bg-black/40 flex flex-col items-center justify-center">
            <h1 className="text-white font-semibold text-xl pb-2">New Post</h1>
            <div className="w-475 border-2 rounded-lg bg-white h-auto ">
                <div className="flex items-center">
                    <img src="./defaultprofilepic.png" className="w-14 h-14 p-2" />
                    <h1 className="font-semibold m-2">Prasad Hp</h1>
                </div>
                    <form className="h-auto">
                        <textarea ref={textAreaRef} className={`w-450 resize-none ml-12 outline-0 overflow-y-hidden h-${height} min-h-6` } placeholder="Start Writing the post" onInput={handleInput} value={text} rows={1}/>
                        <div className="float-right">
                            <div type="submit" className="h-10 m-3 bg-blue-500 font-semibold w-16 rounded-3xl text-white flex flex-col items-center justify-center">Post</div>
                        </div>
                    </form>
            </div>
        </div>
    )
}

export default NewPost;