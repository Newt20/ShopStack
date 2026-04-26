import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./components/Cart";
import Register from "./pages/Register";
import ProductList from "./components/ProductList";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
	  <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
	  <Route path="/products" element={<ProductList />} />
        </Routes>
      </main>
    </div>
  );
}

