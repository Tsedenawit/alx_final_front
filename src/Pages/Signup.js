import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:3000/signup", {
          username: username,
          password: password,
          email,
          address,
          city,
          gender,
          role: "User",
        })
        .then((res) => {
          if (res.data.userData) {
            navigate("/log");
          }
        });

      // Handle response, store token etc.
    } catch (error) {
      console.error("Sign up:", error);
      // Handle error display
    }
  };

  return (
    <div className="form">
      <h1> Signup Here!</h1>

      <form className="forming" onSubmit={handleSignUp}>
        <label className="text-red">Name</label>
        <input
          type="text"
          name="Name"
          className="inp"
          placeholder="Abebe Birhanu"
          style={{ color: "black" }}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <br></br>
        <label>Email</label>
        <input
          type="text"
          name=" Email"
          className="inp"
          style={{ color: "black" }}
          placeholder="abebe@gmail.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br></br>
        <label>Password</label>
        <input
          type="password"
          name=""
          style={{ color: "black" }}
          className="inp"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br></br>
        <label>Address</label>
        <input
          type="text"
          name=""
          className="inp"
          style={{ color: "black" }}
          placeholder="bole 1221"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <br></br>
        <select
          name="countries"
          className="sel"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        >
          <option value="none">Select Your City</option>
          <option className="selq" value="Addis Ababa">
            Addis Ababa
          </option>
          <option className="selq" value="Jimma">
            Jimma
          </option>
          <option className="selq" value="Mekele">
            Mekele
          </option>
          <option className="selq" value="Hawassa">
            Hawassa
          </option>
          <option className="selq" value="Dire Dawa">
            Dire Dawa
          </option>
          <option className="selq" value="Gonder">
            Gonder
          </option>
        </select>
        <br></br>

        <select
          name="gender"
          className="sel"
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
          }}
        >
          <option value="none">Select Your Gender</option>
          <option className="selq" value="Male">
            Male
          </option>
          <option className="selq" value="Female">
            Female
          </option>
        </select>

        <button className="buttons" type="submit">
          Sign Up
        </button>
        <h3 className="text-black">
          Already have account ?{" "}
          <a className="aclk" href="./Log">
            Click here!
          </a>
        </h3>
      </form>
    </div>
  );
};
export default Signup;
