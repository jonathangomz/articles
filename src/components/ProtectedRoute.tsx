import { ReactNode, useContext } from "react";
import { AuthContext } from "../context/Auth.context";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};


export default ProtectedRoute;