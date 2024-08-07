import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import InputButton from "../components/InputButton";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import url from "../config";

function SignUp(){
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [initialPassword, setInitialPassword] = useState("")    
    const [confirmPassword, setConfirmPassword] = useState("")
    const [button, setButton] = useState(false)
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
                if(initialPassword == confirmPassword){
            setPassword(initialPassword)
            setMessage("")
        }else{
            setMessage("Password Doesn't match")
        }
    }, [confirmPassword, initialPassword])
    useEffect(()=>{ 
        if(firstName === "" || lastName === "" || email === "" || password === ""){
            setButton(false)
        }else if (email && password){
            setButton(true)
        }
    }, [firstName, email, password, lastName])

    async function handleSubmit(event){
        event.preventDefault()
        setMessage("Loading Please Wait")
        try {
            const response = await axios({
                                method:"post",
                                url:`${url}/api/v1/user/signup`,
                                data:{
                                    firstName:firstName,
                                    lastName:lastName,
                                    email:email,
                                    password:password
                                }
                            })
            const tokenData = response.data.token
            localStorage.setItem("token", tokenData)
            navigate("/login")
            setMessage(response.data.message)
        } catch (error) {
            console.log(error)
            setMessage(error.response.data || "An error Occured")
        }
    }
    return(
        <div className="w-screen h-screen flex justify-center">
            <div className="w-11/12 flex justify-center items-center">
                <div className="p-6 bg-white shadow-custom rounded-lg w-11/12 sm:max-w-lg">
                        <h1 className="text-xl font-semibold flex justify-center">
                            Sign up to see your friends opinion on world.
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <Input type={"text"} placeholder={"First Name"} value={firstName} onChange={event=>{setFirstName(event.target.value)}}/>
                            <Input type={"text"} placeholder={"Last Name"} value={lastName} onChange={event=>{setLastName(event.target.value)}}/>
                            <Input type={"email"} placeholder={"Email"} value={email} onChange={event=>{setEmail(event.target.value)}}/>
                            <Input type={"password"} placeholder={"Enter Password"} value={initialPassword} onChange={event=>{setInitialPassword(event.target.value)}}/>
                            <Input type={"password"} placeholder={"Confirm Password"} value={confirmPassword} onChange={event=>{setConfirmPassword(event.target.value)}}/>
                            <p className="flex justify-center p-4 font-medium text-lg">{message}</p>
                            <InputButton text={"Create Account"} buttonSubmit={button}/>
                        </form> 
                            <p className="flex justify-center p-4 font-medium text-lg">Already have Account ?  <a href="./login" className="font-semibold"> Login</a></p>
                </div>
            </div>
        </div>
    )
}


export default SignUp;