import React, { useEffect, useState } from 'react';
import { findOne, readAll as readAllDept } from '../../../utils/mimic API calls/dept';
import { readAll as readAllTeam } from '../../../utils/mimic API calls/team';
import { updateMany } from '../../../utils/mimic API calls/employee';
import Swal from 'sweetalert2';

const TransferMember = ({ memberList = [], setRefetch = () => { }, setShow = () => { } }) => {

  const [allTeams, setAllTeams] = useState([]);
  const [disable, setDisable] = useState(false);
  const [team, setTeam] = useState("");


  const [dept, setDept] = useState("");
  const [allDepts, setAllDepts] = useState([]);
  const [err, setErr] = useState("");

  const [curDeptName, setCurDeptName] = useState("");

  const getAllDepts = async () => {
    try {
      const deptResp = await readAllDept(1, -1);
      setAllDepts(deptResp);
    } catch (err) {
      // something useful
    }
  }

  const getAllTeams = async () => {
    try {
      const temp = JSON.parse(dept);
      const teamResp = await readAllTeam(1, -1, temp._id);
      setAllTeams(teamResp);
    } catch (err) {
      // something useful
    }
  }

  const transfer = async () => {
    setDisable(true);
    if (!dept) {
      setErr("select a department");
      setDisable(false);
      return;
    }
    if (!team) {
      setErr("select a team");
      setDisable(false);
      return;
    }
    const tempD = JSON.parse(dept);
    const tempT = JSON.parse(team);
    if ((curDeptName === "HR" && tempD.name === "Design") || (curDeptName === "Design" && tempD.name === "HR")) {
      Swal.fire("Member transfer between HR and Design department is not permitted.\n Try a different combination");
      setDisable(false);
      return;
    }
    const newList = memberList.map(el => {
      const temp = JSON.parse(JSON.stringify(el));
      temp.teamId = tempT._id;
      temp.deptId = tempD._id;
      return temp;
    });

    try {
      await updateMany(newList);
    } catch (err) {
      console.log(err);
      setErr("Something went wrong. Please try again.")
    } finally {
      setRefetch(state => !state);
      setShow(false);
    }
  }

  const getCurrentDeptName = async () => {

    const mem = JSON.parse(JSON.stringify(memberList[0]));
    const deptId = mem.deptId;

    try {
      const dept = await findOne(deptId, "_id");
      setCurDeptName(dept.name);
    } catch (err) {
      console.log(err);
    }

  }

  useEffect(() => {
    getAllDepts();
    getCurrentDeptName();
  }, [])

  useEffect(() => {
    if (dept) {
      const temp = JSON.parse(dept);
      if (temp._id)
        getAllTeams();
    }
  }, [dept])



  return (
    <div className='transfer-form'>
      {/* deptId */}
      <select value={dept} onChange={(e) => {
        setDept(e.target.value);
      }}>
        <option value="">Select a department</option>
        {allDepts.map((el, idx) => <option value={JSON.stringify(el)} key={idx}>{el.name}</option>)}
      </select>

      {/* teamId */}
      {dept && <select value={team} onChange={(e) => {
        setTeam(e.target.value);
      }}>
        <option value="">Select a department</option>
        {allTeams.map((el, idx) => <option value={JSON.stringify(el)} key={idx}>{el.name}</option>)}
      </select>}

      {err && <p className='error'>{err}</p>}

      <button className='btn-transfer' disabled={disable} onClick={transfer}>Transfer</button>
    </div>
  );
};

export default TransferMember;