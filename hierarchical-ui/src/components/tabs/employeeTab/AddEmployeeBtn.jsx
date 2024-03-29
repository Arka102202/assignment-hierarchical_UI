import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import AddEmployee from '../../forms/addEmployee/AddEmployee';
import ModalWrapper from '../../modalWrapper/ModalWrapper';
import logo1 from "../../../assets/employee.png";
import logo2 from "../../../assets/editing.png";

const AddEmployeeBtn = ({ data = {}, setRefetch = () => { }, deptId = "", teamId = "" }) => {

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!showForm)
      setRefetch(state => !state);
  }, [setRefetch, showForm])

  return (
    <>
      <button className='emp-btn' title={Object.entries(data).length === 0 ? 'Add Employee' : "Update employee"} disabled={showForm} onClick={(e) => {
        setShowForm(true);
      }}>
        <img src={Object.entries(data).length === 0 ? logo1 : logo2} alt="" />
      </button>
      {showForm && createPortal(<ModalWrapper setShow={setShowForm} title={Object.entries(data).length === 0 ? 'Add Employee' : "Update employee"}><AddEmployee data={data} setShowForm={setShowForm} deptId={deptId} teamId={teamId}/></ModalWrapper>, document.getElementById("modal-root"))}
    </>
  );
};

export default AddEmployeeBtn;