import React, { useState } from 'react';
import logo from "../../../assets/transfer.png";
import { createPortal } from 'react-dom';
import ModalWrapper from '../../modalWrapper/ModalWrapper';
import TransferMember from '../../forms/addEmployee/TransferMember';

const TransferMemberBtn = ({ memberList = [], setRefetch = () => { } }) => {


  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <button className='transfer-btn' title="Transfer member" disabled={showForm} onClick={(e) => setShowForm(true)}>
        <img src={logo} alt="" />
      </button >
      {showForm && createPortal(<ModalWrapper setShow={setShowForm} title="Transfer member">
        <TransferMember memberList={memberList} setRefetch={setRefetch} setShow={setShowForm} />
      </ModalWrapper>, document.getElementById("modal-root"))
      }
    </>
  );
};

export default TransferMemberBtn;