import React from "react";
import { useNavigate } from "react-router-dom";

function InputButtonCancel({text}){
    const navigete = useNavigate()
    return(
        <div onClick={()=>{navigete("/settings")}} className="hover:cursor-pointer">
            <button className={`w-28 md:w-48 max-w-md md:h-12 h-16 m-2 border rounded-md bg-black text-white font-semibold text-xl md:px-2`}>{text}</button>
        </div>
    )
}

export default InputButtonCancel;