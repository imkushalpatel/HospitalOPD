import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import PatientList from "../Patients/PatientList";
import VisitList from "../Visits/VisitList";
import { useAuth } from "../../AuthContext";

const DoctorDashboard = () => {
  const { user } = useAuth();
  return (
    <Container>
      <h2>{user.role.toUpperCase()} Dashboard</h2>

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
