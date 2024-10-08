import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import image from './Component/Images/EzyPG.png';
import { useNavigate } from 'react-router-dom';

const FrontPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Login'); // navigate to the Login page
  };

  return (
    <div>
      <div>
        <button
          className='btn bg-secondary text-white me-5'
          onClick={handleClick}
          style={{ float: 'right' }}
        >
          Login
        </button>
      </div>
      <div className='bg-white text-center mt-5'>
        <img className='w-25 mt-5 pt-5' src={image} alt='Logo' />
      </div>
    </div>
  );
};

export default FrontPage;





