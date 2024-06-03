import React from "react";
import { useNavigate } from "react-router-dom";

function MenuBottom(props) {
    const navigate = useNavigate();

    return (
        <div className={`w-28 h-20 border ${props.menu ? "block" : "hidden"} absolute z-200 rounded-md overflow-hidden bottom-16 left-0 flex flex-col justify-center items-center bg-white`}>
            <ul className="font-semibold">
                <li className="p-1 hover:cursor-pointer" onClick={() => navigate("/settings")}>
                    Settings
                </li>
                <li className="p-1 hover:cursor-pointer" onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>
                    Logout
                </li>
            </ul>
        </div>
    );
}

export default MenuBottom;
