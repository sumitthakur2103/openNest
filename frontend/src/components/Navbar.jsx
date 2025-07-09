// import React, { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext.jsx";
// import "../styles/navbar.css";
// import Logo from "../assets/hotel Icon.jpg";
// import Button from "@mui/material/Button";
// export default function Navbar() {
//   const navigate = useNavigate();
//   const { user, setUser } = useContext(AuthContext);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   const handleMyHotels = () => {
//     navigate("/myhotels");
//   };

//   return (
//     <nav className="navbar">
//       <div className="left-nav">
//         <Link to="/" className="logo-container">
//           <img src={Logo} alt="Hotel Logo" className="logo-img" />
//           <span className="logo-text">OpenNest</span>
//         </Link>
//         <Link to="/book-a-room" className="nav-link">
//           Browse Rooms
//         </Link>
//         <Link to="/mybookings" className="nav-link">
//           My Bookings
//         </Link>
//         {user ? (
//           <button className="nav-link" onClick={handleMyHotels}>
//             My Hotels
//           </button>
//         ) : (
//           <Link to="/auth" className="nav-link">
//             Partner With Us
//           </Link>
//         )}
//       </div>

//       <div className="right-nav">
//         {user ? (
//           <>
//             <span className="user-greeting">Hi, {user.name}</span>
//             <button onClick={handleLogout} className="nav-btn">
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             {/* <Button
//               variant="contained"
//               className="nav-btn nav-btn-login"
//               onClick={() => navigate("/auth")}
//             > */}
//             <Button
//               variant="contained"
//               className="Homepage-btn btn2"
//               onClick={() => navigate("/auth")}
//             >
//               Login
//             </Button>
//             <Button
//               className="Homepage-btn btn1"
//               variant="outlined"
//               onClick={() => navigate("/auth")}
//             >
//               Sign Up
//             </Button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import "../styles/navbar.css";
import Logo from "../assets/hotel Icon.jpg";
import Button from "@mui/material/Button";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  const handleMyHotels = () => {
    navigate("/myhotels");
  };

  return (
    <nav className="navbar">
      <div className="left-nav">
        <Link to="/" className="logo-container">
          <img src={Logo} alt="Hotel Logo" className="logo-img" />
          <span className="logo-text">OpenNest</span>
        </Link>
        <div className="nav-links">
          <Link to="/book-a-room" className="nav-link">
            Browse Rooms
          </Link>
          <Link to="/mybookings" className="nav-link">
            My Bookings
          </Link>
          {user ? (
            <button className="nav-link btn-link" onClick={handleMyHotels}>
              My Hotels
            </button>
          ) : (
            <Link to="/auth" className="nav-link">
              Partner With Us
            </Link>
          )}
        </div>
      </div>

      <div className="right-nav">
        {user ? (
          <>
            <span className="user-greeting">Hi, {user.name}</span>
            <button onClick={handleLogout} className="nav-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Button
              variant="outlined"
              className="Homepage-btn btn2"
              onClick={() => navigate("/auth")}
            >
              Login
            </Button>
            <Button
              className="Homepage-btn btn1"
              variant="outlined"
              onClick={() => navigate("/auth")}
            >
              Sign Up
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
