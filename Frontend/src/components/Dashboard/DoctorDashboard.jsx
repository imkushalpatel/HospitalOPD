import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import visitService from "../../services/visitService";
import { Link } from "react-router-dom";
import PatientList from "../Patients/PatientList";
import VisitList from "../Visits/VisitList";

const DoctorDashboard = () => {
  return (
    <Container>
      <h2>Doctor Dashboard</h2>

      <Row>
        <Link to="/register">Create User</Link>
        <Link to="/add-patient">Add Patient</Link>
        <Link to="/add-visit">Add Visit</Link>
      </Row>

      <Row>
        <Col>
          <PatientList isDashboard />
        </Col>
      </Row>
      <Row>
        <Col>
          <VisitList isDashboard />
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorDashboard;
