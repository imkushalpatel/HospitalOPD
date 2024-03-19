import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import patientService from "../../services/patientService";

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await patientService.getAllPatients();
        setPatients(response);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);

  return (
    <Container>
      <h2>Patient List</h2>
      <Row>
        {patients.map((patient) => (
          <Col key={patient._id} md={4}>
            <Card>
              <Card.Body>
                <Card.Title>{patient.name}</Card.Title>
                {/* Add more patient details here */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PatientList;
