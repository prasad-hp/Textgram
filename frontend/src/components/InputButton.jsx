import React from "react";

function InputButton(props){
    return(
        <div className="">
            <button type="submit" className="w-11/12 max-w-md h-12 m-2 border rounded-md bg-gray-800 text-gray-500 hover:bg-black hover:text-white font-semibold text-xl">{props.text}</button>
        </div>
    )
}

export default InputButton;