import React, { use } from 'react'
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import { AuthContext } from "../context/AuthContext.jsx";
import axios from "../api/axios.js";
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Navbar() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);
    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
    }

    const handleMyHotels = () => {
        navigate('/myhotels');
    }

    return (
        <nav className="navbar">
            <div className="left-nav">
                <h2>OpenNest</h2>
                <Link to="/">Browse Rooms</Link>
                <Link to="/offers">Special Offers</Link>

                {user ? <>
                    <button onClick={handleMyHotels}>My Hotels</button>
                </>
                    :
                    <>
                        <Link to="/auth">Partner With Us</Link>
                    </>
                }



            </div>
            <div className='right-nav'>
                {user ? <>
                    <span>Hi, {user.name}</span>
                    <button onClick={handleLogout}>Logout</button>
                </>
                    :
                    <>
                        <Link to="/auth">Login</Link>
                        <Link to="/auth">Sign Up</Link>
                    </>
                }

            </div>
        </nav>
    );
}
