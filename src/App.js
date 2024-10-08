import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FrontPage from './FrontPage';
import Login from './Login';
import Register from './Register'
import AdminPanel from './AdminPanel';
import HeroPage from './HeroPage';
import AddPG from './Component/AddPG'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/HeroPage" element={<HeroPage/>} />
        <Route path="/AdminPanel" element={<AdminPanel/>} />
        <Route path='/HeroPage' element={<HeroPage />} /> 
        <Route path='/Component/AddPG' element={<AddPG />} /> 

      </Routes>
    </BrowserRouter>
  );
};

export default App;
