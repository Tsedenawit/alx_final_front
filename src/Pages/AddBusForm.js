import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddBusForm() {
  const [name, setName] = useState("");
  const [sits, setSits] = useState("");
  const [plate, setPlate] = useState("");
  const navigate = useNavigate();

  const AddBus = async (e) => {
    e.preventDefault();
    try {
      const response = await axios
        .post("http://localhost:3000/postBus", {
          name,
          sits,
          plate,
        })
        .then((res) => {
          if (res.data) {
            return navigate("/buslist");
          }
        });

      console.log("ads");
    } catch (error) {
      console.log(error?.response?.data?.message);
      console.error("Login error:", error);
      // Handle error display
    }
  };
  return (
    <div class="flex items-center justify-center fluid mt-32">
      <div class="bg-white p-16 rounded shadow-2x1 w-1/2">
        <h2 class="text-3xl font-bold mb-10 text-gray-800 text-center">
          Add bus
        </h2>

        <form class="space-y-5" onSubmit={AddBus}>
          <div>
            <label class="block mb-1 font-bold text-gray-500">Name</label>
            <input
              type="text"
              class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <div>
            <label class="block mb-1 font-bold text-gray-500">Seats</label>
            <input
              class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
              value={sits}
              onChange={(e) => {
                setSits(e.target.value);
              }}
            />
          </div>

          <div>
            <label class="block mb-1 font-bold text-gray-500">
              Licence plate
            </label>
            <input
              type="text"
              class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
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
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
