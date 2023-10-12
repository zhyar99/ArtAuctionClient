import React, { useEffect, useState, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import io from 'socket.io-client';
import { Toast } from 'primereact/toast';
import { UserContext } from "../UserContext";
import { Navigate, useNavigate, } from 'react-router-dom';

function ArtPage() {
    const { user, setUser, ready } = useContext(UserContext);
    if(!ready){
        return "loading";
    }
    const navigate = useNavigate();
    const [artwork, setArtwork] = useState({});
    const { artId } = useParams();
    const startDate = new Date(artwork.startTime);
    const endDate = new Date(artwork.endTime);
    const timeLeft = calculateTimeLeft(artwork.startTime);
    const [bidAmount, setBidAmount] = useState(0);
    const [bidInput, setBidInput] = useState(0);
    const [time, setTime] = React.useState('')
    const [socket, setSocket] = useState(null);
    const toast = useRef(null);
    const [timeRemain, setTimeRemain] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const currentTime = new Date();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [artist, setArtist] = useState({});
    const [loading, setLoading] = useState(true);
    
    const show = () => {
        toast.current.show({ severity: 'info', summary: 'Info', detail: 'Message Content' });
    };
    useEffect(() => {
        // Define a function to fetch user data
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/api/artwork/${artId}`); // Replace with your API endpoint
                setArtwork(response.data);
                setBidAmount(artwork.currentHighestBid);
                
                const artistResponse = await axios.get(`/api/artist/${artwork.artist_id}`);
                console.log("**************");
                console.log(artistResponse.data);
                setArtist(artistResponse.data);
                setLoading(false);
                
                
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        // Call the function to fetch user data when the component mounts
        fetchUserData();
    }, [artwork.currentHighestBid]);
    useEffect(() => {
        const socketInstance = io('http://localhost:3000');

        socketInstance.on('connect', () => {
            console.log('Connected to the WebSocket server');
            socketInstance.emit('joinAuction', artwork._id, startDate, endDate, user._id);

            socketInstance.on('bidUpdated', (socketAmount) => {
                console.log('Received updated value:', socketAmount);
                // Update your UI with the updated value
                console.log(socketAmount);
                setBidAmount(socketAmount);
                setBidInput(0)
                setBidInput(parseInt(socketAmount, 10) + 100);
            });
        });

        socketInstance.on('disconnect', () => {
            console.log('Disconnected from the WebSocket server');
        });

        setSocket(socketInstance);

        return () => {
            // Clean up the socket connection when the component unmounts
            socketInstance.disconnect();
        };
    }, [artwork]);

    const handleUpdateValue = () => {
        // Check if the socket is available before emitting the event
        setIsButtonDisabled(true);

        // Schedule a function to enable the button after 20 seconds
        setTimeout(() => {
            setIsButtonDisabled(false);
        }, 20000); 

        if (socket) {
            socket.emit('bidValue', bidInput);
        }
    };
    






    // Format the date and time using the toLocaleString method
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
    
    function calculateTimeLeft(targetDate) {
        // Parse the target date string into a Date object
        const targetDateTime = new Date(targetDate);

        // Get the current date and time
        const currentDateTime = new Date();

        // Calculate the difference in milliseconds
        const timeDifference = targetDateTime - currentDateTime;

        // Calculate hours and minutes
        const hoursLeft = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        return {
            hours: hoursLeft,
            minutes: minutesLeft,
        };
    }

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

    return (
        <>
        {loading? 'loading' :
            <>
                <br /><br /><br />
        <div className="main-container max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-5xl">
                <div className="md:flex">
                    <div className="md:shrink-0">
                        <img className="h-96 w-full object-cover md:h-full md:w-96" src={`https://art-auction-api.onrender.com/${artwork.artwork_image}`} alt="Modern building architecture" />
                    </div>
                    <div className="p-8 w-full">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                            <h1 className='text-2xl'>{artwork.title}</h1>
                        </div>
                        <p className="mt-2 text-slate-500">{artwork.description}</p>
                        <br /><br />
                        <div className='artist-info flex' style={{margin: '5px 20px'}}>
                            <a className='flex' href={`/artist/${artist._id}`}>
                                <img src={`https://art-auction-api.onrender.com/${artist.user_id.profile_image}`} alt="" />
                                <h2>{artist.user_id.username}</h2>
                            </a>
                        </div>
                        <div className='myClass mt-10 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2'>
                            <div style={{margin: '5px 20px'}}>
                            <i className="fa-solid fa-hourglass-start"></i> 	&nbsp; {start}
                            </div>
                            <div style={{margin: '5px 20px'}}>
                            <i className="fa-solid fa-hourglass-end"></i> 	&nbsp; {end}
                            </div>
                        </div>  

                        <div className='mt-10 w-full '>
                            {now > start && end > now ? (
                                    <>
                                        <div>
                                            <h1 className='text-xl text-center text-indigo-500'>Time remain to bid: {timeRemain.hours}:{timeRemain.minutes}:{timeRemain.seconds}</h1>
                                            <br />
                                            <div className="art-timer-info">
                                                {bidAmount}
                                                <br />
                                                <hr />
                                                {timeRemain.hours}:{timeRemain.minutes}:{timeRemain.seconds}
                                            </div>

                                        </div>
                                        {
                                            user ? (
                                                <div className='art-auction-btns'>
                                                    <InputText type='number' onChange={(e) => setBidInput(e.target.value)} value={bidInput} name="bidInput" placeholder="Bid amount" />

                                                    <Button onClick={handleUpdateValue} label="Bid" disabled={isButtonDisabled} />
                                                </div>
                                            ) : (
                                                <div className='art-auction-btns-link text-center'>
                                                    In order to bid you have to login click on login below
                                                    <Button onClick={() => (navigate('/login'))} label="Login"  />
                                                </div> 
                                            )
                                        }
                                    </>
                                ) : now >= end ? (
                                    
                                    <>
                                        <div>
                                            <h1 className='text-xl text-red-500'>Auction has ended</h1>
                                            <div className="art-timer-info">
                                                Sold for
                                                <br />
                                                <hr />
                                                {artwork.currentHighestBid}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div>
                                        <h1 className='text-xl text-indigo-500'>Auction starts soon</h1>
                                    </div>
                                )
                            }
                        </div>

                       
                    </div>

                    

                </div>
            </div>
            </>
        }
        </>
    );
}

export default ArtPage;