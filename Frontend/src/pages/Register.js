import React from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register({ onAuth }) {
  const [form, setForm] = React.useState({ name:'', phone:'', password:'', role:'farmer' });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      onAuth(res.data.user);
      nav('/');
    } catch (err) {
      alert(err.response?.data?.error || 'Error');
    }
  };

  return (
    <form onSubmit={submit}>
      <h3>Register</h3>
      <div><input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/></div>
      <div><input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} required/></div>
      <div><input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required/></div>
      <div>
        <select value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
          <option value="farmer">Farmer</option>
          <option value="seller">Seller</option>
        </select>
      </div>
      <button type="submit">Register</button>
    </form>
  );
}
