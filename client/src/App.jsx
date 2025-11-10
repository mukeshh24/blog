import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WebsiteLayout from "./layouts/WebsiteLayout";
import IndexPage from "./pages/IndexPage";
import { IndexRoute, SignInRoute, SignUpRoute } from "./routers/WebsiteRoutes";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={IndexRoute} element={<WebsiteLayout />}>
            <Route index element={<IndexPage />} />
          </Route>
          <Route path={SignInRoute} element={<SignInPage />} />
          <Route path={SignUpRoute} element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
