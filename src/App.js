import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import ShoppingCartProvider from "../src/Components/Context/ShoppingCartContext";
import Home from "./Components/Home";
import Navbar from "./Components/NavBar";
const App = () => {
  return (
    <ShoppingCartProvider>
      <Navbar/>
      <Container className="mb-4">
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        </BrowserRouter>
      </Container>
    </ShoppingCartProvider>
  );
};

export default App;