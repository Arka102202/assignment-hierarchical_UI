import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import BasicIP from '../../input elements/basicInput/BasicIP';
import { readAll } from '../../../utils/mimic API calls/dept';
import { addOne, updateOne } from '../../../utils/mimic API calls/team';
import { switchHead, updateMany, updateOne as updateOneEmp } from '../../../utils/mimic API calls/employee';
import EmployeeSearchBox from '../../searchBox/employeeSearchBox/EmployeeSearchBox';
import AddMember from '../addEmployee/AddMember';

const AddTeam = ({ data = {}, setShowForm = () => { }, deptId = "" }) => {
  const [headEmp, setHeadEmp] = useState({
    name: data?.headEmp?.name || "",
    _id: data?.headEmp?._id || "",
  });


  const [team, setTeam] = useState({
    _id: data?._id || nanoid(),
    name: data?.name || "",
    hasHead: data?.hasHead || false,
    headEmp: headEmp,
    status: data?.status || "active",
    deptId: data?.deptId || deptId,
  });

  const [dept, setDept] = useState({ name: "", _id: "" });
  const [allDepts, setAllDepts] = useState([]);

  const [disableBtn, setDisableBtn] = useState(false);

  const [isNameFieldBlurred, setIsNameFieldBlurred] = useState(true);
  const [nameErr, setNameErr] = useState(false);
  const [err, setErr] = useState("");

  // for head
  const [allEmps, setAllEmps] = useState([]);
  const [emp, setEmp] = useState("");
  const [empGetErr, setEmpGetErr] = useState("");
  const [nullEmpErr, setNullEmpErr] = useState("");

  // for members
  const [selected, setSelected] = useState([]);
  const [nullMemberErr, setNullMemberErr] = useState("");



  const checkForNamingErr = () => {
    if (!team.name) {
      setNameErr("Field is empty !!!!");
      setNullEmpErr(false);
      setErr("");
      setNullMemberErr("");
      setDisableBtn(false);
      return true;
    }
    else {
      setNameErr(false);
      return false;
    }
  };

  const checkForAllErrs = () => {
    if (!checkForNamingErr()) {
      if (!team.deptId) {
        setErr("Team must have a department.");
        setNullEmpErr(false);
        setDisableBtn(false);
        setNullMemberErr("");
        return true;
      }
      if (!headEmp._id) {
        setErr("");
        setNullMemberErr("");
        setNullEmpErr(true);
        setDisableBtn(false);
        return true;
      }
      if (Object.entries(data).length === 0 && selected.length === 0) {
        setNullMemberErr("Please select some employees");
        setErr("");
        setNullMemberErr("");
        setDisableBtn(false);
        return true;
      }
      else {
        setErr("");
        setNullMemberErr("");
        setNullEmpErr(false);
        return false;
      }
    }
    return true;
  }

  const addTeam = async () => {
    setDisableBtn(true);
    if (!checkForAllErrs()) {
      try {
        if (Object.entries(data).length === 0) {
          await addOne({ ...team, headEmp: { ...headEmp }, hasHead: !!headEmp._id });
          if (emp)
            await updateOneEmp({ ...JSON.parse(emp), isHead: true, deptId: team.deptId, teamId: team._id });
        }
        else {
          await updateOne({ ...team, headEmp: { ...headEmp }, hasHead: !!headEmp._id });
          if (emp)
            await switchHead(data.headEmp, JSON.parse(emp), data.deptId, data._id, "teamId");
        }

        if (selected) {
          selected.forEach(el => {
            el.deptId = team.deptId;
            el.teamId = team._id;
          });

          await updateMany(selected);
        }

        setShowForm(false);
      } catch (err) {
        setNameErr(err.message);
      } finally {
        setDisableBtn(false);
      }
    }
  }

  const getAllDepts = async () => {
    try {
      const resp = await readAll(1, -1);
      setAllDepts(resp);
    } catch (err) {
      // something useful
    }
  }

  useEffect(() => {
    if (isNameFieldBlurred && team.name)
      checkForNamingErr();
  }, [team.name, isNameFieldBlurred])

  useEffect(() => {
    getAllDepts();
  }, [])

  return (
    <div className='add-dept-form'>
      <BasicIP type='text' value={team.name}
        onChange={(e) => setTeam(state => {
          state.name = e.target.value;
          return { ...state };
        })}
        // isFocusOnLoad={isNameFieldBlurred}
        isErr={!!nameErr}
        errMsg={nameErr}
        placeHolder='Enter the Team name'
        setIsBlurred={setIsNameFieldBlurred}
      />
      {!deptId && <select value={dept} onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          setDept(e.target.value);
          setTeam(state => {
            state.deptId = JSON.parse(e.target.value)._id;
            return { ...state };
          })
        }}>
        <option value="">Select a department</option>
        {allDepts.map((el, idx) => <option value={JSON.stringify(el)} key={idx}>{el.name}</option>)}
      </select>}
      {err && <p className='error'>{err}</p>}

      {/* adding the head */}
      <div className='head-select-box'>
        <EmployeeSearchBox filterObj={{ teamId: data?._id || "" }} filterKeys={["name"]} isANDed={true} withHead={false} setEmps={setAllEmps} setErr={setEmpGetErr} />
        <select value={emp} onChange={(e) => {
          setEmp(e.target.value);
          setHeadEmp({ _id: JSON.parse(e.target.value)._id, name: JSON.parse(e.target.value).name });
        }}>
          <option value="">Search and Select a head</option>
          {allEmps.map((el, idx) => <option value={JSON.stringify(el)} key={idx}>{el.name}</option>)}
        </select>
      </div>
      {empGetErr &&
        <div className='error'>
          Please first add some Employees to the team or company
        </div>
      }
      {nullEmpErr && <p className='error'>Every team should have to have a head</p>}


      {/* adding members */}
      <AddMember deptId={data.deptId} teamId={Object.entries(data).length === 0 ? "" : data._id}
        error={nullMemberErr} selected={selected} setSelected={setSelected} />

      <button className='submit-btn' disabled={disableBtn} onClick={(e) => {
        e.stopPropagation();
        addTeam();
      }}>{Object.entries(data).length === 0 ? "Add" : "Update"}</button>
    </div>
  );
};

export default AddTeam;