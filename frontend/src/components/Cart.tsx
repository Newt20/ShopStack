import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

interface CartItem {
  productId: string;
  quantity: number;
}

interface Cart {
  items: CartItem[];
}

export default function Cart() {
  const { userId } = useAuth();
  const [cart, setCart] = useState<Cart>({ items: [] });

  useEffect(() => {
    if (!userId) return;
    axios.get(`/api/cart/${userId}`)
      .then(res => setCart(res.data))
      .catch(err => console.error(err));
  }, [userId]);

  if (!userId) {
    return <p className="text-center mt-12 text-gray-600">Please login to view your cart.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Your Cart</h2>
      {cart.items.length === 0 ? (
        <p className="text-gray-600">No items in cart</p>
      ) : (
        <div className="bg-white shadow-xl rounded-xl p-8 space-y-6">
          {cart.items.map((item, i) => (
            <div key={i} className="flex justify-between items-center border-b pb-4">
              <span className="text-gray-700">Product ID: {item.productId}</span>
              <span className="font-semibold">Qty: {item.quantity}</span>
            </div>
          ))}
          <div className="text-right">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

