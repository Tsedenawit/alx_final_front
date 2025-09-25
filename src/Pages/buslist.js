import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BusList = () => {
  const [busList, setBusList] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios.get("http://localhost:3000/getBus").then((res) => {
  //     setBusList(res.data.savedBus);
  //   });
  // }, []);
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData.role === "Super-Admin") {
      axios.get("http://localhost:3000/getBus").then((res) => {
        setBusList(res.data.savedBus);
      });
    } else if (storedUserData.role === "Admin") {
      axios
        .get(`http://localhost:3000/getBus/mypost/${storedUserData._id}`)
        .then((res) => {
          setBusList(res.data.savedBus);
        });
    }
  }, []);

  const deleteBus = async (busId) => {
    console.log(busId);
    try {
      await axios.delete(`http://localhost:3000/getBus/${busId}`);
      // Remove the deleted bus from the local state
      console.log("asd", busId);
      setBusList((prevBusList) =>
        prevBusList.filter((bus) => bus._id !== busId)
      );
    } catch (error) {
      console.error("Error deleting bus:", error);
      // Handle error display
    }
  };

  return (
    <div
      style={{
        width: "80%",
        margin: "auto",
      }}
    >
      <div style={{ display: "flex", justifyContent: "end" }}>
        <button
          style={{ marginTop: "100px" }}
          onClick={() => {
            navigate("/AddBus");
          }}
        >
          Add bus
        </button>
      </div>
      <table
        style={{
          marginTop: "25px",
          borderCollapse: "collapse",
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Seats</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Plate</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Edit</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {busList.length > 0 &&
            busList.map((data, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {data.name}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {data.sits}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {data.plate}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <button
                    onClick={() => {
                      navigate(`/buslist/${data._id}`);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <button
                    onClick={() => {
                      deleteBus(data._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default BusList;
