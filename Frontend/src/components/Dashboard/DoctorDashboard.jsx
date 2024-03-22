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
        {user.role == "doctor" && <Link to="/register">Create User</Link>}
        {user.permission.patient.insert && (
          <Link to="/add-patient">Add Patient</Link>
        )}
        {user.permission.visit.insert && <Link to="/add-visit">Add Visit</Link>}
      </Row>

      {user.permission.patient.view && (
        <Row>
          <Col>
            <PatientList isDashboard />
          </Col>
        </Row>
      )}
      {user.permission.visit.view && (
        <Row>
          <Col>
            <VisitList isDashboard />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default DoctorDashboard;
