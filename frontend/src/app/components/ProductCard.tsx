    // src/components/ProductCard.tsx
    import React from 'react';

    interface ProductCardProps {
    name: string;
    price: number;
    image?: string;
    }

    export const ProductCard: React.FC<ProductCardProps> = ({ name, price, image }) => {
    return (
        <div className="card m-2" style={{ width: '12rem' }}>
        <img
            src={image || 'https://via.placeholder.com/150'}
            className="card-img-top"
            alt={name}
        />
        <div className="card-body">
            <h6 className="card-title">{name}</h6>
            <p className="card-text">${(price ?? 0).toFixed(2)}</p>
            <button className="btn btn-primary btn-sm">Mua ngay</button>
        </div>
        </div>
    );
    };
