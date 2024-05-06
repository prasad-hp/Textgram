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
        <form onSubmit={handleSubmit}>
            <input type="text" className="border-2 border-black rounded-md" value={inputText} onChange={handleChange}/> 
            <input type="submit" className="border-2 hover:cursor-pointer rounded-md"/> 
        </form>
    )
}
export default CreateTodo;