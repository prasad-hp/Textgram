import React, { useEffect, useState } from "react";
import axios from "axios"

function TodoList(){
    const [todos, setTodos] = useState([])

    useEffect(()=>{
        try {
            async function getData(){
                const response = await axios({
                    method:"get",
                    url:"http://localhost:3001/posts"
                })
                setTodos(response.data)
            }
            getData()
        } catch (error) {
            console.error(error.message)
        }
    }, [])
    const listedTodos = todos.map((todo)=>{
        return(
            <ol key={todo._id}>
                <li>{todo.postText}</li>
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