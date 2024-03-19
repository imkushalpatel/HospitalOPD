import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import DoctorDashboard from "./components/Dashboard/DoctorDashboard";
import NurseDashboard from "./components/Dashboard/NurseDashboard";
import InternNurseDashboard from "./components/Dashboard/InternNurseDashboard";
import PatientList from "./components/Patients/PatientList";
import AddPatientForm from "./components/Patients/AddPatientForm";
import VisitList from "./components/Visits/VisitList";
import AddVisitForm from "./components/Visits/AddVisitForm";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/nurse-dashboard" element={<NurseDashboard />} />
        <Route
          path="/intern-nurse-dashboard"
          element={<InternNurseDashboard />}
        />
        <Route path="/patients" element={<PatientList />} />
        <Route path="/add-patient" element={<AddPatientForm />} />
        <Route path="/visits" element={<VisitList />} />
        <Route path="/add-visit" element={<AddVisitForm />} />
      </Routes>
    </>
  );
};

export default App;
