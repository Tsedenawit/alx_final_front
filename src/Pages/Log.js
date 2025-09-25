import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if the user is already logged in
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      if (userData.role === "User") {
        navigate("/buss");
      } else {
        navigate("/choose");
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError(""); // Clear previous errors
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });

      const userData = response.data.userData;
      if (userData.status === "Suspended") {
        setError("Your account is suspended. Please contact support.");
        return;
      }

      // Store user data in local storage
      localStorage.setItem("userData", JSON.stringify(userData));

      if (userData.role === "User") {
        navigate("/buss");
      } else {
        navigate("/choose");
      }
    } catch (error) {
      setError("Invalid username or password. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="fluid">
      <div className="row main-content bg-success text-center">
        <div className="col-md-10 text-center company__info">
          <span className="company__logo">
            <h2>
              <span className="fa fa-android"></span>
            </h2>
          </span>
          <img src="../images/logos.jpg" className="imagess" />

          <h4 style={{ marginTop: 10, textAlign: "center", color: "black" }}>
            Travel with us
          </h4>
        </div>

        <div className="col-md-8 col-xs-12 col-sm-12 login_form ">
          <div className="container-fluid" style={{ paddingLeft: 90 }}>
            <div className="row" style={{ paddingLeft: 80 }}>
              <h2 style={{ textAlign: "center" }}>Log In</h2>
            </div>

            <form className="form-group" onSubmit={handleLogin}>
              <div className="row">
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="form__input"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div className="row">
                <span className="fa fa-lock"></span>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form__input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>

              {error && (
                <div className="row" style={{ marginTop: 10, color: "red" }}>
                  {error}
                </div>
              )}
              <div className="row">
                <input type="submit" value="Submit" className="btn" />
              </div>
            </form>

            <div className="row">
              <p>
                Don't have an account? <a href="./Signup">Register Here</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
