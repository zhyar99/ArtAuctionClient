import React from "react";
import { useEffect, useState, useContext } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Navigate } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import { FileUpload } from 'primereact/fileupload';
import { UserContext } from "../UserContext";
import axios from "axios";
function AddAuction() {
    const { user, setUser, ready } = useContext(UserContext); 
    if (!ready) {
        return "loading";
    }

    const [selectedFile, setSelectedFile] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    ;
    const [artist, setArtist] = useState({});
    const [artwork, setArtwork] = useState({
        artist_id: '',
        title: '',
        description: '',
        starting_bid: 0,
        startTime: '',
        endTime: '',
        currentHighestBid: 0,
    });



    useEffect(() => {
        axios.get(`/api/artist/user/${user._id}`)
            .then((response) => {
                setArtist(response.data);
            })
            .catch((error) => {
                console.error('Error fetching artwork data:', error);
            });
    }, []);



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setArtwork({
            ...artwork,
            [name]: value,
        });
    };

    const handleCreateArtist = async (event) => {
        event.preventDefault();
        try {
            console.log();
            const formData = new FormData();
            console.log(artist._id);
            if (artist.length > 0) {
                formData.append("artist_id", artist[0]._id);
            }
            formData.append("title", artwork.title);
            formData.append("description", artwork.description);
            formData.append("starting_bid", artwork.starting_bid);
            formData.append("startTime", startDate);
            formData.append("endTime", endDate);
            formData.append("artwork_image", selectedFile);
            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            });
            await axios.post(`/api/artwork`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setArtwork({
                artist_id: '',
                title: '',
                description: '',
                starting_bid: 0,
                startTime: '',
                endTime: '',
                currentHighestBid: 0,
            });
            // window.location.href = '/';


        } catch (error) {
            console.error('Error creating artist:', error);
        }
    };
    const handleFileSelect = (event) => {
        const selectedFile = event.files[0];
        setSelectedFile(selectedFile);
        console.log(selectedFile);
    };



    return (
        <>
            <div>
                <br /><br />
                <form onSubmit={handleCreateArtist}>
                    <div className="flex h-[calc(100vh-90px)] justify-center items-center">
                        <div className="relative px-10 py-7 lg:w-6/12 md:w-6/12 sm:w-5/6 bg-secondary rounded-lg">
                            <div className="mt-10 mb-10 flex justify-around flex-col gap-10">
                                <h1 className="text-3xl text-center">Add an artwork for auction</h1>
                                <InputText name="title" onChange={handleInputChange} value={artwork.title} placeholder="Title" />
                                <InputText name="description" onChange={handleInputChange} value={artwork.description} placeholder="Description" />
                                <InputText type="number" name="starting_bid" onChange={handleInputChange} value={artwork.starting_bid} placeholder="Starting bid" />
                                <Calendar id="calendar-12h" value={startDate} onChange={(e) => setStartDate(e.value)} showTime hourFormat="12" placeholder="Start date" />
                                <Calendar id="calendar-12h" value={endDate} onChange={(e) => setEndDate(e.value)} showTime hourFormat="12" placeholder="End date" />
                                {/* <FileUpload name="file" url={`http://localhost:3000/api/upload/uploadimage/${user._id}`}  accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} /> */}
                                <FileUpload
                                    name="file"
                                    chooseLabel="Select File"
                                    uploadLabel="Upload"
                                    cancelLabel="Cancel"
                                    mode="basic"
                                    accept="image/*"
                                    maxFileSize={100000000}
                                    onSelect={handleFileSelect} // Capture the selected file
                                    emptyTemplate={<p className="m-0">Drag and drop files here to upload.</p>}
                                />
                                <Button label="DONE" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddAuction;