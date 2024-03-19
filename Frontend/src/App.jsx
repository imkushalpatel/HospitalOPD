import { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import Login from "./routes/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
