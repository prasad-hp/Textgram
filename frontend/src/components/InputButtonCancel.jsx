import React from "react";

function InputButtonCancel({text}){
    return(
        <div className="">
            <button className={`w-28 md:w-48 max-w-md md:h-12 h-16 m-2 border rounded-md bg-black text-white font-semibold text-xl md:px-2`}>{text}</button>
        </div>
    )
}

export default InputButtonCancel;