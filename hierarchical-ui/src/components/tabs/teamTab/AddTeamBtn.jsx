import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import AddTeam from '../../forms/addTeam/AddTeam';
import logo1 from "../../../assets/team.png";
import logo2 from "../../../assets/editing.png";
import ModalWrapper from '../../modalWrapper/ModalWrapper';

const AddTeamBtn = ({ data = {}, setRefetch = () => { }, deptId = "" }) => {

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!showForm)
      setRefetch(state => !state);
  }, [setRefetch, showForm])

  return (
    <>
      <button title={Object.entries(data).length === 0 ? 'Add team': "Update team"} className='add-team-btn' disabled={showForm} onClick={(e) => {
        setShowForm(true);
      }}>
        <img src={Object.entries(data).length === 0 ? logo1 : logo2} alt="" />
      </button>
      {showForm && createPortal(<ModalWrapper setShow={setShowForm} title={Object.entries(data).length === 0 ? 'Add team': "Update team"}><AddTeam data={data} setShowForm={setShowForm} deptId={deptId} /></ModalWrapper>, document.getElementById("modal-root"))}
    </>
  );
};

export default AddTeamBtn;