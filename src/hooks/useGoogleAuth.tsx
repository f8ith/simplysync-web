import React from "react";
import { useGoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";

interface googleAuthContextInteface {
  gSignIn: () => void;
}

const googleAuthContext = React.createContext({} as googleAuthContextInteface);

export const useGoogleAuth = () => {
  const navigate = useNavigate();
  const onSuccess = async (gRes: any) => {
    let response;

    try {
      response = await fetch(
        process.env.REACT_APP_API_ENDPOINT! + "/auth/google",
        {
          method: "POST",
          body: JSON.stringify({ token: gRes.tokenId }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err: any) {
      throw err;
    }

    if (response?.ok) {
      const { token, data } = await response.json();
      window.localStorage.setItem("Authorization", token);
      window.localStorage.setItem("User", JSON.stringify(data));
      if (response.status == 201) navigate("/profile/edit");
      else if (response.status == 200) navigate("/");
    }
  };

  const onFailure = (res: any) => {
    throw res.error;
  };

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID!;

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
  });

  return {
    gSignIn: signIn,
  };
};

export const GoogleAuthConsumer = () => {
  return React.useContext(googleAuthContext);
};

export const GoogleAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const googleAuth = useGoogleAuth();

  return (
    <googleAuthContext.Provider value={googleAuth}>
      {children}
    </googleAuthContext.Provider>
  );
};
