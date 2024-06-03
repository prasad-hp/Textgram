import React, { useEffect, useState } from "react";
import CreatePostLanding from "../components/CreatePostLanding";
import NavbarBottom from "../components/NavbarBottom";
import NavbarTop from "../components/NavbarTop";
import PostList from "../components/PostList";
import axios from "axios";
import { useSetRecoilState } from "recoil"
import {userAtom} from "../store/atoms/user.jsx"

function Home(){
    const [statusMessage, setStatusMessage] = useState("")
    const setUser = useSetRecoilState(userAtom)
    useEffect(()=>{
        getUser()
    }, [])

    const getUser = async ()=>{
        try {            
            const response = await axios({
                method:"get",
                url:"http://localhost:3001/api/v1/user",
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
            <header className="fixed top-0 left-0 md:inline-block hidden">
                <NavbarTop />
            </header>
                <div className="flex flex-col items-center md:mt-16 mt-3">
                    <CreatePostLanding />
                    <PostList />
                </div>
            <footer className="fixed bottom-0 left-0 ">
                <NavbarBottom />
                {statusMessage && <p>{statusMessage}</p>}
            </footer>
        </div>
    )
}
export default Home;