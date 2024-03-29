import React, { useEffect, useState } from 'react';
import BasicIP from '../../input elements/basicInput/BasicIP';
import { nanoid } from 'nanoid';
import { addOne, updateOne } from '../../../utils/mimic API calls/dept';
import { switchHead, updateOne as updateOneEmp } from '../../../utils/mimic API calls/employee';
import EmployeeSearchBox from '../../searchBox/employeeSearchBox/EmployeeSearchBox';

const AddDept = ({ data = {}, setShowForm = () => { } }) => {

  const [headEmp, setHeadEmp] = useState({
    name: data?.headEmp?.name || "",
    _id: data?.headEmp?._id || "",
  })

  const [dept, setDept] = useState({
    _id: data?._id || nanoid(),
    name: data?.name || "",
    hasHead: data?.hasHead || false,
    headEmp: headEmp,
    status: data?.status || "active"
  });

  const [allEmps, setAllEmps] = useState([]);
  const [emp, setEmp] = useState("");
  const [empGetErr, setEmpGetErr] = useState("");
  const [nullEmpErr, setNullEmpErr] = useState("");

  const [disableBtn, setDisableBtn] = useState(false);

  const [isNameFieldBlurred, setIsNameFieldBlurred] = useState(true);
  const [nameErr, setNameErr] = useState(false);
  const checkForNamingErr = () => {
    if (!dept.name) {
      setNameErr("Field is empty !!!!");
      setDisableBtn(false);
      return true;
    }
    else {
      setNameErr(false);
      return false;
    }
  };

  const checkNullHead = () => {
    if (dept.name && !headEmp._id) {
      setNullEmpErr(true);
      setDisableBtn(false);
      return true;
    }
    else {
      setNullEmpErr(false);
      return false;
    }
  }

  const addDept = async () => {
    setDisableBtn(true);
    if (!checkForNamingErr() && !checkNullHead()) {
      console.log({ ...dept, headEmp: { ...headEmp }, hasHead: !!headEmp._id }, { ...JSON.parse(emp), isHead: true, deptId: dept._id, teamId: "" });
      try {
        if (Object.entries(data).length === 0) {
          await addOne({ ...dept, headEmp: { ...headEmp }, hasHead: !!headEmp._id });
          if (emp)
            await updateOneEmp({ ...JSON.parse(emp), isHead: true, deptId: dept._id, teamId: "" })
        }
        else {
          await updateOne({ ...dept, headEmp: { ...headEmp }, hasHead: !!headEmp._id });
          if (emp)
            await switchHead(data.headEmp, JSON.parse(emp), dept._id, "", "deptId");
        }
        setShowForm(false);
      } catch (err) {
        console.log(err);
        setNameErr(err.message);
      } finally {
        setDisableBtn(false);
      }
    }
  }

  useEffect(() => {
    if (isNameFieldBlurred && dept.name)
      checkForNamingErr();
  }, [dept.name, isNameFieldBlurred])



  return (
    <div className='add-dept-form'>
      <BasicIP type='text' value={dept.name}
        onChange={(e) => setDept(state => {
          state.name = e.target.value;
          return { ...state };
        })}
        isFocusOnLoad={isNameFieldBlurred}
        isErr={!!nameErr}
        errMsg={nameErr}
        placeHolder='Enter the Department name'
      // setIsBlurred={setIsNameFieldBlurred}
      />


      <div className='head-select-box'>
        <EmployeeSearchBox filterObj={{ deptId: data?._id || "" }} filterKeys={["name"]} isANDed={true} withHead={false} setEmps={setAllEmps} setErr={setEmpGetErr} />
        <select value={emp} onChange={(e) => {
          setEmp(e.target.value);
          setHeadEmp({ _id: JSON.parse(e.target.value)._id, name: JSON.parse(e.target.value).name });
        }}>
          <option value="">Select a head</option>
          {allEmps.map((el, idx) => <option value={JSON.stringify(el)} key={idx}>{el.name}</option>)}
        </select>
      </div>
      {empGetErr &&
        <div className='error'>
          Please first add some Employees to the department or company
        </div>
      }

      {nullEmpErr && <p className='error'>Every department should have to have a head</p>}


      <button className='submit-btn' disabled={disableBtn} onClick={(e) => {
        e.stopPropagation();
        addDept();
      }}>{Object.entries(data).length === 0 ? "Add" : "Update"}</button>
    </div>
  );
};

export default AddDept;