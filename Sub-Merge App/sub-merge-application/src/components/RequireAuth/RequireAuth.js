import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

export default function RequireAuth({ children }) {
  let location = useLocation();
  let token = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    if (token) {
      let tokenExpiration = jwtDecode(token).exp;
      let dateNow = new Date();

      if (tokenExpiration < dateNow.getTime() / 1000) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  if (isAuthenticated === false) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
