import React, { useEffect, useState } from 'react';
import { createPortal } from "react-dom";
import AddDept from '../../forms/addDept/AddDept';
import logo1 from "../../../assets/department.png";
import logo2 from "../../../assets/editing.png";
import ModalWrapper from '../../modalWrapper/ModalWrapper';

const AddDeptBtn = ({ data = {}, setRefetch = () => { } }) => {

  const [showForm, setShowForm] = useState(false);


  useEffect(() => {
    if (!showForm)
      setRefetch(state => !state);
  }, [setRefetch, showForm])

  return (
    <>
      <button title={Object.entries(data).length === 0 ? 'Add department' : "Update department"} disabled={showForm} onClick={(e) => {
        setShowForm(true);
      }} className='add-dept-btn'>
        <img src={Object.entries(data).length === 0 ? logo1 : logo2} alt="department logo" />
      </button>
      {showForm && createPortal(<ModalWrapper setShow={setShowForm} title={Object.entries(data).length === 0 ? 'Add department' : "Update department"}><AddDept data={data} setShowForm={setShowForm} /></ModalWrapper>, document.getElementById("modal-root"))}
    </>
  );
};

export default AddDeptBtn;