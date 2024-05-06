import React from "react";
import CreateTodo from "../components/CreateTodo";
import TodoList from "../components/TodoList";

function LandingPage(){
    return(
        <div className="w-screen h-screen">
            <div className="">
                <CreateTodo />
                <TodoList />
            </div>
        </div>
    )
}

export default LandingPage;