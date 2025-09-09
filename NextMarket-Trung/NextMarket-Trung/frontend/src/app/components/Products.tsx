import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { Product } from "./types";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Danh sách sản phẩm</h1>
      {products.length === 0 ? (
        <p>Không có sản phẩm nào</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="border rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <p className="text-gray-600">{p.short_description}</p>
              <p className="text-blue-600 font-bold mt-2">
                {p.base_price ? `$${p.base_price}` : "Liên hệ"}
              </p>
              <span className="text-sm text-gray-400">
                {p.status || "inactive"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
