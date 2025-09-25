import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of admins from your server
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/users?role=Admin"
        );
        setAdmins(response.data.users);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchAdmins();
  }, [refresh]);

  const handleSuspendUnsuspend = async (adminId, isSuspended) => {
    try {
      // Perform the suspend/unsuspend action
      await axios.put(`http://localhost:3000/users/${adminId}/suspend`, {
        isSuspended: isSuspended === "Active" ? "Active" : "Suspended",
      });

      // Update the local state to reflect the change
      setAdmins((prevAdmins) =>
        prevAdmins.map((admin) =>
          admin._id === adminId
            ? { ...admin, isSuspended: !isSuspended }
            : admin
        )
      );
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error suspending/unsuspending admin:", error);
    }
  };

  return (
    <div style={{ width: "90%", margin: "auto", marginTop: "100px" }}>
      <h1 style={{ textAlign: "center" }}>Admin List</h1>
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
            navigate("/addAdmin");
          }}
        >
          Add Admin
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
          {admins.map((admin) => (
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

export default AdminList;
