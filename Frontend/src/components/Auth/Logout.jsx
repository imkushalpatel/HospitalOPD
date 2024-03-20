import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useAuth();

  useEffect(() => {
    setIsLoggedIn(false);
    setUser({});
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate, setIsLoggedIn, setUser]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
