import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import InputButton from "../components/InputButton";
import axios from "axios";
import {useNavigate} from "react-router-dom"

function ChangePassword(){
    const [password, setPassword] = useState("")
    const [initialPassword, setInitialPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")    
    const [confirmPassword, setConfirmPassword] = useState("")
    const [statusMessage, setStatusMessage] = useState("")
    const navigate = useNavigate()
    useEffect(()=>{
            if(newPassword === confirmPassword){
            setPassword(newPassword)
            console.log(newPassword)
            setStatusMessage("")
        }else{
            setStatusMessage("Password Doesn't match")
        }
    }, [confirmPassword, initialPassword])
    async function handleSubmit(event){
        event.preventDefault()
        setStatusMessage("Loading Please Wait")
        try {
            const response = await axios({
                                method:"put",
                                url:"http://localhost:3001/api/v1/user/changepassword",
                                headers:{
                                    Authorization:"Bearer " + localStorage.getItem("token")
                                },
                                data:{
                                    initialPassword:initialPassword,
                                    newPassword:password
                                }

                            })
                            console.log(response.data)
                            setStatusMessage(response.data.message)
                            localStorage.removeItem("token")
                            navigate("/login")
        } catch (error) {
            setStatusMessage(error.response.data)
        }
    }
    return(
        <div className="w-screen h-screen flex justify-center">
            <div className="w-11/12 bg-signup-bg bg-contain bg-no-repeat flex justify-center items-center">
                <div className="p-6 bg-white shadow-custom rounded-lg w-11/12 sm:max-w-lg">
                        <h1 className="text-xl font-semibold flex justify-center">
                            Change Password
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <Input type={"password"} placeholder={"Enter Existing Password"} value={initialPassword} onChange={event=>{setInitialPassword(event.target.value)}}/>
                            <Input type={"password"} placeholder={"Enter New Password"} value={newPassword} onChange={event=>{setNewPassword(event.target.value)}}/>
                            <Input type={"password"} placeholder={"Confirm New Password"} value={confirmPassword} onChange={event=>{setConfirmPassword(event.target.value)}}/>
                            <p className="flex justify-center p-4 font-medium text-lg">{statusMessage}</p>
                            <InputButton text={"Change Password"}/>
                        </form>
                </div>
            </div>
        </div>
    )
}
export default ChangePassword;