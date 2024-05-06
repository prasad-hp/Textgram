import axios from "axios";
import React, { useState } from "react";

function CreateTodo(){
    const [inputText, setInputText] = useState("")

    function handleChange(event){
        setInputText(event.target.value)
    }

    async function handleSubmit(){
        try {
            await axios({
                method:"post",
                url:"http://localhost:3000/post",
                data:{
                    postText: inputText
                }
            },
        {headers:{
            "Content-Type": "application/json"
        }})
        } catch (error) {
            console.error(error.message)
        }


    }
    return(
        <div className="flex justify-center w-screen">
            <form onSubmit={handleSubmit} className="flex flex-col items-center lg:w-1/3 md:w-1/2 w-screen">
                <input type="text" className="border-2 border-black rounded-md w-10/12 h-10" value={inputText} onChange={handleChange}/> 
                <input type="submit" className="border-2 hover:cursor-pointer rounded-md w-1/2"/> 
            </form>
        </div>
    )
}
export default CreateTodo;