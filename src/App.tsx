import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./pages/home/Home";
import { Favorites } from "./pages/favorites/Favorites";
import { Details } from "./pages/details/Details";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/details/:specieId" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
