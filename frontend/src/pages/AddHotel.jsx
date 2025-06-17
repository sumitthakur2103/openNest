import React, { useState } from 'react'; // make sure useState is imported
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios'; // adjust if needed

import HotelLocationMap from '../components/HotelLocationMap.jsx'; // ensure this path is correct

import NewHotelDetails from "./NewHotelDetails.jsx"; // ensure this path is correct

export default function AddHotel() {
    const navigate = useNavigate();

    // ✅ Make sure formData is initialized with all needed fields
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        city: '',
        landmark: '',
        address: '',
        price: '',
        image: '',
        coordinates: null,
    });

    const [step, setStep] = useState(1);

    const nextStep = () => {
        setStep(2);
    };

    const handleAddBtn = async (e) => {
         console.log("Form Data:", formData); // Debugging line to check formData
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (!user || !token) {
            console.error("User not logged in or token missing.");
            return;
        }

        const dataToSend = {
            ...formData,
            latitude: formData.coordinates?.lat,
            longitude: formData.coordinates?.lng,
        };

        delete dataToSend.coordinates;

        try {
            const res = await axios.post('/hotels/add', dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            navigate('/myhotels');
        } catch (err) {
            console.error('Error while adding hotel:', err);
        }
    };

    return (
        <>
            {step === 1 ? (
                <NewHotelDetails
                    nextStep={nextStep}
                    formData={formData}
                    setFormData={setFormData}
                />
            ) : (
                <HotelLocationMap
                    formData={formData}
                    setFormData={setFormData}
                    handleAddBtn={handleAddBtn}
                />
            )}
        </>
    );
}
