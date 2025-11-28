import React from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

export default function SellerDashboard({ user }) {
  const [products, setProducts] = React.useState([]);
  const [cart, setCart] = React.useState([]);

  React.useEffect(()=>{ fetchProducts(); }, []);

  const fetchProducts = async () => {
    const res = await api.get('/products');
    setProducts(res.data);
  };

  const onBuy = (p) => {
    const qty = parseInt(prompt(`Quantity to buy (available ${p.quantity})`, '1'));
    if (!qty || qty <= 0) return;
    if (qty > p.quantity) return alert('Not enough stock');
    setCart(prev => [...prev, { productId: p.id, name: p.name, price: p.price, quantity: qty }]);
  };

  const placeOrder = async () => {
    if (cart.length === 0) return alert('Cart empty');
    try {
      const res = await api.post('/orders', { items: cart.map(i=>({ productId: i.productId, quantity: i.quantity })), deliveryAddress: user.location || 'N/A' });
      alert('Order placed: ' + res.data.orderId);
      setCart([]);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.error || 'Order failed');
    }
  };

  if (!user) return <p>Please login.</p>;
  if (user.role !== 'seller') return <p>Access denied — seller dashboard only</p>;

  return (
    <div>
      <h3>Marketplace</h3>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 2 }}>
          {products.map(p => <ProductCard key={p.id} p={p} onBuy={onBuy} />)}
        </div>
        <div style={{ flex: 1 }}>
          <h4>Cart</h4>
          {cart.map((c, i) => <div key={i}>{c.name} x {c.quantity} = ${c.quantity * c.price}</div>)}
          <div><strong>Total: ${cart.reduce((s, c) => s + c.price * c.quantity, 0)}</strong></div>
          <button onClick={placeOrder} disabled={cart.length===0}>Place Order</button>
        </div>
      </div>
    </div>
  );
}
