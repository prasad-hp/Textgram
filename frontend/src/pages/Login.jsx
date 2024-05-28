import React, {useState} from "react";
import Input from "../components/Input";
import InputButton from "../components/InputButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(event){
        event.preventDefault()
        setMessage("Loading Please Wait")
        try {            
            const response = await axios({
                                    method:"post",
                                    url:"http://localhost:3001/api/v1/user/login",
                                    data:{
                                        email:email,
                                        password:password
                                    }
                                })
            const tokenData = response.data.token;
            console.log(response.data)
            localStorage.setItem("token", tokenData)
            navigate("/")
            setMessage(response.data.message)
        } catch (error) {
            setMessage(error.response.data.message)
        }
    }
    return(
        <div className="w-screen h-screen flex justify-center">
            <div className="w-11/12 bg-signup-bg bg-contain bg-no-repeat flex justify-center items-center">
                <div className="p-6 bg-white shadow-custom rounded-lg w-11/12 sm:max-w-lg ">
                        <h1 className="text-xl font-semibold flex justify-center">
                            Login to see your friends opinion on world.
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <Input type={"email"} placeholder={"Email"} value={email} onChange={event=>{setEmail(event.target.value)}}/>
                            <Input type={"password"} placeholder={"Password"} value={password} onChange={event =>{setPassword(event.target.value)}}/>
                            <p className="flex justify-center p-4 font-medium text-lg">{message}</p>
                            <InputButton text={"Login"}/>
                        </form>
                            <p className="flex justify-center p-4 font-medium text-lg">Doesn't have Account ?  <a href="./signup" className="font-semibold"> Create Acoount</a></p>
                </div>
            </div>
        </div>
    )
}

export default Login;