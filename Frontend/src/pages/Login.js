import React from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login({ onAuth }) {
  const [form, setForm] = React.useState({ phone:'', password:'' });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      onAuth(res.data.user);
      nav('/');
    } catch (err) {
      alert(err.response?.data?.error || 'Login error');
    }
  };

  return (
    <form onSubmit={submit}>
      <h3>Login</h3>
      <div><input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} required/></div>
      <div><input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required/></div>
      <button type="submit">Login</button>
    </form>
  );
}
