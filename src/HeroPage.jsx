import React, { useState, useEffect } from 'react';
import data from './pgdata.json';  // Import data from pgdata.json
import "bootstrap/dist/css/bootstrap.min.css";
import { CgProfile } from "react-icons/cg";
import { Pagination } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const HeroPage = () => {
  const userdata = JSON.parse(localStorage.getItem("user"));
  const [filterCity, setFilterCity] = useState(''); // Store selected city filter
  const [searchTerm, setSearchTerm] = useState(''); // Store search input
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page
  const [paginationWindow, setPaginationWindow] = useState([1, 5]); // Visible pagination window
  const [pgData, setPgData] = useState([]); // State for combined data
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch PG data from localStorage and combine with pgdata.json
    const storedData = JSON.parse(localStorage.getItem('pgData')) || [];
    const combinedData = [...data, ...storedData]; // Combine pgdata.json and localStorage data
    setPgData(combinedData); // Set the combined data to state
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate('/Login');
  };

  // Define city order for sorting
  const cityOrder = ['Bangalore', 'Delhi', 'Chennai', 'Hyderabad', 'Mumbai', 'Pune'];

  // Sort PG data by city order
  const sortByCityOrder = (pgData) => {
    return pgData.sort((a, b) => {
      const cityA = cityOrder.indexOf(a.City);
      const cityB = cityOrder.indexOf(b.City);
      return cityA - cityB;
    });
  };

  // Filter and search PG data
  const filteredData = sortByCityOrder([...pgData]).filter(pg => 
    (!filterCity || pg.City.toLowerCase() === filterCity.toLowerCase()) &&
    (!searchTerm || pg.PGName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Adjust pagination window when changing pages
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);

      if (pageNumber > paginationWindow[1]) {
        setPaginationWindow([paginationWindow[0] + 1, paginationWindow[1] + 1]);
      } else if (pageNumber < paginationWindow[0]) {
        setPaginationWindow([paginationWindow[0] - 1, paginationWindow[1] - 1]);
      }
    }
  };

  // Delete PG from localStorage and update state
  const handleDeletePG = (pgName) => {
    // Retrieve existing PG data from localStorage
    const storedData = JSON.parse(localStorage.getItem('pgData')) || [];

    // Filter out the PG to be deleted
    const updatedData = storedData.filter(pg => pg.PGName !== pgName);

    // Update localStorage
    localStorage.setItem('pgData', JSON.stringify(updatedData));

    // Update the state with the updated data
    const combinedData = [...data, ...updatedData];
    setPgData(combinedData);
  };

  // Render PG data cards
  const PGData = currentItems.map((info) => (
    <div className='card mb-4' key={info.PGName} style={{ color: 'purple' }}>
      <div className='card-body'>
        <h3 className='card-title'>{info.PGName}</h3>
        <p className='card-text'>Ratings: {info.Ratings}/5</p>
        <p className='card-text'>Locality: {info.locality}</p>
        <p className='card-text'>City: {info.City}</p>

        {/* Only allow delete option for PGs stored in localStorage */}
        {JSON.parse(localStorage.getItem('pgData'))?.find(pg => pg.PGName === info.PGName) && (
          <button className='btn btn-danger mt-2' onClick={() => handleDeletePG(info.PGName)}>
            Delete PG
          </button>
        )}
      </div>
    </div>
  ));

  return (
    <div className='container-fluid'>
      <div className='row'>
        {/* Sidebar */}
        <div className='col-md-2 sidebar bg-secondary text-center text-white d-flex flex-column align-items-center' 
             style={{ height: '100vh', position: 'fixed', top: 0, left: 0, padding: '2rem', overflowY: 'auto' }}>
          <div className='Sidebar-header mb-4'>
            <h1><i><CgProfile /></i></h1>
          </div>
          <div className='sidebar-nav mb-4'>
            <p className='lead'>{userdata?.name}</p>
            <p>{userdata?.email}</p>
            <button className='btn m-3 mb-2 '><Link to='/AdminPanel' style={{ color: 'white', textDecoration: 'none' }}>Account</Link></button>
            <button className='btn m-3 mt-2 mb-2 '><Link to='/AddPG' style={{ color: 'white', textDecoration: 'none' }}>Add PG</Link></button>
            <button className='btn m-4 mt-2 mb-5 '><Link to='/AdminPanel' style={{ color: 'white', textDecoration: 'none' }}>Settings</Link></button>
            <button className='btn btn-light mt-5' onClick={handleLogout}>Logout</button>
          </div>
        </div>

        {/* Main Content */}
        <div className='col-md-10 offset-md-2 p-4'>
          {/* Search Bar */}
          <div className='mb-3'>
            <input 
              type='text' 
              className='form-control' 
              placeholder='Search by PG name...' 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>

          {/* City Filter Buttons */}
          <div className='mb-3'>
            <button style={{ color: 'purple' }} className='btn border mx-2' onClick={() => setFilterCity('')}>All Cities</button>
            <button style={{ color: 'purple' }} className='btn border mx-2' onClick={() => setFilterCity('Bangalore')}>Bangalore</button>
            <button style={{ color: 'purple' }} className='btn border mx-2' onClick={() => setFilterCity('Delhi')}>Delhi</button>
            <button style={{ color: 'purple' }} className='btn border mx-2' onClick={() => setFilterCity('Chennai')}>Chennai</button>
            <button style={{ color: 'purple' }} className='btn border mx-2' onClick={() => setFilterCity('Hyderabad')}>Hyderabad</button>
            <button style={{ color: 'purple' }} className='btn border mx-2' onClick={() => setFilterCity('Mumbai')}>Mumbai</button>
            <button style={{ color: 'purple' }} className='btn border mx-2' onClick={() => setFilterCity('Pune')}>Pune</button>
          </div>

          {/* PG Data Cards */}
          <div>{PGData}</div>

          {/* Pagination */}
          <div className='d-flex justify-content-between mt-4'>
            <button 
              className='btn btn-secondary' 
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <Pagination>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(paginationWindow[0] - 1, paginationWindow[1])
                .map(pageNumber => (
                  <Pagination.Item 
                    key={pageNumber}
                    active={pageNumber === currentPage}
                    onClick={() => paginate(pageNumber)}
                  >
                    {pageNumber}
                  </Pagination.Item>
                ))
              }
            </Pagination>

            <button 
              className='btn btn-secondary' 
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
