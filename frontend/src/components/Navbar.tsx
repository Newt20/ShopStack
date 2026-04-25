import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { userId, setUserId } = useAuth();

  const handleLogout = () => {
    setUserId(null); // clear logged-in user
    alert("Logged out successfully");
  };

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-2xl font-extrabold text-blue-600 tracking-tight">MyStore</h1>
      <div className="flex space-x-6 items-center text-gray-700 font-medium">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/cart" className="hover:text-blue-600">Cart</Link>
        {!userId ? (
          <Link to="/login" className="hover:text-blue-600">Login</Link>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

