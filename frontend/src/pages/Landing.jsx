import React, {useEffect, useState} from "react";
import PostCard from "../components/PostCard";
import userPosts from "../../dbTest"; 
import axios from "axios";

function LandingPage() {
    const [textInput, setTextInput] = useState("")
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

    async function handleSubmit(){
        try {
            await axios.post({
                method: "post",
                url:"http://localhost:3001/post",
                data:{
                    postText: textInput
                },
                headers:{"Content-Type": "application/json"}
            })

        } catch (error) {
            console.error(error)
        }
    }

    const postList = posts.map((post)=> {
        return(
            <div key={post._id}>
                <PostCard 
                posts = {post}/>
            </div>
        )
    })

    const handleInputChange = (Event) =>{
        setTextInput(Event.target.value);
    }

    return(
        <div className="h-screen flex justify-center w-screen">
            <div className="flex flex-col align-start w-screen lg:w-1/3 md:w-1/2 max-w-xl">
                <div className="w-full border rounded-lg my-2 p-3">
                    <form onSubmit={handleSubmit} className="flex">
                        <input placeholder="Click here to create new Post" className="justify-start w-10/12" value={textInput} onChange={handleInputChange} type="text"></input>
                        <button className="justify-end align-bottom w-2/12 bg-blue-600 mx-3 my-1.5 rounded-xl h-8" type="submit">Post</button>
                    </form>
                </div>
                {postList}
            </div>
        </div>
    )
};

export default LandingPage;
