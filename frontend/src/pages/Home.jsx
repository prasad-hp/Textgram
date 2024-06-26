import React, { useEffect, useState } from "react";
import CreatePostLanding from "../components/CreatePostLanding";
import NavbarBottom from "../components/NavbarBottom";
import NavbarTop from "../components/NavbarTop";
import PostList from "../components/PostList";
import axios from "axios";
import { useSetRecoilState } from "recoil"
import {userAtom} from "../store/atoms/user.jsx"
import { useNavigate } from "react-router-dom";

function Home(){
    const [statusMessage, setStatusMessage] = useState("")
    const setUser = useSetRecoilState(userAtom)
    const navigate = useNavigate()
    useEffect(()=>{
        if(!localStorage.getItem("token")){
            navigate("/login")
        }
        getUser()
    }, [])

    const getUser = async ()=>{
        try {            
            const response = await axios({
                method:"get",
                url:"http://textgram.ap-south-1.elasticbeanstalk.com/api/v1/user",
                headers:{
                    Authorization:"Bearer " + localStorage.getItem("token")
                }
            })
            setUser(response.data)
        } catch (error) {
            setStatusMessage(error.response ? error.response.data : "An error Occured")
        }
    }
    return(
        <div className="w-screen">
            <header className="fixed top-0 left-0 md:inline-block hidden z-0">
                <NavbarTop />
            </header>
                <div className="flex flex-col items-center md:mt-16 mt-3">
                    <CreatePostLanding />
                    <PostList />
                </div>
            <footer className="fixed bottom-0 left-0">
                <NavbarBottom />
                {statusMessage && <p>{statusMessage}</p>}
            </footer>
        </div>
    )
}
export default Home;