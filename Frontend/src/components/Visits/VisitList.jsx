import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import visitService from "../../services/visitService";

const VisitList = () => {
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const response = await visitService.getAllVisits();
        setVisits(response);
      } catch (error) {
        console.error("Error fetching visits:", error);
      }
    };
    fetchVisits();
  }, []);

  return (
    <Container>
      <h2>Visit List</h2>
      <Row>
        {visits.map((visit) => (
          <Col key={visit._id} md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Patient: {visit.patientName}</Card.Title>
                {/* Add more visit details here */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default VisitList;
