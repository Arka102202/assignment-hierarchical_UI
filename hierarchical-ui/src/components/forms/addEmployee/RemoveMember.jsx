import React, { useState } from 'react';
import { updateMany } from '../../../utils/mimic API calls/employee';

const RemoveMember = ({ memberList = [], setRefetch = () => { }, setShow = () => { } }) => {

  const [disable, setDisable] = useState(false);
  const [err, setErr] = useState("");


  const remove = async () => {
    setDisable(true);
    const newList = memberList.map(el => {
      const temp = JSON.parse(JSON.stringify(el));
      temp.teamId = "";
      temp.deptId = "";
      return temp;
    });
    try {
      await updateMany(newList);
    } catch (err) {
      console.log(err);
      setErr("Something went wrong. Please try again.");
      setDisable(false);
    } finally {
      setRefetch(state => !state);
      setShow(false);
    }
  }

  const cancel = () => setShow(false);




  return (
    <div className='remove-box'>
      <p>You will remove {memberList.length} members from this team.</p>
      <p>Are you sure you want to do this?</p>
      <div className='remove-btn-box'>
        <button className='btn-ok' disabled={disable} onClick={remove}>Remove</button>
        <button className='btn-cancel' disabled={disable} onClick={cancel}>Cancel</button>
      </div>
    </div>
  );
};

export default RemoveMember;