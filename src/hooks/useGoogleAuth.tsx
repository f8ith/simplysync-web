import jwtDecode from "jwt-decode";
import React from "react";

interface googleAuthContextInteface {
  gSignin: (
    tokenId: string,
    callback: (response: Response | undefined, error: Error | null) => void
  ) => void;
}

const authContext = React.createContext({} as googleAuthContextInteface);

export const useGoogleAuth = () => {
  return {
    gSignin: async (
      tokenId: string,
      callback: (response: Response | undefined, error: Error | null) => void
    ) => {
      let error = null;
      let response;

      try {
        response = await fetch("/auth/google", {
          method: "POST",
          body: JSON.stringify({ token: tokenId }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (err: any) {
        error = err;
      }

      if (response?.ok) {
        const { token } = await response.json();
        window.localStorage.setItem("Authorization", token);
        const decoded = jwtDecode(token) as any;
        window.localStorage.setItem("User", decoded.data);
      }

      callback(response, error);
    },
  };
};

export const GoogleAuthConsumer = () => {
  return React.useContext(authContext);
};

export const GoogleAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const googleAuth = useGoogleAuth();

  return (
    <authContext.Provider value={googleAuth}>{children}</authContext.Provider>
  );
};
