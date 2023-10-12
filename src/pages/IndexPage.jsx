import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Navigate } from 'react-router-dom';
import { UserContext } from "../UserContext";
import ArtCard from '../components/ArtCard';
import axios from 'axios';

function IndexPage() {
    
    const [artworkList, setArtworkList] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      // Make a GET request to fetch artwork data
      axios.get('/api/artwork')
        .then((response) => {
          // Update the state with the fetched artwork data
          setArtworkList(response.data);
          console.log(artworkList);
          setLoading(false);
          
        })
        .catch((error) => {
          console.error('Error fetching artwork data:', error);
        });
    }, [artworkList]);

    return (<div className='flex  justify-center'>
        <div className='w-9/12 mt-10 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
            {loading ? ('loading') :(
            artworkList.map((artwork) => (
            <ArtCard
                key={artwork._id} // Assuming each artwork has a unique ID
                artwork_id = {artwork._id}
                title={artwork.title}
                description={artwork.description}
                artwork_image={artwork.artwork_image}
                starting_bid={artwork.starting_bid}
                startTime={artwork.startTime}
                endTime={artwork.endTime}
                // Add other artwork properties as needed
            />
            ))
            )}
            
        </div>
        </div>
    );
}


export default IndexPage;