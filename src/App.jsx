import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { IndexRoute, SignInRoute, SignUpRoute } from "./routes/UrlRoutes";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={IndexRoute} element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>

          <Route path={SignInRoute} element={<SignIn />} />
          <Route path={SignUpRoute} element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
