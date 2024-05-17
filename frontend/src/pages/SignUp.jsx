import React from "react";
import Input from "../components/Input";

function SignUp(){
    return(
        <div>
            <h1>
                Sign up to see what your friends opinion on the world.
            </h1>
            <form>
                <Input type={"text"} placeholder={"First Name"}/>
                <Input type={"text"} placeholder={"Last Name"}/>
                <Input type={"text"} placeholder={"Email"}/>
                <Input type={"password"} placeholder={"Enter Password"}/>
                <Input type={"password"} placeholder={"Confirm Password"}/>

            </form>
        </div>
    )
}

export default SignUp;