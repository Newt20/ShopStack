import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export default function (){
  const { userId } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const addToCart = async (productId: string) => {
    if (!userId) {
      alert("Please login first!");
      return;
    }
    await axios.post("/api/cart/add", { userId, productId, quantity: 1 });
    alert("Added to cart!");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {products.map(p => (
        <div key={p._id} className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition">
          {p.image && <img src={p.image} alt={p.name} className="w-full h-40 object-cover rounded-md mb-4" />}
          <h3 className="text-lg font-semibold">{p.name}</h3>
          <p className="text-gray-600">{p.description}</p>
          <p className="text-blue-600 font-bold mt-2">${p.price}</p>
          <button
            onClick={() => addToCart(p._id)}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

