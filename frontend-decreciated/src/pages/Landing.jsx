import React, {useEffect, useState} from "react";
import PostCard from "../components/PostCard";
import axios from "axios";
import CreatePost from "../components/CreatePost";

function LandingPage() {
    const [posts, setPosts] = useState([])


    useEffect(()=>{
        async function fetchData(){
            try {
                const response = await axios.get("http://localhost:3001/posts")
                setPosts(response.data)
                console.log(response.data)
            } catch (error) {
                console.error({message:error.message})
            }
        }
        fetchData()
    },[])

    const postList = posts.map((post)=> {
        return(
            <div key={post._id}>
                <PostCard 
                posts = {post}/>
            </div>
        )
    })
    return(
        <div className="h-screen flex justify-center w-screen">
            <div className="flex flex-col align-start w-screen lg:w-1/3 md:w-1/2 max-w-xl">
                <CreatePost />   
                {postList}
            </div>
        </div>
    )
};

export default LandingPage;
