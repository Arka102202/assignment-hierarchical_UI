import React from 'react';
import AddEmployeeBtn from './AddEmployeeBtn';
import TransferMemberBtn from './TransferMemberBtn';
import RemoveMemberBtn from './RemoveMemberBtn';
import SwitchHead from './SwitchHead';
import Swal from 'sweetalert2';

const EmployeeTab = ({ data = {}, memberIndex = 0, setRefetchMember = () => { }, deptId = "", teamId = "", headMember = {}, setRefetchTeam = () => { }, selected = {}, setSelected = () => { }, setMemberWithOutHeadCount = () => { }, memberWithOutHeadCount = 0, showExtraFeature = true }) => {



  return (
    <div className='employee-tab-box'>
      <div className='header'>
        <div className='check-title-box'>
          {!data.isHead && showExtraFeature && <input type="checkbox" onClick={e => e.stopPropagation()} checked={!!selected?.[data.teamId]?.some(el => el._id === data._id)}
            onChange={(e) => {
              e.stopPropagation();
              if (e.target.checked && memberWithOutHeadCount > 1) {
                setSelected(state => {
                  if (state[data.teamId]) state[data.teamId].push(data);
                  else state[data.teamId] = [data];
                  return { ...state };
                });
                setMemberWithOutHeadCount(state => {
                  state[data.teamId] -= 1;
                  return { ...state };
                })
              } else {
                setSelected(state => {
                  let index = -1;
                  state[data.teamId]?.forEach((el, idx) => {
                    if (el._id === data._id) index = idx;
                  });
                  if (index !== -1) {
                    state[data.teamId].splice(index, 1);
                    setMemberWithOutHeadCount(state => {
                      state[data.teamId] += 1;
                      return { ...state };
                    })
                  }
                  return { ...state };
                });

              }
              if(e.target.checked && memberWithOutHeadCount === 1) {
                Swal.fire("All members can be selected except one as all the team should have at-least one Head and one Member")
              }
            }}
          />}
          <div className='title-box'>
            <p>{data.name}</p>
            <p>({data.position})</p>
          </div>
        </div>
        <div className='btn-box'>
          {/* modify member */}
          <AddEmployeeBtn data={data} teamId={teamId} deptId={deptId} setRefetch={setRefetchMember} />
          {/* switch to head */}
          {!data.isHead && showExtraFeature && <SwitchHead curHead={headMember} futureHead={data} deptId={data.deptId}
            teamId={data.teamId} setRefetch={setRefetchMember} setRefetchTeam={setRefetchTeam} />}
        </div>
      </div>
    </div>
  );
};

export default EmployeeTab;