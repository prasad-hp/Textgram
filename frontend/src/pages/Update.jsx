import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import InputButton from "../components/InputButton";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import NavbarBottom from "../components/NavbarBottom";
import NavbarTop from "../components/NavbarTop";

function Update(){
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(event){
        event.preventDefault()
        setMessage("Loading Please Wait")
        try {
            const response = await axios({
                                method:"put",
                                url:"http://localhost:3001/api/v1/user/update",
                                headers:{
                                    Authorization:"Bearer " + localStorage.getItem("token")
                                },
                                data:{
                                    firstName:firstName,
                                    lastName:lastName
                                }
                            })
            navigate("/")
            setMessage(response.data.message)
        } catch (error) {
            setMessage(error.response.data)
        }
    }
    useEffect(()=>{
        try {
            async function getUser(){
                const response = await axios({
                    method:"get",
                    url:"http://localhost:3001/api/v1/user",
                    headers:{
                        Authorization:"Bearer " + localStorage.getItem("token")
                    }
                })
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)

            }
            getUser()
        } catch (error) {
            setStatusMessage(error.response?.data?.message || "An error Occured")
        }
    }, [])

    return(
        <div className="w-screen h-screen flex justify-center">
            <div className="w-11/12 flex justify-center items-center">
                <header className="fixed top-0 left-0 md:inline-block hidden">
                    <NavbarTop />
                </header>
                <div className="p-6 bg-white shadow-custom rounded-lg w-11/12 sm:max-w-lg">
                        <h1 className="text-xl font-semibold flex justify-center">
                            Update Your Details
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <Input type={"text"} placeholder={"First Name"} value={firstName} onChange={event=>{setFirstName(event.target.value)}}/>
                            <Input type={"text"} placeholder={"Last Name"} value={lastName} onChange={event=>{setLastName(event.target.value)}}/>
                            <p className="flex justify-center p-4 font-medium text-lg">{message}</p>
                            <InputButton text={"Update Details"}/>
                        </form>
                </div>
                <footer className="fixed bottom-0 left-0 ">
                    <NavbarBottom />
                    {message && <p>{message}</p>}
                </footer>
            </div>
        </div>
    )
}


export default Update;