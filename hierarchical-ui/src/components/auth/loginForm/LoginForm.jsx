import React, { useEffect, useState } from 'react';
import { findOne } from '../../../utils/mimic API calls/employee';
import { useDispatch } from 'react-redux';
import { updateCredential, updateUser } from '../../../state/slices/user';
import BasicIP from '../../input elements/basicInput/BasicIP';

const LoginForm = ({ onSubmit = () => { }, setIsValidUser = () => { } }) => {

  const dispatch = useDispatch();

  // for holding the state of the user provided credential
  const [cred, setCred] = useState({
    username: "",
    password: ""
  });

  const [disable, setDisable] = useState(false);

  // for the error state of each input field
  const [err, setErr] = useState({
    username: false,
    password: false
  });

  // to hold if the username input is blurred or not
  const [isUsernameBlurred, setIsUsernameBlurred] = useState(false);

  // setting password error state
  const setPasswordError = (value) => {
    setErr(state => {
      return { ...state, password: value }
    })
  }

  // getting the employee by username
  const getUserByUsername = async (username) => {
    try {
      const user = await findOne(username, "emailId");
      // if user is a valid user then we are dispatching the user info to the redux
      dispatch(updateUser(user));
      setIsValidUser(true);
      setErr(state => {
        return { ...state, username: false }
      })
    } catch (err) {
      dispatch(updateCredential({ user: {}, isLoggedIn: false }));
      setIsValidUser(false);
      setErr(state => {
        return { ...state, username: true }
      })
    }

  }

  // if username is blurred and has some value
  useEffect(() => {
    if (isUsernameBlurred && cred.username) {
      //  check is the user exists or not
      getUserByUsername(cred.username);
    }
  }, [cred.username, isUsernameBlurred])



  return (
    <div className='login-form-box'>
      <p className='title'>Login</p>
      {/* for username */}
      <BasicIP value={cred.username} isFocusOnLoad={!isUsernameBlurred}
        onChange={(e) => setCred(state => {
          return { ...state, username: e.target.value }
        })}
        setIsBlurred={setIsUsernameBlurred}
        errMsg='User not found'
        isErr={err.username}
        placeHolder='Please enter your username e.g. xyz.abc@pqts.com'
      />
      {/* for password */}
      <BasicIP type='password' value={cred.password} isFocusOnLoad={false}
        onChange={(e) => setCred(state => {
          return { ...state, password: e.target.value }
        })}
        errMsg="invalid password"
        isErr={err.password}
        placeHolder='Please enter your password'
      />

      <button className='login-submit-btn' disabled={disable} onClick={() => onSubmit(setPasswordError, cred.password, setDisable)}>login</button>
    </div>
  );
};

export default LoginForm;