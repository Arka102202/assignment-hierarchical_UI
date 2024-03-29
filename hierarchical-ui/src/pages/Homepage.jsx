import React from 'react';
import CEOTab from '../components/tabs/CEOTab/CEOTab';
import Header from '../components/header/Header';
import { useLocation, useNavigate } from 'react-router-dom';

const Homepage = () => {

  const navigate = useNavigate();
  const {pathname} = useLocation();
  return (
    <div className='home-page-box'>
      <Header />
      {pathname  === "/" && <button className='all-emp-btn' onClick={() => navigate("/allEmployees")}>All Employees</button>}
      <CEOTab />
    </div>
  );
};

export default Homepage;