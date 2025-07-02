import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CurrentLocationMap from '../components/CurrentLocationMap';
export default function BrowseRooms() {
    const navigate = useNavigate();
    const [city, setCity] = useState("");

    const [openMap, setOpenMap] = useState(false);

    const handleCity = (e) => {
        e.preventDefault();
        console.log("City button clicked with city:", city);
        navigate(`/hotels/${city}`);
    }
    const handleMap = () => {
        console.log("Near button clicked");
        setOpenMap(true);
    }
    return (
        <><div>BrowseRooms</div>
            <button onClick={handleMap}>Book Room Around You</button>
            <br />


            {openMap ? (<CurrentLocationMap />) :
                <>
                    <h2>or</h2>
                    <form onSubmit={handleCity}>
                        <input type="text" placeholder='Enter City Name' required value={city} onChange={(e) => setCity(e.target.value)} />
                        <button type='submit'>Search</button>
                    </form>
                </>
            }
        </>
    )
}
