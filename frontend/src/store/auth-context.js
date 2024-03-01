import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  id: "",
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialId = localStorage.getItem("id");
  const [token, setToken] = useState(initialToken);
  const [id, setId] = useState(initialId);

  const userIsLoggedIn = !!token;

  const loginHandler = (token, id) => {
    setToken(token);
    setId(id);

    localStorage.setItem("token", token);
    localStorage.setItem("id", id);

    // console.log(id);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  };

  const contextValue = {
    token: token,
    id: id,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
