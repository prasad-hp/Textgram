import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ConfirmDeleteComment({ onClose, postId, commentedUserId, commentId }) {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function deleteComment(event) {
        event.preventDefault();
        setLoading(true);
        console.log(postId, commentedUserId, commentId)
        try {
            const response = await axios({
                method: "patch",
                url: "http://localhost:3001/api/v1/post/comment/delete",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                data: {
                    postId: postId,
                    commentedUserId: commentedUserId,
                    commentId: commentId
                },
            });
            setMessage(response.data.message);
            setLoading(false);
            navigate(0)
        } catch (error) {
            setMessage(error.response?.data?.message || "An error occurred");
            setLoading(false);
        }
    }

    return (
        <div className="bg-black/40 fixed inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-white font-semibold text-xl pb-2">Confirm Delete</h1>
                <div className="w-96 md:w-475 border-2 rounded-lg bg-white h-auto p-4">
                    <p className="text-center">Do you really want to delete this comment? You cannot undo this action.</p>
                    <form onSubmit={deleteComment}>
                        <p className="flex justify-center p-4 font-medium text-lg">{message}</p>
                        <div className="flex justify-around">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-5/12 max-w-md h-12 m-2 border rounded-md ${loading ? 'bg-gray-500' : 'bg-red-300'} text-gray-500 hover:bg-red-700 hover:text-white font-semibold text-xl`}
                            >
                                {loading ? 'Deleting...' : 'Confirm Delete'}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-5/12 max-w-md h-12 m-2 border rounded-md bg-gray-800 text-gray-500 hover:bg-green-700 hover:text-white font-semibold text-xl"
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

export default ConfirmDeleteComment;
