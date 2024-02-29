import { createContext, useState } from "react";
import { Auth } from "../models/Auth.model";
import { User } from "../models/User.model";

const AuthContext = createContext<Auth>({
  user: undefined,
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const login = (credentials: User) => {
    // Perform authentication logic
    setUser(credentials);
  };

  const logout = () => {
    setUser(undefined);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };