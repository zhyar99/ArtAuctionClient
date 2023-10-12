import React from "react";
import { useState, useContext } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { UserContext } from "../UserContext";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function RegisterPage() {
    const navigate = useNavigate();
    const { user, setUser, ready } = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        user_type: "bidder",
        email: "",
        password: "",
        profile_image: "defautl.png"
    });

    function handleFormChange(event) {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }

    async function handlFormSubmit(event) {
        event.preventDefault();
        
        try {
            const res = await axios.post('/api/user', formData);
            
            console.log(res.data);
            
            navigate('/login');
        } catch (err) {
            
               console.log(err);
            
        }
    }
    
   
    if(ready && user != null){
        return <Navigate to='/login' />
    }

    return (
        <>
        <div>
            
        <form onSubmit={handlFormSubmit}>
                <div className="flex h-[calc(100vh-90px)] justify-center items-center">
                    <div className="relative px-10 py-7 lg:w-6/12 md:w-6/12 sm:w-5/6 bg-secondary rounded-lg">
                        <div className="mt-10 mb-10 flex justify-around flex-col gap-10">
                            <h1 className="text-3xl text-center">Register</h1>
                            <InputText name="username" onChange={handleFormChange} value={formData.username} placeholder="Username" />
                            <InputText name="email" onChange={handleFormChange} value={formData.email} placeholder="Email" />
                            <InputText name="password" type="password" onChange={handleFormChange} value={formData.password} placeholder="Password" />
                            <Button label="DONE" />
                        </div>
                    </div>
                </div>
            </form>
        </div>
        </>
    );
}

export default RegisterPage;