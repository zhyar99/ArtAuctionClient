import React, { useEffect, useState, useRef, useContext } from 'react';
import ArtCard from '../components/ArtCard';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ArtistPage() {
    const [artworkList, setArtworkList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { artistId } = useParams();
    const [artist, setArtist] = useState({});

    useEffect(() => {
        // Define a function to fetch user data
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/api/artwork/by-artist/${artistId}`);
                setArtworkList(response.data);
                console.log(artworkList);
                const artistResponse = await axios.get(`/api/artist/${artistId}`);
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
    }, [artist, artworkList]);

      
    


    return (
        <>
            {loading ? '' : 
            <>
            <br /><br /><br />
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl">
                <div className="md:flex">
                    <div className="md:shrink-0">
                        <img className="h-60 w-full object-cover md:h-full md:w-60" src={`https://art-auction-api.onrender.com/${artist.user_id.profile_image}`} alt="Modern building architecture" />
                    </div>
                    <div className="p-8">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                            <h1 className='text-2xl'>{artist.user_id.username}</h1>
                        </div>
                        <p className="mt-2 text-slate-500">{artist.bio}</p>
                        <br /><br />
                        <div className='myClass mt-10 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2'>
                            <div>
                                <a href={artist.portfolio} className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                                    <i className="fa-solid fa-globe"></i> Click Here
                                </a>
                                <br />
                            </div>
                            <div>
                                <a href={`tel:${artist.phone}`} className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                                    <i className="fa-solid fa-phone"></i> {artist.phone}
                                </a><br />
                            </div>
                            <div>
                                <a href={`mailto:${artist.business_email}`} className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                                    <i className="fa-solid fa-envelope"></i> {artist.business_email}
                                </a><br />
                            </div>
                            <div>
                                <a href={artist.facebook} className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                                    <i className="fa-brands fa-facebook"></i> view facebook page
                                </a><br />
                            </div>
                            <div>
                                <a href={artist.instagram} className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                                    <i className="fa-brands fa-instagram"></i> view instagram page
                                </a><br />
                            </div>
                            <div>
                                <a href={artist.twitter}  className="block mt-1 text-lg leading-tight font-medium hover:underline">
                                    <i className="fa-brands fa-twitter"></i> view twitter page
                                </a><br />
                            </div>
                        </div>  
                    </div>

                    

                </div>
            </div>
            <br /><br />
            <div className="max-w-md mx-auto  overflow-hidden md:max-w-7xl">
                <h1 className='text-center text-2xl'>Artworks</h1>
                <br />
                <hr />
                <div className='flex  justify-center'>
                    <div className='w-9/12 mt-10 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
                    {
                            artworkList.map((artwork) => (
                                <ArtCard
                                    key={artwork._id}
                                    artwork_id={artwork._id}
                                    title={artwork.title}
                                    description={artwork.description}
                                    artwork_image={artwork.artwork_image}
                                    starting_bid={artwork.starting_bid}
                                    startTime={artwork.startTime}
                                    endTime={artwork.endTime}
                                    // Add other artwork properties as needed
                                />
                           
                            )
                           
                        
                    )}

                    </div>
                </div>
            </div>
            </>
            }
        </>
    );
}

export default ArtistPage;