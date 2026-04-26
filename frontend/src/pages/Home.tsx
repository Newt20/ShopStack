import ProductList from "../components/ProductList";

export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center rounded-lg py-20">
        <h1 className="text-5xl font-extrabold tracking-tight">Discover Your Style</h1>
        <p className="mt-4 text-lg">Shop modern, elegant products with ease</p>
        <button className="mt-6 px-8 py-3 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600">
          Start Shopping
        </button>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Featured Products</h2>
        <ProductList />
      </section>
    </div>
  );
}

