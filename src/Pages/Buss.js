import { useEffect, useState } from "react";
import axios from "axios";

export default function Buss() {
  const [buses, setBuses] = useState([]);
  const [departurePlace, setDeparturePlace] = useState("");
  const [arrivalPlace, setArrivalPlace] = useState("");
  useEffect(() => {
    const getRoutes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getRoutes");
        setBuses(response.data.routes);
      } catch (error) {
        console.log(error?.response?.data?.message);
        console.error("Login error:", error);
      }
    };
    getRoutes();
  }, []);
  let filteredBuses = buses;
  filteredBuses = buses.filter((data) =>
    data?.departurePlace.toLowerCase().includes(departurePlace.toLowerCase())
  );
  filteredBuses = filteredBuses.filter((data) =>
    data.arrivalPlace.toLowerCase().includes(arrivalPlace.toLocaleLowerCase())
  );
  return (
    <div style={{ marginTop: 38 }}>
      <div className="imageing">
        <form className="cen">
          <label className="text-white font-bold pr-3">From</label>
          <input
            type="text"
            value={departurePlace}
            onChange={(e) => {
              setDeparturePlace(e.target.value);
            }}
          />
          <label className="text-white font-bold px-3">To</label>
          <input
            type="text"
            value={arrivalPlace}
            onChange={(e) => {
              setArrivalPlace(e.target.value);
            }}
          />
        </form>
      </div>

      {filteredBuses.length > 0 &&
        filteredBuses.map((data, index) => {
          return (
            <div
              className="max-w-[60%] shadow-lg mr-auto ml-auto bg-gray-200 rounded-md mt-[30px] "
              key={index}
            >
              <div className="flex ml-[5px] justify-between">
                <img src="../images/logo.jpg" className="busimg"></img>
                <h2 className="mt-[5px] text-2xl ml-[10px]">
                  {data?.bus?.name}
                </h2>
                <div className="flex ">
                  <h2 className="flex-end mr-[10px]">{data.price} birr</h2>
                </div>
              </div>
              <hr></hr>
              <div className="flex justify-evenly">
                <h2>
                  Dep <span className="px-5">{data.departurePlace}</span>{" "}
                  <br></br> {data.departureTime}
                </h2>
                <h2>
                  Arr <span className="px-5">{data.arrivalPlace}</span>{" "}
                  <br></br> {data.arrivalTime}
                </h2>
              </div>
            </div>
          );
        })}
    </div>
  );
}
