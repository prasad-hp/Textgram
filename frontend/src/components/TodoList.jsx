import React, { useEffect, useState } from "react";
import axios from "axios"
import deleteIcon from "../assets/delete_icon.svg"

function TodoList(){
    const [todos, setTodos] = useState([])

    useEffect(()=>{
        try {
            async function getData(){
                const response = await axios({
                    method:"get",
                    url:"http://localhost:3000/posts"
                })
                setTodos(response.data)
            }
            getData()
        } catch (error) {
            console.error(error.message)
        }
    }, [])

    function handleDeleteClick(id){
        console.log(id)
    }
    const listedTodos = todos.map((todo)=>{
        return(
            <ol key={todo._id}>
                <li className="p-2 border-2 lg:w-1/3 md:w-1/2 w-10/12">{todo.postText}<button onClick={()=>handleDeleteClick(todo._id)}><img src={deleteIcon} /></button></li>
            </ol>
        )
    })
    return(
        <div>
            {listedTodos}
        </div>
    )
}

export default TodoList;