// src/components/ProductList.tsx
import React, { useEffect, useState } from 'react';
import { ProductCard } from './ProductCard';

interface Product {
  id: number;
  uuid: string;
  name: string;
  price: number;
  image?: string;
}

export const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/products', {
      credentials: 'include', // ⚡ gửi cookie session kèm request
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || 'Unauthorized');
        }
        return res.json();
      })
      .then((result) => {
        setProducts(result.data); // 👈 backend trả về { message, total, data }
      })
      .catch((err) => console.error('Fetch products error:', err));
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-6 col-md-3">
            <ProductCard
              name={product.name}
              price={product.price}
              image={product.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
