import React from "react";
import Input from "../components/Input";
import InputButton from "../components/InputButton";

function SignUp(){
    return(
        <div className="w-screen h-screen flex justify-center">
            <div className="w-11/12 bg-signup-bg bg-contain bg-no-repeat flex justify-center items-center">
                <div className="p-6 bg-white shadow-custom rounded-lg w-11/12 sm:max-w-lg">
                        <h1 className="text-xl font-semibold">
                            Sign up to see your friends opinion on world.
                        </h1>
                        <form>
                            <Input type={"text"} placeholder={"First Name"}/>
                            <Input type={"text"} placeholder={"Last Name"}/>
                            <Input type={"email"} placeholder={"Email"}/>
                            <Input type={"password"} placeholder={"Enter Password"}/>
                            <Input type={"password"} placeholder={"Confirm Password"}/>
                            <InputButton />
                        </form> 
                </div>
            </div>
        </div>
    )
}

export default SignUp;