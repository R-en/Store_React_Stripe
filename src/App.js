import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./Components/Navbar";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartProvider from "./CardContext";
import Store from "./Pages/Store";
import Success from "./Pages/Success";
import Cancel from "./Pages/Cancel";

function App() {
  return (
    <CartProvider>
      <Container>
        <NavbarComponent></NavbarComponent>
        <BrowserRouter>
          <Routes>
            <Route index element={<Store />}></Route>
            <Route path="success" element={<Success />}></Route>
            <Route path="cancel" element={<Cancel />}></Route>
          </Routes>
        </BrowserRouter>
      </Container>
    </CartProvider>
  );
}

export default App;
