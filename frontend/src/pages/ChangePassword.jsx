import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import NavbarBottom from "../components/NavbarBottom";
import NavbarTop from "../components/NavbarTop";
import InputButtonChange from "../components/InputButtonChange";
import InputButtonCancel from "../components/InputButtonCancel";

function ChangePassword(){
    const [password, setPassword] = useState("")
    const [initialPassword, setInitialPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")    
    const [confirmPassword, setConfirmPassword] = useState("")
    const [statusMessage, setStatusMessage] = useState("")
    const [button, setButton] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        if(newPassword ==="" || confirmPassword ==="" || initialPassword ===""){
            setButton(false)
        }
        else if(newPassword === confirmPassword){
                setPassword(newPassword)
                setButton(true)
                setStatusMessage("")
        }else{
            setButton(false)
            setStatusMessage("Password Doesn't match")
        }
    }, [confirmPassword, newPassword])
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
            setStatusMessage(error.response?.data?.message || "An error Occured")
        }
    }
    return(
        <div className="w-screen h-screen flex justify-center">
            <div className="w-11/12 flex justify-center items-center">
                <header className="fixed top-0 left-0 md:inline-block hidden">
                    <NavbarTop />
                </header>
                <div className="p-6 bg-white shadow-custom rounded-lg w-11/12 sm:max-w-lg">
                        <h1 className="text-xl font-semibold flex justify-center">
                            Change Password
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <Input type={"password"} placeholder={"Enter Existing Password"} value={initialPassword} onChange={event=>{setInitialPassword(event.target.value)}}/>
                            <Input type={"password"} placeholder={"Enter New Password"} value={newPassword} onChange={event=>{setNewPassword(event.target.value)}}/>
                            <Input type={"password"} placeholder={"Confirm New Password"} value={confirmPassword} onChange={event=>{setConfirmPassword(event.target.value)}}/>
                            <p className="flex justify-center p-4 font-medium text-lg">{statusMessage}</p>
                            <div className="flex justify-between items-center pr-4">
                                <InputButtonChange text={"Change Password"} buttonSubmit={button}/>
                                <InputButtonCancel text = {"Cancel"} />
                            </div>
                        </form>
                </div>
                <footer className="fixed bottom-0 left-0 ">
                    <NavbarBottom />
                    {statusMessage && <p>{statusMessage}</p>}
                </footer>
            </div>
        </div>
    )
}
export default ChangePassword;