// AddPG.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPG = () => {
  const [pgName, setPgName] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('');
  const [ratings, setRatings] = useState('');
  const navigate = useNavigate();

  const handleAddPG = () => {
    const newPG = {
      PGName: pgName,
      locality: locality,
      City: city,
      Ratings: ratings,
    };

    // Retrieve existing PG data from localStorage or initialize an empty array
    const pgData = JSON.parse(localStorage.getItem('pgData')) || [];
    
    // Add new PG data to the array and save it back to localStorage
    pgData.push(newPG);
    localStorage.setItem('pgData', JSON.stringify(pgData));

    // Redirect to the HeroPage or another page after adding the PG
    navigate('/HeroPage');
  };

  return (
    <div className="container mt-5">
      <h2>Add New PG</h2>
      <div className="form-group">
        <label>PG Name</label>
        <input
          type="text"
          className="form-control"
          value={pgName}
          onChange={(e) => setPgName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Locality</label>
        <input
          type="text"
          className="form-control"
          value={locality}
          onChange={(e) => setLocality(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>City</label>
        <input
          type="text"
          className="form-control"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Ratings</label>
        <input
          type="number"
          className="form-control"
          value={ratings}
          onChange={(e) => setRatings(e.target.value)}
          required
        />
      </div>
      <button className="btn btn-primary mt-3" onClick={handleAddPG}>
        Add PG
      </button>
    </div>
  );
};

export default AddPG;
