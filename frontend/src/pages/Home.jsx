import React, { useEffect, useState } from "react";
import CreatePostLanding from "../components/CreatePostLanding";
import NavbarBottom from "../components/NavbarBottom";
import NavbarTop from "../components/NavbarTop";
import PostList from "../components/PostList";
import axios from "axios";
import recoil, { useSetRecoilState } from "recoil"
import {userAtom} from "../store/atoms/user.jsx"

function Home(){
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
            console.log(error.response.data)
        }
    }
    return(
        <div className="w-screen">
            <header className="fixed top-0 left-0 md:inline-block hidden">
                <NavbarTop />
            </header>
                <div className="flex flex-col items-center mt-16">
                    <CreatePostLanding />
                    <PostList />
                </div>
            <footer className="fixed bottom-0 left-0 ">
                <NavbarBottom />
            </footer>
        </div>
    )
}
export default Home;