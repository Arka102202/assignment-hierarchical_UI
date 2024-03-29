import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import AddDeptBtn from '../deptTab/AddDeptBtn';
import { toggleShowDept } from '../../../state/slices/showState';
import { readAll } from '../../../utils/mimic API calls/dept';
import { addMultipleDept, replaceMultipleDept } from '../../../state/slices/dept';
import DeptTab from '../deptTab/DeptTab';
import AddEmployeeBtn from '../employeeTab/AddEmployeeBtn';

const CEOTab = () => {

  const depts = useSelector(state => state.deptState.depts);
  const show = useSelector(state => state.showState.showDept);
  const [refetch, setRefetch] = useState(false);
  const dispatch = useDispatch();

  const toggleShow = () => dispatch(toggleShowDept());


  const getDepts = async () => {
    try {
      const depts = await readAll(1, 100);
      dispatch(replaceMultipleDept(depts));
    } catch (err) {
      console.error(err.message);
      dispatch(addMultipleDept(err.data));
    }
  }

  useEffect(() => {
    if (show) getDepts();
  }, [refetch, show])


  return (
    <div className='ceo-tab-box' >
      <div className='header' onClick={(e) => {
        e.stopPropagation();
        if (e.target === e.currentTarget) toggleShow();
      }}>
        <p className='tab-title'>CEO</p>
        <div className='btn-box'>
          <AddEmployeeBtn />
          <AddDeptBtn setRefetch={setRefetch} />
          <button className='level-open-close-btn' onClick={(e) => {
            e.stopPropagation();
            toggleShow()}}>{show ? <FaAngleUp /> : <FaAngleDown />}</button>
        </div>
      </div>
      {show && (depts.length === 0 ? <div className='no-info-box'>
        <p>There is no dept. Try adding one</p>
      </div> : <>

        {depts.map((el, idx) => <DeptTab key={idx} data={el} deptIndex={idx} setRefetchDept={setRefetch}/>)}

      </>)}
    </div>
  );
};

export default CEOTab;