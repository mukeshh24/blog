import React from "react";
import { Button } from "./components/ui/button";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WebsiteLayout from "./layouts/WebsiteLayout";
import IndexPage from "./pages/IndexPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WebsiteLayout />}>
            <Route index element={<IndexPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
