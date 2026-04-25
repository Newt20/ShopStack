import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./components/Cart";
import Register from "./pages/Register";
import ProductList from "./components/ProductList";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { userId } = useAuth(); 

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home userId={userId} />} />
          <Route path="/login" element={<Login />} />
	  <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart userId={userId} />} />
	  <Route path="/products" element={<ProductList />} />
        </Routes>
      </main>
    </div>
  );
}

