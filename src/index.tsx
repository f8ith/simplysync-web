import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";
import * as React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { App } from "./routes/App";
import reportWebVitals from "./reportWebVitals";
import ClassView from "./routes/ClassView";
import Settings from "./routes/Settings";
import Login from "./routes/Login";
import * as serviceWorker from "./serviceWorker";
import { AdminOnly, NoAuth, RequireAuth } from "./components/Auth";
import { AuthProvider } from "./hooks/useAuth";
import { createClient, Provider } from "urql";
import EditProfile from "./routes/EditProfile";

const client = createClient({
  url: process.env.REACT_APP_API_ENDPOINT! + "/graphql",
  fetchOptions: {
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("Authorization")!,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Provider value={client}>
          <AuthProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <App />
                  </RequireAuth>
                }
              >
                <Route
                  path="admin"
                  element={
                    <AdminOnly>
                      <Outlet />
                    </AdminOnly>
                  }
                >
                  <Route index element={<ClassView />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Route>
              <Route
                path="/login"
                element={
                  <NoAuth>
                    <Login />
                  </NoAuth>
                }
              />
              <Route
                path="/profile/edit"
                element={
                  <RequireAuth>
                    <EditProfile />
                  </RequireAuth>
                }
              />
            </Routes>
          </AuthProvider>
        </Provider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
