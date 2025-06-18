import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import HotelLocationMap from '../components/HotelLocationMap.jsx';
import NewHotelDetails from "./NewHotelDetails.jsx";

export default function AddHotel() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        city: '',
        landmark: '',
        address: '',
        price: '',
        coordinates: null,
    });
    const [step, setStep] = useState(1);
    const [imageFiles, setImageFiles] = useState([]);
    const [uploading, setUploading] = useState(false);

    const nextStep = () => setStep(2);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 5);
        setImageFiles(files);
    };

    const handleAddBtn = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");
        if (!user || !token) {
            console.error("User not logged in or token missing.");
            return;
        }
        setUploading(true);
        const form = new FormData();
        form.append("name", formData.name);
        form.append("description", formData.description);
        form.append("city", formData.city);
        form.append("landmark", formData.landmark);
        form.append("address", formData.address);
        form.append("price", formData.price);
        if (formData.coordinates) {
            form.append("coordinates[lat]", formData.coordinates.lat);
            form.append("coordinates[lng]", formData.coordinates.lng);
        }
        imageFiles.forEach(file => form.append("images", file));
        try {
            await axios.post('/hotels/add', form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUploading(false);
            navigate('/myhotels');
        } catch (err) {
            setUploading(false);
            console.error('Error while adding hotel:', err);
        }
    };

    return (
        <>
            {step === 1 ? (
                <div>
                    <NewHotelDetails
                        nextStep={nextStep}
                        formData={formData}
                        setFormData={setFormData}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        max={5}
                    />
                    <p>{imageFiles.length} image(s) selected (max 5)</p>
                    {uploading && <p>Uploading images...</p>}
                </div>
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