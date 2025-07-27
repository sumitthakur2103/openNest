import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import Myhotels from "./pages/Myhotels";
import EditHotel from "./pages/EditHotel";
import AddHotel from "./pages/AddHotel";
import BrowseRooms from "./pages/BrowseRooms";
import CityHotelsPage from "./pages/CityHotelsPage";
import ViewHotel from "./components/ViewHotel.jsx";
import MyBookings from "./pages/MyBookings";
function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Login />}></Route>
            <Route path="/myhotels" element={<Myhotels />}></Route>
            <Route path="addNewHotel" element={<AddHotel />}></Route>
            <Route path="editHotel/:id" element={<EditHotel />}></Route>
            <Route path="/book-a-room" element={<BrowseRooms />} />
            <Route path="/mybookings" element={<MyBookings />}></Route>
            <Route path="/hotel/:hotelId" element={<ViewHotel />}></Route>
            <Route path="/hotels/:city" element={<CityHotelsPage />}></Route>
            <Route path="*" element={<h1>404 Not Found</h1>} />
            {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
