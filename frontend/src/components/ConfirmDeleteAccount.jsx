import axios from "axios";
import React, { useEffect, useState } from "react";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import url from "../config";

function ConfirmDeleteAccount({ onClose }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [buttonColor, setButtonColor] = useState("bg-red-300 text-gray-500");
    const navigate = useNavigate()
    
    async function deleteComment(event) {
        event.preventDefault();
        setStatusMessage("Deleting...")
        try {
            const response = await axios({
                method: "delete",
                url: `${url}/api/v1/user/delete`,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                data: {
                    email: email,
                    password: password,
                },
            });
            setStatusMessage(response.data);
            navigate("/login")
            localStorage.removeItem("token")
        } catch (error) {
            setStatusMessage(error.response?.data?.message || "An error occurred");
        }
    }

    useEffect(() => {
        if (email && password) {
            setButtonColor("bg-red-700 text-white");
        } else {
            setButtonColor("bg-red-300 text-gray-500");
        }
        setStatusMessage("")
    }, [email, password]);

    return (
        <div className="bg-black/40 fixed inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-white font-semibold text-xl pb-2">Confirm Delete</h1>
                <div className="w-96 md:w-475 border-2 rounded-lg bg-white h-auto p-4">
                    <p className="text-center">Do you really want to delete your account? All data in your account will be lost, and you can never undo this action.</p>
                    <form onSubmit={deleteComment} className="flex flex-col justify-center text-center">
                        <Input type="email" placeholder="Email" value={email} onChange={event => setEmail(event.target.value)} />
                        <Input type="password" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)} />
                        <p className="flex justify-center p-4 font-medium text-lg text-center">{statusMessage}</p>
                        <div className="flex justify-around">
                            <button
                                type="submit"
                                disabled={!email || !password}
                                className={`w-5/12 max-w-md h-12 m-2 border rounded-full ${buttonColor} hover:text-white font-semibold text-xl`}
                            >
                                Confirm Delete
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-5/12 max-w-md h-12 m-2 border rounded-full bg-gray-800 text-gray-500 hover:text-white font-semibold text-xl"
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

export default ConfirmDeleteAccount;
