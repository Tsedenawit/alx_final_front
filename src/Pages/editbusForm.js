import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBusForm() {
  const [name, setName] = useState("");
  const [sits, setSits] = useState("");
  const [plate, setPlate] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Fetch bus details based on the ID when the component mounts
    const fetchBusDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/getBus/${id}`);
        const busData = response.data.bus;
        setName(busData.name);
        setSits(busData.sits);
        setPlate(busData.plate);
      } catch (error) {
        console.error("Error fetching bus details:", error);
      }
    };

    fetchBusDetails();
  }, [id]);

  const updateBus = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/updateBus/${id}`,
        {
          name,
          sits,
          plate,
        }
      );

      if (response.data) {
        navigate("/buslist");
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
      console.error("Update error:", error);
      // Handle error display
    }
  };

  return (
    <div className="flex items-center justify-center fluid mt-32">
      <div className="bg-white p-16 rounded shadow-2x1 w-1/2">
        <h2 className="text-3xl font-bold mb-10 text-gray-800 text-center">
          Edit Bus
        </h2>

        <form className="space-y-5" onSubmit={updateBus}>
          <div>
            <label className="block mb-1 font-bold text-gray-500">Name</label>
            <input
              type="text"
              className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <div>
            <label className="block mb-1 font-bold text-gray-500">Seats</label>
            <input
              className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
              value={sits}
              onChange={(e) => {
                setSits(e.target.value);
              }}
            />
          </div>

          <div>
            <label className="block mb-1 font-bold text-gray-500">
              Licence plate
            </label>
            <input
              type="text"
              className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
              value={plate}
              onChange={(e) => {
                setPlate(e.target.value);
              }}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded justify-center"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
