import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
export default function BrowseRooms() {
    const navigate = useNavigate();
    const [city, setCity] = useState("");
    const handleCity = (e) => {
        e.preventDefault();
        console.log("City button clicked with city:", city);
        navigate(`/hotels/${city}`);
        // Here you can add logic to search for rooms in the specified city
        // For example, you might want to make an API call to fetch rooms based on the city
        // axios.get(`/rooms?city=${city}`).then(response => {
        //     console.log(response.data);
        // }).catch(error => {
        //     console.error("Error fetching rooms:", error);
        // });
    }
    const handleNear = () => {
        console.log("Near button clicked");
    }
    return (
        <><div>BrowseRooms</div>
            <button onClick={handleNear}>Book Room Around You</button>
            <br />
            <h2>OR</h2>
            <form onSubmit={handleCity}>
                <input type="text" placeholder='Enter City Name' required value={city} onChange={(e) => setCity(e.target.value)} />
                <button type='submit'>Search</button>
            </form>
        </>
    )
}
