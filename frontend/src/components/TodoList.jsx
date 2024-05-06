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

    async function handleDeleteClick(id){
        try {
            await axios({
                method:"delete",
                url:`http://localhost:3000/post/${id}`
            })
        } catch (error) {
            console.error(error.message)
        }
    }


    const listedTodos = todos.map((todo)=>{
        return(
            <ol key={todo._id} className="flex flex-col items-center">
                <li className="p-2 border-2 lg:w-1/3 md:w-1/2 w-10/12 m-2 rounded-md flex flex-col items-center">{todo.postText}<img src={deleteIcon} className="hover:cursor-pointer" onClick={()=>handleDeleteClick(todo._id)}/></li>
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