import React, {useState} from "react";
import userPosts from "../../dbTest";

function CreatePost(){
    const [textInput, setTextInput] = useState("")
    const [posts, setPosts] = useState(userPosts)

    const handleInputChange = (Event) =>{
        setTextInput(Event.target.value);
    }
    const handleSubmit = (Event) => {
        Event.preventDefault();
        const newPost = {
            id: userPosts.length + 1,
            firstName:"Prasad",
            lastName: "H P",
            postText: textInput,
            likes: 0,
            comments: []
        };
        setPosts([...posts, newPost]);
        setTextInput("")
        console.log("Added to DB");
    }
    return(
        <div className="w-full border rounded-lg my-2 p-3 flex">
            <form onSubmit={handleSubmit}>
                <textarea placeholder="Click here to create new Post" className="justify-start w-10/12" value={textInput} onChange={handleInputChange}></textarea>
                <button className="justify-end align-bottom w-2/12 bg-blue-600 mx-3 my-1.5 rounded-xl" type="submit">Post</button>
            </form>
        </div>
    )
}

export default CreatePost;