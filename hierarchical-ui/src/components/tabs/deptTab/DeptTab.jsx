import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { toggleShowTeam } from '../../../state/slices/showState';
import { readAll } from '../../../utils/mimic API calls/team';
import { replaceMultipleTeam } from '../../../state/slices/team';
import AddTeamBtn from '../teamTab/AddTeamBtn';
import TeamTab from '../teamTab/TeamTab';
import AddDeptBtn from './AddDeptBtn';

const DeptTab = ({ data = {}, deptIndex = 0, setRefetchDept = () => { } }) => {


  const teams = useSelector(state => state.teamState.teams);
  const show = useSelector(state => state.showState.showTeam);
  const dispatch = useDispatch();
  const [refetch, setRefetch] = useState(false);

  const toggleShow = () => dispatch(toggleShowTeam(data._id));

  const getTeams = async () => {
    try {
      const teams = await readAll(1, 100, data._id);
      dispatch(replaceMultipleTeam({ teams, key: data._id }));
    } catch (err) {
      console.error(err.message);
      dispatch(replaceMultipleTeam({teams: err.data, key: data._id }));
    }
  }

  useEffect(() => {
    if (show.includes(data._id)) getTeams();
  }, [refetch, show])

  return (
    <div className='dept-tab-box' >
      <div className='header' onClick={(e) => {
        if (e.target === e.currentTarget) toggleShow();
      }}>
        <p className='tab-title'>{data.name} {data.hasHead ? `lead by ${data.headEmp.name}` : ""}</p>
        <div className='btn-box'>
          <AddTeamBtn setRefetch={setRefetch} deptId={data._id}/>
          <AddDeptBtn data={data} setRefetch={setRefetchDept}/>
          <button className='level-open-close-btn' onClick={(e) => {
            e.stopPropagation();
            toggleShow();
          }}>{show.includes(data._id) ? <FaAngleUp /> : <FaAngleDown />}</button>
        </div>
      </div>
      {/* if show contains the dept id and 
      then the teams objects is not empty or 
      data with the dept key is not null or it has some value 
      then the list will be visible */}
      {show.includes(data._id) && ((Object.entries(teams).length === 0 || !teams?.[data._id] || teams?.[data._id].length === 0) ? <div className='no-info-box'>
        <p>There is no teams. Try adding one</p>
      </div> : <>
        {teams?.[data._id] && teams?.[data._id].map((el, idx) => <TeamTab key={idx} data={el} teamIndex={idx} setRefetchTeam={setRefetch} deptId={data._id}/>)}
      </>)}
    </div>
  );
};

export default DeptTab;