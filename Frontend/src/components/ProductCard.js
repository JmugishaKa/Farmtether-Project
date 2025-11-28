import React from 'react';

export default function ProductCard({ p, onBuy }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: 10, marginBottom: 8 }}>
      <h4>{p.name}</h4>
      <div>Farmer: {p.farmer?.name || '—'}</div>
      <div>Category: {p.category}</div>
      <div>Price: ${p.price} | Qty: {p.quantity}</div>
      <div>{p.description}</div>
      {onBuy && <button onClick={() => onBuy(p)}>Buy</button>}
    </div>
  );
}
