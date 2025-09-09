// src/components/LandingPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/productService";
import { Product } from "./types";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data.slice(0, 3)); // chỉ lấy 3 sản phẩm preview
      } catch (err) {
        console.error("Error loading products", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="bg-dark text-white text-center p-10">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Shop</h1>
        <p className="text-lg mb-6">
          Discover amazing products at the best prices
        </p>
        <button
          onClick={() => navigate("/auth")}
          className="bg-white text-primary font-bold py-2 px-6 rounded-lg hover:bg-gray-200"
        >
          Get Started
        </button>
      </section>

      {/* Features */}
      <section className="p-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="shadow p-6 rounded-lg">
          <h3 className="font-bold text-xl mb-2">Fast Delivery</h3>
          <p>Get your products delivered in no time.</p>
        </div>
        <div className="shadow p-6 rounded-lg">
          <h3 className="font-bold text-xl mb-2">Best Quality</h3>
          <p>We provide only top quality products.</p>
        </div>
        <div className="shadow p-6 rounded-lg">
          <h3 className="font-bold text-xl mb-2">Great Prices</h3>
          <p>Affordable prices for everyone.</p>
        </div>
      </section>

      {/* Product Preview */}
      <section className="p-10">
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        {products.length === 0 ? (
          <p>No products yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="border rounded-lg p-4 shadow hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="text-gray-600">{p.short_description}</p>
                <p className="text-blue-600 font-bold mt-2">
                  {p.base_price ? `$${p.base_price}` : "Contact us"}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center p-4 mt-10">
        <p>&copy; {new Date().getFullYear()} My Shop. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
