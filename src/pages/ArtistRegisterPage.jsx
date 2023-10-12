import React from "react";
import { useState, useContext } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { UserContext } from "../UserContext";
import axios from "axios";
import { Navigate } from 'react-router-dom';
import { FileUpload } from 'primereact/fileupload';

function ArtistRegisterPage() {
    const { user, setUser, ready } = useContext(UserContext);
    
    if (!ready) {
        return "loading";
    }

    if (user.user_type == 'artist') {
        return <Navigate to='/' />;
    }
    
    const [artist, setArtist] = useState({
        user_id: user._id, // Fill in with the user's ID
        bio: '',
        portfolio: '',
        business_email: '',
        phone: '',
        facebook: '',
        twitter: '',
        instagram: '',
     
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setArtist({
          ...artist,
          [name]: value,
        });
      };
    
      const handleCreateArtist = async (event) => {
        event.preventDefault();
        try {
          console.log(artist);
          await axios.post('/api/artist', artist); // Adjust the API endpoint
          
          window.location.href = "/";
          // Reset the artist state after successful creation
          
        } catch (error) {
          console.error('Error creating artist:', error);
        }
    };
    const [uploadedImage, setUploadedImage] = useState(null);

    // Callback function for handling file uploads
    const handleFileUpload = (event) => {
        const file = event.files && event.files[0];
        if (file) {
            setUploadedImage(file);
        }
        alert(uploadedImage);
    };
    return (
        <>
        <div>
            <br /><br /><br /><br /> <br /><br /><br />
        <form onSubmit={handleCreateArtist}>
                <div className="flex h-[calc(100vh-90px)] justify-center items-center">
                    <div className="relative px-10 py-7 lg:w-6/12 md:w-6/12 sm:w-5/6 bg-secondary rounded-lg">
                        <div className="mt-10 mb-10 flex justify-around flex-col gap-10">
                            <h1 className="text-3xl text-center">Register as an artist</h1>
                            <InputText name="bio" onChange={handleInputChange} value={artist.bio} placeholder="Bio" />
                            <FileUpload name="file" url={`http://localhost:3000/api/upload/uploadimage/${user._id}`}  accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
                            <InputText name="portfolio" onChange={handleInputChange} value={artist.portfolio} placeholder="Portfolio" />
                            <InputText name="business_email" onChange={handleInputChange} value={artist.business_email} placeholder="Business Email" />
                            <InputText name="phone" onChange={handleInputChange} value={artist.phone} placeholder="Business Phone" />
                            <InputText name="facebook" onChange={handleInputChange} value={artist.facebook} placeholder="Facebook URL" />
                            <InputText name="twitter" onChange={handleInputChange} value={artist.twitter} placeholder="Twitter URL" />
                            <InputText name="instagram" onChange={handleInputChange} value={artist.instagram} placeholder="Instagram URL" />                            
                            <Button label="DONE" />
                        </div>
                    </div>
                </div>
            </form>
        </div>
        </>
    );
}

export default ArtistRegisterPage;