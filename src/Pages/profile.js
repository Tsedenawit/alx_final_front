import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SaleProfileUpdateForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    if (storedUserData) {
      setUsername(storedUserData.username);
      setEmail(storedUserData.email);
      setCity(storedUserData.city);
      setAddress(storedUserData.address);
      setGender(storedUserData.gender);
      setPassword(storedUserData.password);
    }
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    try {
      setError("");
      const response = await axios.put("http://localhost:3000/update-profile", {
        username,
        password,
        email,
        address,
        city,
        gender,
      });

      if (response.data.userData) {
        const updatedUserData = {
          username,
          email,
          city,
          address,
          gender,
          role: storedUserData.role,
          password,
        };
        localStorage.setItem("userData", JSON.stringify(updatedUserData));

        navigate("/choose");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred while trying to update the profile.");
      }
      console.error("Update profile:", error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        marginTop: "100px",
      }}
    >
      <form onSubmit={handleUpdateProfile}>
        <label style={{ display: "block", marginBottom: "5px" }}>Name</label>
        <input
          type="text"
          name="Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />

        <label style={{ display: "block", marginBottom: "5px" }}>Email</label>
        <input
          type="text"
          name="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />

        <label style={{ display: "block", marginBottom: "5px" }}>
          Password
        </label>
        <input
          type="password"
          name="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />

        <label style={{ display: "block", marginBottom: "5px" }}>Address</label>
        <input
          type="text"
          name="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />

        <label style={{ display: "block", marginBottom: "5px" }}>City</label>
        <select
          name="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <option value="none">Select City</option>
          <option value="Addis Ababa">Addis Ababa</option>
          <option value="Jimma">Jimma</option>
          <option value="Mekele">Mekele</option>
          <option value="Hawassa">Hawassa</option>
          <option value="Dire Dawa">Dire Dawa</option>
          <option value="Gonder">Gonder</option>
        </select>

        <label style={{ display: "block", marginBottom: "5px" }}>Gender</label>
        <select
          name="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <option value="none">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <button
          type="submit"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Update Profile
        </button>

        {error && (
          <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default SaleProfileUpdateForm;
