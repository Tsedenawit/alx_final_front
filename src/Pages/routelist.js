import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RouteList = () => {
  const [routeList, setRouteList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/getRoutes").then((res) => {
      const storedUserData = JSON.parse(localStorage.getItem("userData"));
      if (storedUserData.role === "Super-Admin") {
        setRouteList(res.data.routes);
      } else if (storedUserData.role === "Admin") {
        setRouteList(
          res?.data?.routes?.filter(
            (data) => data?.bus?.user === storedUserData?._id
          )
        );
      }
      console.log(res.data);
    });
  }, []);
  const deleteRoute = async (routeId) => {
    try {
      await axios.delete(`http://localhost:3000/deleteRoute/${routeId}`);
      setRouteList((prevRoutes) =>
        prevRoutes.filter((route) => route._id !== routeId)
      );
    } catch (error) {
      console.error("Error deleting route:", error);
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
            navigate("/AddRoute");
          }}
        >
          Add Route
        </button>
      </div>
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          marginTop: "20px",
          border: "1px solid #ddd",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Bus</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Departure Place
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Arrival Place
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Departure Time
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Arrival Time
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Price</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Edit</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {routeList.length > 0 &&
            routeList.map((data, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {data?.bus?.name}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {data.departurePlace}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {data.arrivalPlace}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {data.departureTime}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {data.arrivalTime}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {data.price}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <button
                    onClick={() => {
                      navigate(`/routelist/${data._id}`);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <button onClick={() => deleteRoute(data._id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default RouteList;
