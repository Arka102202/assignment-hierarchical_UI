import React, { useEffect, useState } from 'react';
import TextIP from '../../input elements/textInput/TextIP';
import { findOne } from '../../../utils/mimic API calls/employee';
import { useDispatch } from 'react-redux';
import { updateCredential, updateUser } from '../../../state/slices/user';

const LoginForm = ({onSubmit = () => {}, setIsValidUser = () => {}}) => {

  const dispatch = useDispatch();

  // for holding the state of the user provided credential
  const [cred, setCred] = useState({
    username: "",
    password: ""
  });

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
      return {...state, password: value}
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
      dispatch(updateCredential({user:{}, isLoggedIn: false}));
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
      {/* for username */}
      <TextIP value={cred.username} isFocusOnLoad={!isUsernameBlurred}
        onChange={(e) => setCred(state => {
          return { ...state, username: e.target.value }
        })}
        setIsBlurred={setIsUsernameBlurred}
        errMsg='User not found'
        isErr={err.username}
        placeHolder='Please enter your username e.g. xyz.abc@pqts.com'
      />
      {/* for password */}
      <TextIP type='password' value={cred.password} isFocusOnLoad={false}
        onChange={(e) => setCred(state => {
          return { ...state, password: e.target.value }
        })}
        errMsg="invalid password"
        isErr={err.password}
        placeHolder='Please enter your password'
      />

      <button className='login-submit-btn' onClick={() => onSubmit(setPasswordError, cred.password)}>login</button>
    </div>
  );
};

export default LoginForm;