import React, { useState } from 'react';
import logo from "../../../assets/remove.png";
import ModalWrapper from '../../modalWrapper/ModalWrapper';
import RemoveMember from '../../forms/addEmployee/RemoveMember';
import { createPortal } from 'react-dom';

const RemoveMemberBtn = ({ memberList = [], setRefetch = () => { } }) => {

  const [showForm, setShowForm] = useState(false);
  return (
    <>
        <button className='remove-btn' title="Remove member" disabled={showForm} onClick={(e) => setShowForm(true)}>
          <img src={logo} alt="" />
        </button >
        {showForm && createPortal(<ModalWrapper setShow={setShowForm} title="Remove member">
          <RemoveMember memberList={memberList} setRefetch={setRefetch} setShow={setShowForm} />
        </ModalWrapper>, document.getElementById("modal-root"))
        }
      </>
  );
};

export default RemoveMemberBtn;