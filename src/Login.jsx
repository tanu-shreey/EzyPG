import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link } from 'react-router-dom';
import HeroPage from './HeroPage';
const Login = () => {
  const [input, setInput] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const logedUser = JSON.parse(localStorage.getItem('user'));
    localStorage.setItem('loggedin', JSON.stringify(true));

    if (input.email === logedUser.email && input.password === logedUser.password) {
      navigate('/HeroPage', { replace: 'true' });
    } else {
      alert('Invalid data!');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="border bg-light p-4 shadow-lg rounded" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="text-center mb-4">
          <h3>Login</h3>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              className="form-control"
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              value={input.email}
              onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            />
          </div>
          <button type="submit" className="btn w-100 text-white bg-secondary">
            Login
          </button>
          <p className="mt-3 text-center" style={{ fontSize: '12px' }}>
            Don't have an account? <Link to="/Register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
