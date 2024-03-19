// src/components/Dashboard/InternNurseDashboard.jsx

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import patientService from '../../services/patientService';

const InternNurseDashboard = () => {
    const [patientsAddedToday, setPatientsAddedToday] = useState([]);

    useEffect(() => {
        // Fetch patients added today for the intern nurse
        const fetchPatientsAddedToday = async () => {
            try {
                const response = await patientService.getPatientsAddedToday();
                setPatientsAddedToday(response);
            } catch (error) {
                console.error('Error fetching patients added today:', error);
            }
        };
        fetchPatientsAddedToday();
    }, []);

    return (
        <Container>
            <h2>Intern Nurse Dashboard</h2>
            <Row>
                {patientsAddedToday.map((patient) => (
                    <Col key={patient._id} md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Patient: {patient.name}</Card.Title>
                                {/* Add more patient details here */}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default InternNurseDashboard;
