import React, {useState} from "react";
import axios from "axios";

function CreatePost(){
    const [textInput, setTextInput] = useState("")

    async function handleSubmit(){
        try {
            axios.post({
                method: post,
                url:"http://localhost:3001/post",
                data:{
                    postText: textInput
                },
                    "Content-Type": "json/application"
            })
            
        } catch (error) {
            console.error(error)
        }
    }

    function handleInputChange(Event){
        setTextInput(Event.target.value);
    }
    return(
        <div className="w-full border rounded-lg my-2 p-3 flex">
            <form onSubmit={handleSubmit}>
                <textarea placeholder="Click here to create new Post" className="justify-start w-10/12" value={textInput} onChange={handleInputChange}></textarea>
                <button className="justify-end align-bottom w-2/12 bg-blue-600 mx-3 my-1.5 rounded-xl" type="submit" onClick={()=>{handleSubmit}}>Post</button>
            </form>
        </div>
    )
}

export default CreatePost;