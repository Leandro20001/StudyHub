import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function login(email, password) {
    console.log("LOGIN:", email);
    setUser({ email });
  }

  function signUp(email, password) {
    console.log("SIGNUP:", email);
    setUser({ email });
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}