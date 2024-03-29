import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import BasicIP from '../../input elements/basicInput/BasicIP';
import { readAll as readAllDept } from '../../../utils/mimic API calls/dept';
import { readAll as readAllTeam } from '../../../utils/mimic API calls/team';
import { addOne, updateOne } from '../../../utils/mimic API calls/employee';

const AddEmployee = ({ data = {}, setShowForm = () => { }, deptId = "", teamId = "" }) => {


  const [emp, setEmp] = useState({
    _id: data?._id || nanoid(),
    cDate: data?.cDate || (new Date()).toISOString(),
    status: data?.status || "active",
    name: data?.name || "",
    phNumber: data?.phNumber || "",
    password: data?.password || "",
    emailId: data?.emailId || "",
    deptId: data?.deptId || deptId,
    teamId: data?.teamId || teamId,
    position: data?.position || "",
    isHead: data?.isHead || false,
  })

  const [err, setErr] = useState({
    name: "",
    phNumber: "",
    password: "",
    emailId: "",
    position: ""
  });

  const [isBlurred, setIsBlurred] = useState({
    name: false,
    phNumber: true,
    password: true,
    emailId: true,
  })

  const [dept, setDept] = useState({ name: "", _id: "" });
  const [allDepts, setAllDepts] = useState([]);

  const [team, setTeam] = useState({ name: "", _id: "" });
  const [allTeams, setAllTeams] = useState([]);
  const [disableBtn, setDisableBtn] = useState(false);

  const updateValue = (key, value) => {
    setEmp(state => {
      state[key] = value;
      return { ...state };
    })
  }

  const updateBlurredState = (value, key) => {
    setIsBlurred(state => {
      state[key] = value;
      return { ...state };
    })
  }

  const updateErr = (errMsg, key) => {
    setErr(state => {
      state = {
        name: "",
        phNumber: "",
        password: "",
        emailId: "",
        position: ""
      };
      state[key] = errMsg;
      return { ...state };
    })
    setDisableBtn(false);
    return true;
  }

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
      const teamResp = await readAllTeam(1, -1, emp.deptId);
      setAllTeams(teamResp);
    } catch (err) {
      // something useful
    }
  }

  const checkForErr = () => {
    // name
    if (!emp.name) return updateErr("Field is empty !!!!", "name");
    if (emp.name.length < 8) return updateErr("Name should be 8 character long", "name");

    // phNumber
    if (!emp.phNumber) return updateErr("Field is empty !!!!", "phNumber");
    if (emp.phNumber.length < 10 || emp.phNumber.length > 10)
      return updateErr("Phone Number should be 10 digit long", "phNumber");

    // password
    if (!emp.password) return updateErr("Field is empty !!!!", "password");

    // emailId
    if (!emp.emailId) return updateErr("Field is empty !!!!", "emailId");
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(emp.emailId)) return updateErr("Email id is invalid", "emailId");

    // position
    if (!emp.position) return updateErr("Field is empty !!!!", "position");

    else {
      setErr({
        name: "",
        phNumber: "",
        password: "",
        emailId: "",
        position: ""
      });
      return false;
    }
  };

  const addEmp = async () => {
    setDisableBtn(true);
    if (!checkForErr()) {
      try {
        if (Object.entries(data).length === 0)
          await addOne(emp);
        else await updateOne(emp);
        setShowForm(false);
      } catch (err) {
        // do something useful
      } finally {
        setDisableBtn(false);
      }
    }
  }


  useEffect(() => {
    getAllDepts();
  }, [])

  useEffect(() => {
    if (emp.deptId) getAllTeams();
  }, [emp.deptId])



  return (
    <div className='add-emp-form'>
      {/* name */}
      <BasicIP type='text' value={emp.name}
        onChange={(e) => updateValue("name", e.target.value)}
        isFocusOnLoad={!isBlurred.name}
        isErr={!!err.name}
        errMsg={err.name}
        placeHolder='Enter the name'
        setIsBlurred={updateBlurredState}
        blurKey='name'
      />

      {/* phNumber */}
      <BasicIP type='text' value={emp.phNumber}
        onChange={(e) => updateValue("phNumber", e.target.value)}
        isErr={!!err.phNumber}
        errMsg={err.phNumber}
        placeHolder='Enter the phone number'
        setIsBlurred={updateBlurredState}
        blurKey='phNumber'
      />

      {/* password */}
      <BasicIP type='text' value={emp.password}
        onChange={(e) => updateValue("password", e.target.value)}
        isErr={!!err.password}
        errMsg={err.password}
        placeHolder='Enter the password'
        setIsBlurred={updateBlurredState}
        blurKey='password'
      />

      {/* emailId */}
      <BasicIP type='text' value={emp.emailId}
        onChange={(e) => updateValue("emailId", e.target.value)}
        isErr={!!err.emailId}
        errMsg={err.emailId}
        placeHolder='Enter the emailId'
        setIsBlurred={updateBlurredState}
        blurKey='emailId'
      />

      {/* deptId */}
      {!deptId && <select value={dept} onChange={(e) => {
        setDept(e.target.value);
        updateValue("deptId", JSON.parse(e.target.value)._id);
      }}>
        <option value="">Select a department</option>
        {allDepts.map((el, idx) => <option value={JSON.stringify(el)} key={idx}>{el.name}</option>)}
      </select>}

      {/* teamId */}
      {!teamId && emp.deptId && <select value={team} onChange={(e) => {
        setTeam(e.target.value);
        updateValue("teamId", JSON.parse(e.target.value)._id);
      }}>
        <option value="">Select a department</option>
        {allTeams.map((el, idx) => <option value={JSON.stringify(el)} key={idx}>{el.name}</option>)}
      </select>}

      {/* position */}
      <BasicIP type='text' value={emp.position}
        onChange={(e) => updateValue("position", e.target.value)}
        placeHolder='Enter the position'
        isErr={!!err.position}
        errMsg={err.position}
      />
      <button className='submit-btn' disabled={disableBtn} onClick={(e) => {
        e.stopPropagation();
        addEmp();
      }}>{Object.entries(data).length === 0 ? "Add" : "Update"}</button>
    </div>
  );
};

export default AddEmployee;