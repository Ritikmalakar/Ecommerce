import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div>
      <img src={product?.image} alt={product?.name} className="product" />

      <div>
        <h3>{product?.name}</h3>

        <p>${Number(product?.price || 0).toFixed(2)}</p>

        <Link to={`/product/${product?._id}`}>View Details</Link>
      </div>
    </div>
  );
}
