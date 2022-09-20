import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
function App() {
  const [pulls, setPulls] = useState({});
  const [clickedCampaign, setClickedCampaign] = useState();

  return (
    <div>
      <Navbar />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home
                  pulls={pulls}
                  setPulls={setPulls}
                  setClickedCampaign={setClickedCampaign}
                />
              }
            />
            <Route
              path="/campaigns/:id"
              element={
                <Dashboard pulls={pulls} campaignName={clickedCampaign} />
              }
            />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
