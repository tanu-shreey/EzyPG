import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from 'react-bootstrap';
import Swal from "sweetalert2";
import { CgProfile } from "react-icons/cg";
import { FaRegSquarePlus } from "react-icons/fa6";
import { useNavigate, Link } from 'react-router-dom';

// Import pgdata.json
import pgDataFromFile from './pgdata.json';  // Adjust the path according to your file location

const AdminPanel = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // Get user data from localStorage
  const userdata = JSON.parse(localStorage.getItem("user"));
  
  // State to manage input fields for PG data
  const [input, setInput] = useState({ PGName: '', locality: '', City: '', Ratings: '' });

  // State to manage PG list, initialized with data from the JSON file
  const [pgData, setPgData] = useState([]);

  // Load PG data from the JSON file when the component mounts
  useEffect(() => {
    setPgData(pgDataFromFile);  // Load data from the JSON file into state
  }, []);

  // Function to handle adding PG data
  const handleSubmit = (e) => {
    e.preventDefault();

    const newPgData = [...pgData, input]; // Add the new PG data to existing data

    // Update state (though this won't persist in the JSON file itself)
    setPgData(newPgData);

    Swal.fire('Success', 'PG added successfully!', 'success');

    setInput({ PGName: '', locality: '', City: '', Ratings: '' }); // Reset form fields
    handleClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate('/Login');
  };

  return (
    <div className='sidebar d-flex flex-row' role='cdb-sidebar'>
      <div className='sidebar-container text-white bg-secondary p-5 w-25 text-center'>
        <div className='Sidebar-header'>
          <h1><i><CgProfile /></i></h1>
        </div>
        <div className='sidebar-nav'>
          <div><a>{userdata?.name}</a></div>
          <div><a>{userdata?.email}</a></div>
          <button className='btn m-3 mb-5'><Link to='/HeroPage' style={{ color: 'white', textDecorationLine: 'none' }}>Home</Link></button>
          <div><button className='btn' onClick={handleLogout} style={{ marginTop: '350px', background: 'white', color: 'black' }}>Logout</button></div>
        </div>
      </div>

      <div className='container2 w-75 bg-light' style={{ color: 'gray', height: '600px' }}>
        <div className='bg-white p-3 mt-5 ms-5 me-5 d-flex flex-row justify-content-between'>
          <div><h4 className='ms-2'>Add PG</h4></div>
          <div className='App'>
            <button className='btn' onClick={handleShow}><FaRegSquarePlus style={{ color: 'gray' }} fontSize={25} /></button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>Add PG</Modal.Header>
              <form className='form-control w-100' onSubmit={handleSubmit}>
                <input
                  className='form-control p-3 mt-2'
                  placeholder='PG Name'
                  id='PGName'
                  name='PGName'
                  type='text'
                  value={input.PGName}
                  onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                />
                <input
                  className='form-control p-3 mt-2'
                  placeholder='Locality'
                  id='locality'
                  name='locality'
                  type='text'
                  value={input.locality}
                  onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                />
                <input
                  className='form-control p-3 mt-2'
                  placeholder='City'
                  id='City'
                  name='City'
                  type='text'
                  value={input.City}
                  onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                />
                <input
                  className='form-control p-3 mt-2'
                  placeholder='Ratings (1-5)'
                  id='Ratings'
                  name='Ratings'
                  type='number'
                  value={input.Ratings}
                  onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                />
                <button className='btn btn-success w-100 mt-3' type='submit'>Save</button>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
