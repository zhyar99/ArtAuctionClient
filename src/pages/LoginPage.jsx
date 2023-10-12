import React from "react";
import { useState, useContext } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { UserContext } from "../UserContext";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();
    const { user, setUser, ready } = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
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
            const res = await axios.post('/api/user/login', formData);
            if (res.data == true) {
                console.log(res.data);
                setUser(res.data);
                window.location.href = "/";
            }else{
                alert(res.data)
            }
            

        } catch (err) {
            
               console.log(err);
            
        }
    }
    
    
    if(ready && user != null){
        return <Navigate to='/' />;
    }
    if (redirect) {
        return (
            <Navigate to='/' />
        );
    }
    return (
        <>
        <div>
            
        <form onSubmit={handlFormSubmit}>
                <div className="flex h-[calc(100vh-90px)] justify-center items-center">
                    <div className="relative px-10 py-7 lg:w-6/12 md:w-6/12 sm:w-5/6 bg-secondary rounded-lg">
                        <div className="mt-10 mb-10 flex justify-around flex-col gap-10">
                            <h1 className="text-3xl text-center">LOGIN</h1>
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

export default LoginPage;