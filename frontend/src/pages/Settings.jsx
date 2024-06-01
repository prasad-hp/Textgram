import React, { useState } from "react";
import NavbarTop from "../components/NavbarTop";
import NavbarBottom from "../components/NavbarBottom";
import Confirm from "../components/Confirm";
import { useNavigate } from "react-router-dom";


function Settings(){
    const [statusMessage, setStatusMessage] = useState("")
    const [confirmDelete, setConfirmDelete] = useState(false)
    const navigate = useNavigate()

    function handleClose(){
        setConfirmDelete(false)
    }

    return(
        <div className="w-screen">
            <header className="fixed top-0 left-0 md:inline-block hidden">
                <NavbarTop />
            </header>
            <div className="flex flex-col items-center justify-start h-screen">
                <div className="pt-28 flex flex-col items-start justify-start w-full sm:w-11/12 md:w-475 p-2 ">
                    <div className="w-full py-4 px-3 rounded-sm border border-gray-300 hover:bg-slate-100 hover:cursor-pointer" onClick={()=>navigate("/update")}>
                        Update Profile
                    </div>
                    <div className="w-full py-4 px-3 rounded-sm border-x border-gray-300 hover:bg-slate-100 hover:cursor-pointer" onClick={()=>navigate("/changepassword")}>
                        Change Password
                    </div>
                    <div className="w-full py-4 px-3 rounded-sm border hover:bg-red-500 hover:cursor-pointer" onClick={()=>setConfirmDelete(true)}>
                        Delete Account
                    </div>
                </div>
            </div>
            <footer className="fixed bottom-0 left-0 ">
                <NavbarBottom />
                {statusMessage && <p>{statusMessage}</p>}
            </footer>
            <div className={`${confirmDelete ? "inline-block" : "hidden"}`}>
                <Confirm onClose={handleClose}/>
            </div>
        </div>
    )
}

export default Settings;