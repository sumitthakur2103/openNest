import "../styles/NewHotelDetails.css";

export default function NewHotelDetails({ nextStep, formData, setFormData }) {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="new-hotel-container">
      <h2>Add New Hotel</h2>

      <input
        name="name"
        placeholder="Hotel Name"
        value={formData.name}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      ></textarea>
      <input
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
      />
      <input
        name="landmark"
        placeholder="Landmark"
        value={formData.landmark}
        onChange={handleChange}
      />
      <input
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
      />
      <input
        name="price"
        placeholder="Price"
        type="number"
        value={formData.price}
        onChange={handleChange}
      />

      <button onClick={nextStep}>Next</button>
    </div>
  );
}
