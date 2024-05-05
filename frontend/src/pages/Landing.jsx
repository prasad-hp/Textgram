import React from "react";
import CreateTodo from "../components/CreateTodo";
import TodoList from "../components/TodoList";

function LandingPage(){
    return(
        <div>
            <CreateTodo />
            <TodoList />
        </div>
    )
}

export default LandingPage;