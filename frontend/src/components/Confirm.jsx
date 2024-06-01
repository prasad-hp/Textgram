import axios from "axios";
import React, { useEffect, useState } from "react";
import Input from "./Input";
import InputButton from "./InputButton";
import { useNavigate } from "react-router-dom";

function Confirm({ onClose }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [buttonColor, setButtonColor] = useState("bg-red-300 text-gray-500");
    const navigate = useNavigate()
    async function deleteAccount(event) {
        event.preventDefault();
        try {
            const response = await axios({
                method: "delete",
                url: "http://localhost:3001/api/v1/user/delete",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                data: {
                    email: email,
                    password: password,
                },
            });
            setMessage(response.data);
            navigate("/login")
            localStorage.removeItem("token")

        } catch (error) {
            setMessage(error.response?.data?.message|| "An error occurred");
        }
    }

    useEffect(() => {
        if (email && password) {
            setButtonColor("bg-red-700 text-white");
        } else {
            setButtonColor("bg-red-300 text-gray-500");
        }
        setMessage("")
    }, [email, password]);

    return (
        <div className="bg-black/40 fixed inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-white font-semibold text-xl pb-2">Confirm Delete</h1>
                <div className="w-96 md:w-475 border-2 rounded-lg bg-white h-auto p-4">
                    <p className="text-center">Do you really want to delete your account? All data in your account will be lost, and you can never undo this action.</p>
                    <form onSubmit={deleteAccount}>
                        <Input type="email" placeholder="Email" value={email} onChange={event => setEmail(event.target.value)} />
                        <Input type="password" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)} />
                        <p className="flex justify-center p-4 font-medium text-lg">{message}</p>
                        <div className="flex justify-around">
                            <button
                                type="submit"
                                disabled={!email || !password}
                                className={`w-5/12 max-w-md h-12 m-2 border rounded-md ${buttonColor} hover:text-white font-semibold text-xl`}
                            >
                                Confirm Delete
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

export default Confirm;
