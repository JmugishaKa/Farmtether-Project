import React from 'react';
import api from '../services/api';

export default function FarmerDashboard({ user }) {
  const [products, setProducts] = React.useState([]);
  const [form, setForm] = React.useState({ name:'', price:0, quantity:0, category:'', description:'' });

  React.useEffect(()=>{ fetchMyProducts(); }, []);

  const fetchMyProducts = async () => {
    // fetch all and filter by farmer (backend doesn't have direct myproducts endpoint)
    const res = await api.get('/products');
    const my = res.data.filter(p => p.farmer?.id === user?.id);
    setProducts(my);
  };

  const add = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', form);
      setForm({ name:'', price:0, quantity:0, category:'', description:'' });
      fetchMyProducts();
    } catch (err) { alert(err.response?.data?.error || 'Error'); }
  };

  if (!user) return <p>Please login.</p>;
  if (user.role !== 'farmer') return <p>Access denied — farmer dashboard only</p>;

  return (
    <div>
      <h3>Farmer Dashboard</h3>
      <form onSubmit={add}>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/>
        <input placeholder="Price" type="number" value={form.price} onChange={e=>setForm({...form,price:parseFloat(e.target.value)})} required/>
        <input placeholder="Quantity" type="number" value={form.quantity} onChange={e=>setForm({...form,quantity:parseInt(e.target.value)})} required/>
        <input placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/>
        < input placeholder="Desc" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
        <button type="submit">Add Product</button>
      </form>

      <h4>My Products</h4>
      {products.map(p=>(
        <div key={p.id} style={{ border: '1px solid #eee', padding: 8, marginBottom: 6 }}>
          <div><strong>{p.name}</strong></div>
          <div>Price: ${p.price} | Qty: {p.quantity}</div>
        </div>
      ))}
    </div>
  );
}
