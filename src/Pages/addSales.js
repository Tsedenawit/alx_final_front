import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SaleSignUpForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setError(""); // Clear previous errors
      const response = await axios.post("http://localhost:3000/signup", {
        username,
        password,
        email,
        address,
        city,
        gender,
        role: "Sales-Person",
      });

      if (response.data.userData) {
        navigate("/saleslist");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred while trying to add an admin.");
      }
      console.error("Sign up:", error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        marginTop: "100px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#333",
          fontSize: "1.5em",
          marginBottom: "20px",
        }}
      >
        Add Sales person
      </h1>

      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={handleSignUp}
      >
        <label
          style={{
            marginBottom: "5px",
            color: "#555",
            fontSize: "0.9em",
          }}
        >
          Name
        </label>
        <input
          type="text"
          name="Name"
          style={{
            marginBottom: "10px",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          placeholder="Abebe Birhanu"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <label
          style={{
            marginBottom: "5px",
            color: "#555",
            fontSize: "0.9em",
          }}
        >
          Email
        </label>
        <input
          type="text"
          name="Email"
          style={{
            marginBottom: "10px",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          placeholder="abebe@gmail.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <label
          style={{
            marginBottom: "5px",
            color: "#555",
            fontSize: "0.9em",
          }}
        >
          Password
        </label>
        <input
          type="password"
          name="Password"
          style={{
            marginBottom: "10px",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <label
          style={{
            marginBottom: "5px",
            color: "#555",
            fontSize: "0.9em",
          }}
        >
          Address
        </label>
        <input
          type="text"
          name="Address"
          style={{
            marginBottom: "10px",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          placeholder="Bole 1221"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />

        <label
          style={{
            marginBottom: "5px",
            color: "#555",
            fontSize: "0.9em",
          }}
        >
          City
        </label>
        <select
          name="City"
          style={{
            marginBottom: "10px",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
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

        <label
          style={{
            marginBottom: "5px",
            color: "#555",
            fontSize: "0.9em",
          }}
        >
          Gender
        </label>
        <select
          name="Gender"
          style={{
            marginBottom: "10px",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
          }}
        >
          <option value="none">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <button
          style={{
            backgroundColor: "#4caf50",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "20px",
          }}
          type="submit"
        >
          Add Sales Person
        </button>

        {error && (
          <p
            style={{
              color: "red",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default SaleSignUpForm;
