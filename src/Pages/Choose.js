import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Choose() {
  const navigate = useNavigate();
  const [showAdminListButton, setShowAdminListButton] = useState(false);
  const [showSalesListButton, setShowSalesListButton] = useState(false);
  const [showSalesPersonListButton, setShowSalesPersonListButton] =
    useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      if (userData.role === "User") {
        navigate("/buss");
      } else if (userData.role === "Super-Admin") {
        setShowAdminListButton(true);
        setShowSalesListButton(true);
      } else if (userData.role === "Admin") {
        setShowSalesListButton(true);
      } else if (userData.role === "Sales-Person") {
        setShowSalesPersonListButton(true);
      }
    } else {
      navigate("/Log");
    }
  }, [navigate]);

  const handleAdminListClick = () => {
    navigate("/adminList");
  };
  const handleSalesListClick = () => {
    navigate("/saleslist");
  };
  return (
    <div className="flex justify-evenly">
      {showSalesListButton && (
        <div className="flex justify-center items-center h-screen">
          <div className="max-w-xs bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
              <img
                className="w-full h-50 mx-auto"
                src="./images/bus.png"
                alt="Profile"
              />
              <h1 className="text-xl font-semibold text-center mt-4">Buses</h1>
              <div className="mt-6 flex justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    navigate("/buslist");
                  }}
                >
                  Click here
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showSalesListButton && (
        <div className="flex justify-center items-center h-screen">
          <div className="max-w-xs bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
              <img
                className="w-full h-50 mx-auto"
                src="./images/bridge.jpg"
                alt="Profile"
              />
              <h1 className="text-xl font-semibold text-center mt-4">Routes</h1>
              <div className="mt-6 flex justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    navigate("/RouteList");
                  }}
                >
                  Click here
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showAdminListButton && (
        <div className="flex justify-center items-center h-screen">
          <div className="max-w-xs bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
              <img
                className="w-full h-50 mx-auto"
                src="./images/team.jpg"
                alt="Profile"
              />
              <h1 className="text-xl font-semibold text-center mt-4">
                Admin List
              </h1>
              <div className="mt-6 flex justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleAdminListClick}
                >
                  Click here
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showSalesListButton && (
        <div className="flex justify-center items-center h-screen">
          <div className="max-w-xs bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
              <img
                className="w-full h-50 mx-auto"
                src="./images/team.jpg"
                alt="Profile"
              />
              <h1 className="text-xl font-semibold text-center mt-4">
                Sales List
              </h1>
              <div className="mt-6 flex justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleSalesListClick}
                >
                  Click here
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showSalesPersonListButton && (
        <>
          <div className="flex justify-center items-center h-screen">
            <div className="max-w-xs bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-4">
                <img
                  className="w-full h-50 mx-auto"
                  src="./images/bridge.jpg"
                  alt="Profile"
                />
                <h1 className="text-xl font-semibold text-center mt-4">Book</h1>
                <div className="mt-6 flex justify-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      navigate("/buss");
                    }}
                  >
                    Click here
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center h-screen">
            <div className="max-w-xs bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-4">
                <img
                  className="w-full h-50 mx-auto"
                  src="./images/bridge.jpg"
                  alt="Profile"
                />
                <h1 className="text-xl font-semibold text-center mt-4">
                  Profile
                </h1>
                <div className="mt-6 flex justify-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      navigate("/profile");
                    }}
                  >
                    Click here
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
