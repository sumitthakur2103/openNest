import { useNavigate } from 'react-router-dom';
import React from 'react'
import axios from "../api/axios.js";
import { useState, useContext } from 'react'
import "../styles/Login.css";
import { AuthContext } from '../context/AuthContext.jsx';

export default function Login() {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [toggle, setToggle] = useState("login");


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/users/login", { email, password });
            console.log(res.data.token);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setUser(res.data.user);
            setEmail("");
            setPassword("");
            navigate('/'); // success message from backend
        } catch (err) {
            console.error("Error:", err.response?.data?.message || err.message);
        }
    }
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/users/register", { name, email, password, phoneNumber });
            console.log(res.data.message);
            setEmail("");
            setPassword("");
            setName("");
            setPhoneNumber("");
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setUser(res.data.user);
            navigate('/');
        } catch (err) {
            console.error("Error:", err.response?.data?.message || err.message);
        }
    }

    return (

        <>
            <div className='toggle-container'>
                <button className={toggle === "login" ? 'active' : ''} onClick={() => setToggle("login")}>Login</button>
                <button className={toggle === "signup" ? 'active' : ''} onClick={() => setToggle("signup")}>Sign Up</button>
                {toggle === "login" ?
                    <div className='login-container'>
                        <form onSubmit={handleLogin}>
                            <input type="email" placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            <input type="password" placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            <button type='submit'>Login</button>
                        </form>
                    </div> :
                    <div className='signup-container'>
                        <form onSubmit={handleSignup}>
                            <input type="text" placeholder='Name' value={name} onChange={(e) => { setName(e.target.value) }} />
                            <input type="email" placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            <input type="password" placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            <input type="tel" placeholder='Phone Number' value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} />
                            <button type='submit'>Sign Up</button>
                        </form>
                    </div>}
            </div>
        </>
    )
}
