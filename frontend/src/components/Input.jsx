import React from "react";

function Input(props){
    return(
        <div className="">
            <input type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChange} className="w-11/12 max-w-md h-12 m-2 border rounded-md pl-2"/>
        </div>
    )
}
export default Input;