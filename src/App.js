import "./App.css";
import Nav from "./Pages/Navbar";
import Home from "./Pages/Home";
import Log from "./Pages/Log";
import Buss from "./Pages/Buss";
import Signup from "./Pages/Signup";
import News from "./Pages/News";
import Foot from "./Pages/Foot";
import AddBusForm from "./Pages/AddBusForm";
import Choose from "./Pages/Choose";
import AddRouteForm from "./Pages/AddRouteForm";
import BusList from "./Pages/buslist";
import RouteList from "./Pages/routelist";
import EditBusForm from "./Pages/editbusForm";
import EditRouteForm from "./Pages/editRouteForm";
import AdminSignUpForm from "./Pages/addAdmin";
import AdminList from "./Pages/adminList";
import Salelist from "./Pages/Salelist";
import SaleSignUpForm from "./Pages/addSales";
import SaleProfileUpdateForm from "./Pages/profile";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Nav />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log" element={<Log />} />
          <Route path="/buss" element={<Buss />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/news" element={<News />} />
          <Route path="/AddBus" element={<AddBusForm />} />
          <Route path="/AddRoute" element={<AddRouteForm />} />
          <Route path="/choose" element={<Choose />} />

          <Route path="/buslist" element={<BusList />} />
          <Route path="/buslist/:id" element={<EditBusForm />} />
          <Route path="/routelist" element={<RouteList />} />
          <Route path="/routelist/:id" element={<EditRouteForm />} />
          <Route path="/adminList" element={<AdminList />} />
          <Route path="/addAdmin" element={<AdminSignUpForm />} />
          <Route path="/salesList" element={<Salelist />} />
          <Route path="/addsales" element={<SaleSignUpForm />} />
          <Route path="/profile" element={<SaleProfileUpdateForm />} />
        </Routes>
      </div>
      <Foot />
    </div>
  );
}

export default App;
