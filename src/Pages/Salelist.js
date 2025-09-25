import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Salelist = () => {
  const [sales, setSales] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of admins from your server
    const fetchSales = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/users?role=Sales-Person"
        );
        setSales(response.data.users);
      } catch (error) {
        console.error("Error fetching sales person:", error);
      }
    };

    fetchSales();
  }, [refresh]);

  const handleSuspendUnsuspend = async (saleId, isSuspended) => {
    try {
      // Perform the suspend/unsuspend action
      await axios.put(`http://localhost:3000/users/${saleId}/suspend`, {
        isSuspended: isSuspended === "Active" ? "Active" : "Suspended",
      });

      // Update the local state to reflect the change
      setSales((prevAdmins) =>
        prevAdmins.map((sales) =>
          sales._id === saleId ? { ...sales, isSuspended: !isSuspended } : sales
        )
      );
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error suspending/unsuspending sales:", error);
    }
  };

  return (
    <div style={{ width: "90%", margin: "auto", marginTop: "100px" }}>
      <h1 style={{ textAlign: "center" }}>Sales Person List</h1>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <button
          style={{
            backgroundColor: "#4caf50",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
          onClick={() => {
            navigate("/addSales");
          }}
        >
          Add Sales person
        </button>
      </div>
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          border: "1px solid #ddd",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>City</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Change Status
            </th>
          </tr>
        </thead>
        <tbody>
          {sales.map((admin) => (
            <tr key={admin._id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {admin.username}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {admin.email}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {admin.city}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <button
                  onClick={() =>
                    handleSuspendUnsuspend(admin._id, admin.status)
                  }
                  style={{
                    backgroundColor: admin.isSuspended ? "#ff9800" : "#4caf50",
                    color: "white",
                    padding: "8px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  {admin.status === "Active" ? "Suspend" : "Unsuspend"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Salelist;
