import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ConfirmDeletePost({ onClose, id, userId, toHome }) {
    const [statusMessage, setStatusMessage] = useState("");
    const navigate = useNavigate()
    async function deletePost(event) {
        event.preventDefault();
        setStatusMessage("Deleting...")
        try {
            const response = await axios({
                method: "delete",
                url: "http://localhost:3001/api/v1/post/delete",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                data: {
                    postId: id,
                    userId:userId
                },
            });
            setStatusMessage(response.data.message);
            if(toHome){navigate("/")}
            location.reload();
        } catch (error) {
            setStatusMessage(error.response?.data?.message || "An error occurred");
        }
    }

    return (
        <div className="bg-black/40 fixed inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-white font-semibold text-xl pb-2">Confirm Delete</h1>
                <div className="w-96 md:w-96 border-2 rounded-lg bg-white h-auto p-4">
                    <p className="text-center">Do you really want to delete this post ? You cannot undo this action.</p>
                    <form onSubmit={deletePost}>
                        <p className="flex justify-center p-4 font-medium text-lg text-center">{statusMessage}</p>
                        <div className="flex flex-col items-center justify-around">
                            <button
                                type="submit"
                                className={`w-8/12 max-w-md h-12 m-2 border rounded-full bg-red-300 text-gray-500 hover:bg-red-700 hover:text-white font-semibold text-xl`}
                            >
                                Confirm Delete
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-8/12 max-w-md h-12 m-2 border rounded-full bg-white text-gray-500 hover:bg-green-400 hover:text-white font-semibold text-xl"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
                <button
                    className="text-white font-semibold text-xl mt-4"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default ConfirmDeletePost;
