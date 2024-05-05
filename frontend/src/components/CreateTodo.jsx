import React from "react";

function CreateTodo(){
    return(
        <form>
            <input type="text" className="border-2 border-black rounded-md"/> 
            <input type="submit" className="border-2 hover:cursor-pointer rounded-md"/> 
        </form>
    )
}
export default CreateTodo;