import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Menu(props){
    const navigate = useNavigate()

    return(
        <div className={`w-28 h-20 border ${props.menu ? "inline-block" : "hidden"} absolute z-10 rounded-md overflow-hidden right-16 flex flex-col justify-center items-center`}>
            <ul className="font-semibold">
                <li className="p-1 hover:cursor-pointer" onClick={()=>navigate("/settings")}>
                    Settings
                </li>
                <li className="p-1 hover:cursor-pointer" onClick={()=>{localStorage.removeItem("token"), navigate("/login")}}>
                    Logout
                </li>
            </ul>
        </div>
    )
}

export default Menu;