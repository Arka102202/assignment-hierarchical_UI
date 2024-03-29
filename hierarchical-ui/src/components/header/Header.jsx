import React from 'react';
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {

  const user = useSelector(state => state.userState.user);
  const navigate = useNavigate();
  const {pathname} = useLocation();

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  }

  return (
    <div className='header-box'>
      <p className='title'>Hierarcical UI</p>
      {/* {pathname  === "/" && <button className='all-emp-btn' onClick={() => navigate("/allEmployees")}>All Employees</button>} */}
      <div className='acc-info'>
        <p>{user.name}</p>
        <button className='sign-out-btn' onClick={logOut}>Sign out</button>
      </div>
    </div>
  );
};

export default Header;