import React, { useEffect, useState } from "react";
import "./artcard.css";
import { Button } from "primereact/button";
import axios from 'axios';
function ArtCard({ artwork_id, artist_image, artist_name, artist_id, title, description, artwork_image, starting_bid, startTime, endTime }) {
    const [timeRemain, setTimeRemain] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    const currentTime = new Date();
    const now = currentTime.toLocaleString('en-US', {

        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true, // Use 12-hour format
    });
    const start = startDate.toLocaleString('en-US', {

        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true, // Use 12-hour format
    });
    const end = endDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true, // Use 12-hour format
    });
    useEffect(() => {

        // Function to calculate the remaining time
        const calculateTimeRemaining = () => {
            const now = new Date();

            // Check if the current time is past the start time
            if (now >= startDate) {
                // Calculate the time remaining until the end time
                const timeDifference = endDate - now;

                // Check if the current time is past the end time
                if (timeDifference <= 0) {
                    // Auction has ended, stop the countdown

                    if (now < endDate) {
                        clearInterval(interval);
                    }
                    setTimeRemain({ hours: 0, minutes: 0, seconds: 0 });
                    return;
                }

                // Calculate hours, minutes, and seconds
                const hoursLeft = Math.floor(timeDifference / (1000 * 60 * 60));
                const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const secondsLeft = Math.floor((timeDifference % (1000 * 60)) / 1000);

                // Update the state with the remaining time
                setTimeRemain({ hours: hoursLeft, minutes: minutesLeft, seconds: secondsLeft });
            }
        };

        // Calculate the initial time remaining
        calculateTimeRemaining();

        // Start the countdown interval
        const interval = setInterval(calculateTimeRemaining, 1000);

        // Clean up the interval when the component unmounts
        return () => {
            clearInterval(interval);
        };
    }, [start, end]);

    // Format the date and time using the toLocaleString method

    const header = (
        <img
            alt="Card"
            src="https://primefaces.org/cdn/primereact/images/usercard.png"
        />
    );
    const footer = (
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button label="Save" icon="pi pi-check" />
            <Button
                label="Cancel"
                icon="pi pi-times"
                className="p-button-outlined p-button-secondary"
            />
        </div>
    );
    function calculateRemainingHours(startTime, endTime) {
        const start = new Date(startTime);
        const end = new Date(endTime);
        const timeDifference = end - start;

        // Calculate remaining hours from the time difference
        const remainingHours = timeDifference / (1000 * 60 * 60);

        return remainingHours;
    }
    return (
        <div className="flex justify-content-center ">
            <div className="card ">

                <div className="card-header">

                    <img src={`https://art-auction-api.onrender.com/${artwork_image}`} alt="" />
                </div>
                <a href={`/art/${artwork_id}`}>
      
                    
                    <div className="card-body">
                        {
                            now > start && end > now ? (
                                
                                <span style={{backgroundColor: 'green'}}>OPEN</span>

                            ) : now >= end ? (
                                <span style={{backgroundColor: 'red'}}>CLOSED</span>

                            ) : <span>STARTING SOON</span>
                        
                        
                        }


                        <h1 className="card-title">
                            {title}
                        </h1>
                        <ul className="card-details">
                            <li>Start time: {start}</li>
                            <li>End time: {end}</li>
                        </ul>
                    </div>
                </a>
                
            </div>
        </div>
    );
}

export default ArtCard;
