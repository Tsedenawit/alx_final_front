import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  // Dummy function to simulate user authentication status
  const checkUserAuthentication = () => {
    const userData = localStorage.getItem("userData");
    const loggedIn = !!userData;
    const role = loggedIn ? JSON.parse(userData).role : null;
    setIsLoggedIn(loggedIn);
    setUserRole(role);
  };

  useEffect(() => {
    checkUserAuthentication();
  });

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    navigate("/log", { replace: true });

    setUserRole(null);
    // Add any other logout logic you may have
  };

  return (
    <div className="cont1">
      <div className="flex bg-slate-700">
        <img className="image" src="../images/logos.jpg" alt="not found" />

        <ul>
          <li style={{ marginTop: 15 }}>
            <a
              href="/"
              style={{
                textDecoration: "none",
                color: "white",
                marginRight: 100,
                paddingTop: 10,
              }}
            >
              Home
            </a>
          </li>
          <li style={{ marginTop: 15 }}>
            <a
              href="/Buss"
              style={{
                textDecoration: "none",
                color: "white",
                marginRight: 100,
                marginTop: 10,
              }}
            >
              Buses
            </a>
          </li>

          {isLoggedIn ? (
            <>
              {userRole !== "User" && (
                <li style={{ marginTop: 15 }}>
                  <a
                    href="/choose"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      marginRight: 100,
                      marginTop: 10,
                    }}
                  >
                    Choose
                  </a>
                </li>
              )}
              <li style={{ marginTop: 15 }}>
                <button
                  onClick={handleLogout}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    width: "100px",
                    // marginTop: 10,
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li style={{ marginTop: 15 }}>
              <a
                href="/Log"
                style={{
                  textDecoration: "none",
                  color: "white",
                  marginRight: 100,
                  marginTop: 10,
                }}
              >
                Login
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
