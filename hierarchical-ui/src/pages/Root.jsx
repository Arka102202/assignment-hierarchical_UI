import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux"
import { findOne } from '../utils/mimic API calls/employee';
import { Outlet } from 'react-router-dom';
import LoginForm from '../components/auth/loginForm/LoginForm';
import { updateIsLoggedIn } from '../state/slices/user';

const Root = () => {

  const {user, isLoggedIn} = useSelector(state => state.userState);
  const [isValidUser, setIsValidUser] = useState(false);
  const dispatch = useDispatch();

  // get the user by Id and if it finds the user and sets isValidUser to true or else false
  const getUserById = async (userId) => {
    try{
      await findOne(userId, "_id");
      setIsValidUser(true);
    }catch(err) {
      setIsValidUser(false);
      localStorage.setItem("isLoggedIn", false);
      localStorage.setItem("user", JSON.stringify({}));
    }
  }

  // this is the onSubmit function which is get executed when user click in the login button
  const onSubmit = (setPasswordError = () => {}, userProvidedPassword) => {
    if(isValidUser && userProvidedPassword === user.password){
      dispatch(updateIsLoggedIn(true));
      setPasswordError(false);
    }else setPasswordError(true);
  }

  
  useEffect(() => {
    if(!isValidUser && isLoggedIn && Object.entries(user).length !== 0){
      getUserById(user._id);
    }
  }, [isLoggedIn, isValidUser, user])


  if(isLoggedIn && Object.entries(user).length !== 0 && isValidUser) return <Outlet />

  return (
    <div className='root-page-box'>
      <LoginForm setIsValidUser={setIsValidUser} onSubmit={onSubmit}/>
    </div>
  );
};

export default Root;