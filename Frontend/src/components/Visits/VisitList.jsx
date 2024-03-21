import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { BsTrash, BsPencil } from "react-icons/bs";

import visitService from "../../services/visitService";

const VisitList = ({ isDashboard }) => {
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        let response;
        if (isDashboard) {
          response = await visitService.getTodayVisits();
        } else {
          response = await visitService.getAllVisits();
        }
        setVisits(response);
      } catch (error) {
        console.error("Error fetching visits:", error);
      }
    };
    fetchVisits();
  }, [isDashboard]);

  const handleDelete = async (id) => {
    try {
      await visitService.deleteVisit(id);
      const updatedVisits = visits.filter((visit) => visit._id !== id);
      setVisits(updatedVisits);
    } catch (error) {
      console.error("Error deleting visit:", error);
    }
  };

  const handleEdit = (id) => {
    // Implement edit functionality here
    console.log("Edit visit with id:", id);
  };

  return (
    <Container>
      <h2>{isDashboard ? "Today's Visits" : "Visit List"}</h2>
      <Row>
        {visits.length ? (
          visits.map((visit) => (
            <Col key={visit._id} md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    <Row>
                      <Col>
                        {visit.patient.firstname} {visit.patient.lastname}
                      </Col>
                      <Col xs="auto">
                        <Button
                          variant="link"
                          onClick={() => handleDelete(visit._id)}
                        >
                          <BsTrash />
                        </Button>
                        <Button
                          variant="link"
                          onClick={() => handleEdit(visit._id)}
                        >
                          <BsPencil />
                        </Button>
                      </Col>
                    </Row>
                  </Card.Title>
                  <Card.Text>
                    <strong>Height:</strong> {visit.height}
                    <br />
                    <strong>Weight:</strong> {visit.weight}
                    <br />
                    <strong>Blood Pressure (SYS/DIA/PUL):</strong>{" "}
                    {visit.bp.sys}/{visit.bp.dia}/{visit.bp.pul}
                    <br />
                    <strong>Doctor Notes:</strong> {visit.doctorNotes}
                    <br />
                    <strong>Test Requested:</strong> {visit.testRequested}
                    <br />
                    <strong>Test Results:</strong> {visit.testResults}
                    <br />
                    <strong>Prescriptions:</strong> {visit.prescriptions}
                    <br />
                    <strong>Diagnosis:</strong> {visit.diagnosis}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <h6>No Visit Available</h6>
        )}
      </Row>
    </Container>
  );
};

export default VisitList;
