import jwtDecode from "jwt-decode";
import React from "react";

interface authContextInteface {
  user: object | null;
  signout: (callback: () => void) => void;
}

const authContext = React.createContext({} as authContextInteface);

export const useAuth = () => {
  const [user, setUser] = React.useState(CheckAuth());

  return {
    user,
    setUser,
    signout: (callback: () => void) => {
      window.localStorage.removeItem("Authorization");
      window.localStorage.removeItem("User");
      setUser(null);
      callback();
    },
  };
};

export const AuthConsumer = () => {
  return React.useContext(authContext);
};

const CheckAuth = () => {
  const token = window.localStorage.getItem("Authorization");
  if (token) {
    const decoded = jwtDecode(token) as any;
    if (decoded.exp! > Date.now() / 1000)
      return JSON.parse(window.localStorage.getItem("User")!);
  }
  window.localStorage.removeItem("Authorization");
  window.localStorage.removeItem("User");
  return null;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};
