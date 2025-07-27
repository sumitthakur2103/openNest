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

//   const handleMyBookings = () => {
//     navigate("/mybookings");
//   };

//   const handleBrowseRooms = () => {
//     if (user) {
//       navigate("/book-a-room");
//     } else {
//       navigate("/auth");
//     }
//   };
//   return (
//     <nav className="navbar">
//       <div className="left-nav">
//         <Link to="/" className="logo-container">
//           <img src={Logo} alt="Hotel Logo" className="logo-img" />
//           <span className="logo-text">OpenNest</span>
//         </Link>
//         <div className="nav-links">
//           <button className="nav-link btn-link" onClick={handleBrowseRooms}>
//             Browse Rooms
//           </button>
//           {user ? (
//             <>
//               <button className="nav-link btn-link" onClick={handleMyBookings}>
//                 My Bookings
//               </button>
//               <button className="nav-link btn-link" onClick={handleMyHotels}>
//                 My Hotels
//               </button>
//             </>
//           ) : (
//             <Link to="/auth" className="nav-link">
//               Partner With Us
//             </Link>
//           )}
//         </div>
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
//             <Button
//               variant="outlined"
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

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import "../styles/navbar.css";
import Logo from "../assets/hotel Icon.jpg";
import Button from "@mui/material/Button";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setMenuOpen(false);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="left-nav">
          <Link to="/" className="logo-container">
            <img src={Logo} alt="Hotel Logo" className="logo-img" />
            <span className="logo-text">OpenNest</span>
          </Link>

          <div className="nav-links desktop-only">
            <button
              className="nav-link btn-link"
              onClick={() => handleNavigate("/book-a-room")}
            >
              Browse Rooms
            </button>
            {user ? (
              <>
                <button
                  className="nav-link btn-link"
                  onClick={() => handleNavigate("/mybookings")}
                >
                  My Bookings
                </button>
                <button
                  className="nav-link btn-link"
                  onClick={() => handleNavigate("/myhotels")}
                >
                  My Hotels
                </button>
              </>
            ) : (
              <Link to="/auth" className="nav-link">
                Partner With Us
              </Link>
            )}
          </div>
        </div>

        <div className="right-nav desktop-only">
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
                onClick={() => handleNavigate("/auth")}
              >
                Login
              </Button>
              <Button
                className="Homepage-btn btn1"
                variant="outlined"
                onClick={() => handleNavigate("/auth")}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(true)}>
          &#9776;
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          <div className="close-btn" onClick={() => setMenuOpen(false)}>
            ✕
          </div>
          <button onClick={() => handleNavigate("/book-a-room")}>
            Browse Rooms
          </button>
          {user ? (
            <>
              <button onClick={() => handleNavigate("/mybookings")}>
                My Bookings
              </button>
              <button onClick={() => handleNavigate("/myhotels")}>
                My Hotels
              </button>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => handleNavigate("/auth")}>
                Partner With Us
              </button>
              <button onClick={() => handleNavigate("/auth")}>Login</button>
              <button onClick={() => handleNavigate("/auth")}>Sign Up</button>
            </>
          )}
        </div>
      )}
    </>
  );
}
