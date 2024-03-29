import React, { useEffect, useState } from 'react';
import logo from "../../../assets/search.png";
import { readAllForAddMemBer } from '../../../utils/mimic API calls/employee';

const AddMember = ({ deptId = "", teamId = "", error = "", selected = [], setSelected = () => { } }) => {
  const [query, setQuery] = useState("");
  const [switchView, setSwitchView] = useState(true);
  const [allEmps, setAllEmps] = useState([]);
  const [fetchErr, setFetchErr] = useState(false);

  const search = async () => {
    try {
      const resp = await readAllForAddMemBer(deptId, teamId, query);
      console.log(resp);
      setAllEmps(resp);
      setFetchErr(false);
    } catch (err) {
      setFetchErr(true);
    }

    // const resp = await readAllForAddMemBer(deptId, teamId, query);
    // setAllEmps(resp);
    // setFetchErr(false);
  }

  // const addMembers = async () => {
  //   setDisable(true);
  //   if (selected.length === 0) {
  //     setError("Please select some employees");
  //     setDisable(false);
  //   }
  //   else {
  //     setError(false);
  //     try {
  //       selected.forEach(el => {
  //         el.deptId = deptId;
  //         el.teamId = teamId;
  //       });

  //       await updateMany(selected);
  //     } catch (err) {
  //       setError("Something went wrong. Please try aging..");
  //       setDisable(false);
  //     }
  //   }
  // }


  return (
    <div>
      <div className='search-box'>
        <input type="text" value={query}
          onKeyDown={(e) => {
            if (e.key === "Enter") search();
          }}
          onChange={e => {
            e.stopPropagation();
            setQuery(e.target.value);
          }}
          onClick={(e) => e.stopPropagation()}
          placeholder='Type a name and enter'
        />
        <button className='search-btn' onClick={(e) => {
          e.stopPropagation();
          search();
        }}  >
          <img src={logo} alt="" />
        </button>
      </div>
      <div className='result-box'>
        <div className='result-box-title'>
          <p onClick={() => setSwitchView(true)} className='p-1'
            style={{ background: switchView ? "#d0ebff" : "#fff" }}
          >Select</p>
          <p onClick={() => setSwitchView(false)} className='p-2'
            style={{ background: !switchView ? "#d0ebff" : "#fff" }}
          >Selected</p>
        </div>
        <div className='result-view'>
          {(switchView ? allEmps : selected).map((el, idx) => <EachEmp data={el} key={idx} selected={selected} setSelected={setSelected} switchView={switchView} />)}
        </div>

        {/* <button disabled={disable} onClick={addMembers}>Add members</button> */}
      </div>
      {fetchErr &&
        <p className='error'>
          {selected.length === 0 ? "Please first add some Employees to the department or company" : "Try a different name"}
        </p>
      }

      {error && <p className='error'>{error}</p>}
    </div>
  );
};

export default AddMember;

const EachEmp = ({ data = {}, switchView = true, setSelected = () => { }, selected = [] }) => {

  return <div className='each-emp'>
    {switchView && <input type="checkbox" checked={selected.some(el => el._id === data._id)} onChange={(e) => {
      if (e.target.checked) setSelected(state => {
        state.push(data);
        return [...state];
      })
      else setSelected(state => {
        let index = 0;
        state.forEach((el, idx) => {
          if (el._id === data._id) index = idx;
        });
        state.splice(index, 1);
        return [...state];
      })
    }} />}
    <p>{data.name}</p>
  </div>




}