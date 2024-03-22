import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import authService from "../../services/authService";

const Users = ({}) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await authService.getAllUsers();

        setUsers(response);
      } catch (error) {
        console.error("Error fetching userss:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await authService.deleteUser(id);
      const updatedUsers = users.filter((user) => user._id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting User:", error);
    }
  };

  return (
    <Container>
      <h2> Users List</h2>
      <Row>
        {users.length ? (
          users.map((user) => (
            <Col key={user._id} md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    <Row>
                      <Col>{user.username}</Col>
                      <Col xs="auto">
                        <Button
                          variant="link"
                          onClick={() => handleDelete(user._id)}
                        >
                          <BsTrash />
                        </Button>
                      </Col>
                    </Row>
                  </Card.Title>
                  <Card.Text>
                    <strong>Role:</strong> {user.role}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <h6>No User Available</h6>
        )}
      </Row>
    </Container>
  );
};

export default Users;
