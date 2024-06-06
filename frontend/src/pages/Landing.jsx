import React from "react";
import { useNavigate } from "react-router-dom";

function Landing(){
    const navigate = useNavigate()
    return(
        <div className="flex items-center justify-center w-screen h-screen bg-signup-bg bg-no-repeat bg-contain">
            <div className="flex items-center justify-center md:flex-row flex-col">
                    <div className="w-1/2">
                        <h2 className="md:text-6xl text-2xl md:text-left text-center my-6 font-semibold text-gray-800">Welcome to </h2>
                        <h1 className="md:text-8xl text-5xl md:text-left text-center my-6 font-semibold text-blue-700">Textgram</h1>
                        <p className="md:text-xl text-lg md:text-left text-center md:pl-4 ">Your space to share thoughts, connect with others, and stay updated in a world of concise conversations</p>
                    </div>
                    <div className="flex flex-col w-1/3 items-center">
                        <button className="w-56 border border-gray-700 rounded-full h-10 m-5 hover:bg-gray-300" onClick={()=>navigate("/login")}>Login</button>
                        <button className="w-56 border border-gray-700 rounded-full h-10 m-5 hover:bg-gray-300" onClick={()=>navigate("/signup")}>Signup</button>
                    </div>
            </div>
        </div>
    )
}
export default Landing;