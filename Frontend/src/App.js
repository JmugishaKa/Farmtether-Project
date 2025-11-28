import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import FarmerDashboard from './pages/FarmerDashboard';
import SellerDashboard from './pages/SellerDashboard';
import api from './services/api';

function App() {
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')||'null'));

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <BrowserRouter>
      <nav style={{ padding: 10, borderBottom: '1px solid #ddd' }}>
        <Link to="/" style={{ marginRight: 10 }}>Home</Link>
        {!user && <><Link to="/register" style={{ marginRight:10}}>Register</Link><Link to="/login">Login</Link></>}
        {user && user.role === 'farmer' && <Link to="/farmer" style={{ marginRight:10}}>Farmer</Link>}
        {user && user.role === 'seller' && <Link to="/seller" style={{ marginRight:10}}>Seller</Link>}
        {user && <button onClick={logout}>Logout</button>}
      </nav>
      <div style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<div><h2>FarmTether Demo</h2><p>Simple marketplace to link farmers & buyers</p></div>} />
          <Route path="/register" element={<Register onAuth={setUser} />} />
          <Route path="/login" element={<Login onAuth={setUser} />} />
          <Route path="/farmer" element={<FarmerDashboard user={user} />} />
          <Route path="/seller" element={<SellerDashboard user={user} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
