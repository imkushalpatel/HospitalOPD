import { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import patientService from "../../services/patientService";
import visitService from "../../services/visitService";
import { useParams, useNavigate } from "react-router-dom";

const AddVisitForm = () => {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    bp: { sys: "", dia: "", pul: "" },
    doctorNotes: "",
    testRequested: "",
    testResults: "",
    prescriptions: "",
    diagnosis: "",
    patient: patientId || "",
  });
  const [alert, setAlert] = useState({
    type: null,
    message: "",
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const fetchedPatients = await patientService.getAllPatients();
        setPatients(fetchedPatients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    if (!patientId) {
      fetchPatients();
    } else {
      const fetchPatient = async () => {
        try {
          const fetchedPatient = await patientService.getPatient(patientId);
          setPatients([fetchedPatient]);

          setFormData({
            ...formData,
            patient: fetchedPatient._id,
          });
        } catch (error) {
          console.error("Error fetching patient:", error);
        }
      };
      fetchPatient();
    }
  }, [patientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "sys" || name === "dia" || name === "pul") {
      setFormData({
        ...formData,
        bp: {
          ...formData.bp,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await visitService.addVisit(formData);
      setAlert({ type: "success", message: response.message });
      setTimeout(() => {
        setAlert({ type: null, message: "" });
        navigate(-1);
      }, 3000);
    } catch (error) {
      setAlert({ type: "danger", message: error.response.data.message });
    }
  };

  return (
    <div>
      <h2>Add Visit</h2>
      {alert.message && <Alert variant={alert.type}>{alert.message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formPatient">
          <Form.Label>Patient:</Form.Label>
          <Form.Control
            as="select"
            name="patient"
            value={formData.patient}
            onChange={handleChange}
            disabled={!!patientId} // Disable the dropdown if patientId is received
          >
            <option value="">Select Patient</option>
            {patients.map((patient) => (
              <option key={patient._id} value={patient._id}>
                {patient.firstname} {patient.lastname}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formHeight">
          <Form.Label>Height:</Form.Label>
          <Form.Control
            type="text"
            name="height"
            value={formData.height}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formWeight">
          <Form.Label>Weight:</Form.Label>
          <Form.Control
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBPSys">
          <Form.Label>Blood Pressure (Systolic):</Form.Label>
          <Form.Control
            type="text"
            name="sys"
            value={formData.bp.sys}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBPDia">
          <Form.Label>Blood Pressure (Diastolic):</Form.Label>
          <Form.Control
            type="text"
            name="dia"
            value={formData.bp.dia}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBPPul">
          <Form.Label>Blood Pressure (Pulse):</Form.Label>
          <Form.Control
            type="text"
            name="pul"
            value={formData.bp.pul}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formDoctorNotes">
          <Form.Label>Doctor's Notes:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="doctorNotes"
            value={formData.doctorNotes}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formTestRequested">
          <Form.Label>Tests Requested:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="testRequested"
            value={formData.testRequested}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formTestResults">
          <Form.Label>Test Results:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="testResults"
            value={formData.testResults}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formPrescriptions">
          <Form.Label>Prescriptions:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="prescriptions"
            value={formData.prescriptions}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formDiagnosis">
          <Form.Label>Diagnosis:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Visit
        </Button>
      </Form>
    </div>
  );
};

export default AddVisitForm;
