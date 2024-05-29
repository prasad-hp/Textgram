import React,{useState, useEffect} from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import NavbarTop from "../components/NavbarTop";
import NavbarBottom from "../components/NavbarBottom";
import { userAtom } from "../store/atoms/user";
import axios from "axios";
import profile from "../assets/profile.svg"

function Profile(){
    const [statusMessage, setStatusMessage] = useState("")
    const [user, setUser] = useState({})

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
                console.log(response)
                setUser(response.data)
            }
            getUser()
        } catch (error) {
            setStatusMessage(error.response?.data?.message || "An error Occured")
        }
    }, [])

    return(
        <div className="w-screen">
            <header className="fixed top-0 left-0 md:inline-block hidden">
                <NavbarTop />
            </header>
                <div className="flex flex-col items-center mt-16">
                    <div className="md:w-475 sm:w-11/12" >
                        <div className="flex justify-between items-center">
                            <h1 className="font-semibold text-xl m-4">{user.firstName} {user.lastName}</h1>
                            <img src={profile} className="w-20 m-4" />
                        </div>
                        <div>
                            
                        </div>
                    </div>
                </div>
            <footer className="fixed bottom-0 left-0 ">
                <NavbarBottom />
                {statusMessage && <p>{statusMessage}</p>}
            </footer>
        </div>
    )
}
export default Profile;