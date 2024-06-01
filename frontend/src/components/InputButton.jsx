import React, { useEffect, useState } from "react";

function InputButton({buttonSubmit, text}){
    const [buttonDesign, setButtonDesign] = useState("bg-gray-800 text-gray-500")
    useEffect(()=>{
        if(buttonSubmit){
            setButtonDesign("bg-black text-white")
        }else{
            setButtonDesign("bg-gray-800 text-gray-500")
        }
    },[buttonSubmit])
    return(
        <div className="">
            <button type="submit" disabled={!buttonSubmit} className={`w-11/12 max-w-md h-12 m-2 border rounded-md ${buttonDesign} font-semibold text-xl`}>{text}</button>
        </div>
    )
}

export default InputButton;