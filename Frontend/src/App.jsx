import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Logout from "./components/Auth/Logout";
import DoctorDashboard from "./components/Dashboard/DoctorDashboard";

import PatientList from "./components/Patients/PatientList";
import AddPatientForm from "./components/Patients/AddPatientForm";
import VisitList from "./components/Visits/VisitList";
import AddVisitForm from "./components/Visits/AddVisitForm";
import Navbar from "./components/Navbar";
import { useAuth } from "./AuthContext";
import authService from "./services/authService";

const App = () => {
  const { isLoggedIn, setUser, setIsLoggedIn } = useAuth();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUser = async () => {
      try {
        const response = await authService.getUser();
        setUser(response.user);
        setIsLoggedIn(true);
      } catch (error) {
        setUser({});
        setIsLoggedIn(false);
        localStorage.clear();
      }
    };
    token && fetchUser();
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <DoctorDashboard /> : <Login />}
        />
        {!isLoggedIn && <Route path="/login" element={<Login />} />}
        {isLoggedIn && (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />

            <Route path="/dashboard" element={<DoctorDashboard />} />
            {/* <Route path="/nurse-dashboard" element={<InternNurseDashboard />} />
            <Route
              path="/internNurse-dashboard"
              element={<InternNurseDashboard />}
            /> */}
            <Route path="/patients" element={<PatientList />} />
            <Route path="/add-patient" element={<AddPatientForm />} />
            <Route path="/visits" element={<VisitList />} />
            <Route path="/add-visit" element={<AddVisitForm />} />
            <Route path="/add-visit/:patientId" element={<AddVisitForm />} />
          </>
        )}
        <Route
          path="*"
          element={isLoggedIn ? <DoctorDashboard /> : <Login />}
        />
      </Routes>
    </>
  );
};

export default App;
