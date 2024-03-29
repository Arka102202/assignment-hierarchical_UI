import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { toggleShowMember } from '../../../state/slices/showState';
import { readAll } from '../../../utils/mimic API calls/employee';
import { addMultipleEmp, replaceMultipleEmp } from '../../../state/slices/employee';
import EmployeeTab from '../employeeTab/EmployeeTab';
import AddEmployeeBtn from '../employeeTab/AddEmployeeBtn';
import AddTeamBtn from './AddTeamBtn';
import TransferMemberBtn from '../employeeTab/TransferMemberBtn';
import RemoveMemberBtn from '../employeeTab/RemoveMemberBtn';

const TeamTab = ({ data = {}, teamIndex = 0, setRefetchTeam = () => { }, deptId = "" }) => {

  const members = useSelector(state => state.empState.emps);
  const show = useSelector(state => state.showState.showMember);
  const dispatch = useDispatch();
  const [refetch, setRefetch] = useState(false);
  const [memberWithOutHeadCount, setMemberWithOutHeadCount] = useState({});
  const [selected, setSelected] = useState({});

  const toggleShow = () => dispatch(toggleShowMember(data._id));

  console.log(selected, memberWithOutHeadCount);

  const getMembers = async () => {
    try {
      const members = await readAll(1, -1, data._id);
      dispatch(replaceMultipleEmp({ emps: members, key: data._id }));

      if (members) {
        setMemberWithOutHeadCount(state => {
          state[data._id] = members.length - 1;
          return { ...state };
        })
      }
    } catch (err) {
      console.log(err);
      console.error(err.message);
      dispatch(replaceMultipleEmp({ emps: err.data, key: data._id }));
    }
  }

  useEffect(() => {
    if (show.includes(data._id)) getMembers();
  }, [refetch, show])

  // console.log({refetch});

  return (
    <div className='team-tab-box' >
      <div className='header' onClick={(e) => {
        if (e.target === e.currentTarget) toggleShow();
      }}>
        <p className='tab-title'>{data.name} {data.hasHead ? `lead by ${data.headEmp.name}` : ""}</p>
        <div className='btn-box'>
          <AddEmployeeBtn setRefetch={setRefetch} deptId={deptId} teamId={data._id} />
          {/* add to a team */}
          {/* transfer member */}
          {selected?.[data._id]?.length > 0 && <TransferMemberBtn memberList={selected[data._id]} setRefetch={setRefetch} />}
          {/* Remove */}
          {selected?.[data._id]?.length > 0 && <RemoveMemberBtn memberList={selected[data._id]} setRefetch={setRefetch} />}
          {/* modify */}
          <AddTeamBtn data={data} setRefetch={setRefetchTeam} deptId={deptId} />
          <button className='level-open-close-btn' onClick={(e) => {
            e.stopPropagation();
            toggleShow();
          }}>{show.includes(data._id) ? <FaAngleUp /> : <FaAngleDown />}</button>
        </div>
      </div>
      {show.includes(data._id) && <>
        {members?.[data._id] && members?.[data._id].map((el, idx) => <EmployeeTab key={idx} data={el} memberIndex={idx} deptId={deptId} teamId={data._id} headMember={data.headEmp} setRefetchMember={setRefetch} setRefetchTeam={setRefetchTeam}
          memberWithOutHeadCount={memberWithOutHeadCount?.[data._id]} setMemberWithOutHeadCount={setMemberWithOutHeadCount}
          selected={selected} setSelected={setSelected}
        />)}
      </>}
    </div>
  );
};

export default TeamTab;