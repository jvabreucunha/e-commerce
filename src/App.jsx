import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import UserVehicles from "./pages/UserVehicles.jsx";
import AddVehicle from "./pages/AddVehicle.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { ToastProvider } from "./components/ToastContex.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
          <Route path="/my-vehicles" element={<ProtectedRoute><UserVehicles /></ProtectedRoute>}/>
          <Route path="/add-vehicle" element={<ProtectedRoute><AddVehicle /></ProtectedRoute>}/>

        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}
