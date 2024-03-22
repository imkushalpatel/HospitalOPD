import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import authService from "../../services/authService";

const Logout = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useAuth();

  useEffect(() => {
    const logout = async () => {
      try {
        authService.logout();
        setTimeout(() => {
          setIsLoggedIn(false);
          setUser({});
          localStorage.clear();
          navigate("/login");
        }, 2000);
      } catch (error) {
        console.error("Error Logging Out", error);
      }
    };
    logout();
  }, [navigate, setIsLoggedIn, setUser]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
