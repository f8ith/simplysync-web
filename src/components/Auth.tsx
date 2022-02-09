import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "urql";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { decode } from "querystring";

interface authContextInteface {
  user: string | null;
  url: string;
  signin: (
    email: string,
    password: string,
    callback: (response: Response | undefined, error: Error | null) => void
  ) => void;
  signout: (callback: () => void) => void;
}

const authContext = React.createContext({} as authContextInteface);

export const useAuth = () => {
  const [user, setUser] = React.useState(CheckAuth());
  const [url, setUrl] = React.useState("http://localhost:4000");

  return {
    user,
    url,
    setUrl,
    signin: async (
      email: string,
      password: string,
      callback: (response: Response | undefined, error: Error | null) => void
    ) => {
      let error = null;
      let response;

      try {
        response = await fetch("http://localhost:4000/gettoken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer",
          credentials: "same-origin",
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
      } catch (err: any) {
        error = err;
      }

      if (response?.ok) {
        window.localStorage.setItem("Authorization", await response.text());
      }

      callback(response, error);
    },
    signout: (callback: () => void) => {
      window.localStorage.removeItem("Authorization");
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
    if (decoded.exp! > Date.now() / 1000) return decoded.name;
  }
  window.localStorage.removeItem("Authorization");
  return null;
};

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  let { user } = useAuth();
  let location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export const NoAuth = ({ children }: { children: JSX.Element }) => {
  let { user } = useAuth();
  let location = useLocation();

  if (user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};
