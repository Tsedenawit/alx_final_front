import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditRouteForm() {
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState("");
  const [routeDetails, setRouteDetails] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchBusData = async () => {
      try {
        // Fetch bus details
        const storedUserData = JSON.parse(localStorage.getItem("userData"));
        if (storedUserData.role === "Super-Admin") {
          const busesResponse = await axios.get("http://localhost:3000/getBus");
          setBuses(busesResponse.data.savedBus);
        } else if (storedUserData.role === "Admin") {
          axios
            .get(`http://localhost:3000/getBus/mypost/${storedUserData._id}`)
            .then((res) => {
              setBuses(res.data.savedBus);
            });
        }

        // Fetch route details
        const routeResponse = await axios.get(
          `http://localhost:3000/getRoute/${id}`
        );
        setRouteDetails(routeResponse.data.route);

        // Set selected bus based on the route details
        setSelectedBus(routeResponse.data.route.bus._id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBusData();
  }, [id]);

  const EditRoute = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/updateRoute/${id}`,
        {
          bus: selectedBus,
          departurePlace: e.target.departurePlace.value,
          arrivalPlace: e.target.arrivalPlace.value,
          departureTime: e.target.departureTime.value,
          arrivalTime: e.target.arrivalTime.value,
          price: e.target.price.value,
        }
      );

      if (response.data) {
        navigate("/routelist");
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
      console.error("Error updating route:", error);
      // Handle error display
    }
  };

  return (
    <div className="flex items-center justify-center fluid mt-32">
      <div className="bg-white p-16 rounded shadow-2x1 w-1/2">
        <h2 className="text-3xl font-bold mb-10 text-gray-800 text-center">
          Edit Route
        </h2>

        <form className="space-y-5" onSubmit={EditRoute}>
          <div>
            <select
              name="Buses"
              className="sel"
              value={selectedBus}
              onChange={(e) => {
                setSelectedBus(e.target.value);
              }}
            >
              <option value="none">Select Bus</option>

              {buses.length > 0 &&
                buses.map((data, index) => (
                  <option className="selq" value={data._id} key={index}>
                    {data.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-bold text-gray-500">
              Departure Place
            </label>
            <input
              type="text"
              name="departurePlace"
              defaultValue={routeDetails.departurePlace}
              className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-bold text-gray-500">
              Arrival Place
            </label>
            <input
              type="text"
              name="arrivalPlace"
              defaultValue={routeDetails.arrivalPlace}
              className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-bold text-gray-500">
              Departure Time
            </label>
            <input
              type="text"
              name="departureTime"
              defaultValue={routeDetails.departureTime}
              className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-bold text-gray-500">
              Arrival Time
            </label>
            <input
              type="text"
              name="arrivalTime"
              defaultValue={routeDetails.arrivalTime}
              className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-bold text-gray-500">Price</label>
            <input
              type="text"
              name="price"
              defaultValue={routeDetails.price}
              className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
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
