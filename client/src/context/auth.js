import { useState, useContext, useEffect, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: "" });

  //default axios headers
  axios.defaults.headers.common["auth-token"] = auth?.token;

  useEffect((e) => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsedData = JSON.parse(data);
      setAuth({ ...auth, user: parsedData.user, token: parsedData.authtoken });
    } // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

//custom hooks
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
