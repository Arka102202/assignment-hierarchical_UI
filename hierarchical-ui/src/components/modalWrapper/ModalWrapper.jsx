import React, { useEffect, useState } from 'react';
import logo from "../../assets/close.png"

const ModalWrapper = ({ children, title = "Title of the Modal", setShow = () => { } }) => {

  const [y, setY] = useState(0);

  const close = () => {
    document.body.style.overflow = "auto";
    setShow(false);
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setY(window.scrollY);
  }, [])


  return (
    <div className='modal-wrapper-outer-box' onClick={close}
      style={{
        top: `${y}px`,
      }}>
      <div className='container' onClick={(e) => e.stopPropagation()}>
        <div className='header'>
          <p className='title'>{title}</p>
          <button className='close-modal' onClick={close}>
            <img src={logo} alt="cross sign" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;