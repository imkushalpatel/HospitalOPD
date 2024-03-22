import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import authService from "../../services/authService";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "nurse",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const [alert, setAlert] = useState({
    type: null,
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.register(formData);
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
      <h2>Register</h2>
      {alert.message && <Alert variant={alert.type}>{alert.message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formRole">
          <Form.Label>Role:</Form.Label>
          <Form.Control
            as="select"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="doctor">Doctor</option>
            <option value="nurse">Nurse</option>
            <option value="intern-nurse">Intern Nurse</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
