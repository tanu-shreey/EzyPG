import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Store value in local storage
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(input));
    navigate('/Login', { replace: true });
  };

  return (
    <div className='container d-flex align-items-center justify-content-center vh-100'>
      <div className='col-12 col-sm-8 col-md-6 col-lg-4 border bg-light p-4'>
        <div className='text-center mb-4'>
          <h3>Create Account</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <input
              className='form-control'
              id='name'
              type='text'
              placeholder='Name'
              name='name'
              value={input.name}
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className='mb-3'>
            <input
              className='form-control'
              id='email'
              type='email'
              placeholder='Email'
              name='email'
              value={input.email}
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className='mb-3'>
            <input
              className='form-control'
              id='password'
              type='password'
              placeholder='Password'
              name='password'
              value={input.password}
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
          </div>
          <button
            className='btn btn-secondary w-100'
            type='submit'
           
          >
            Register
          </button>
        </form>
        <p className='text-center mt-3' style={{ fontSize: '12px' }}>
          Already have an account? <Link to='/Login'>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
