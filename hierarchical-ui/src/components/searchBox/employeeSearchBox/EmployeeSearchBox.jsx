import React, { useState } from 'react';
import logo from "../../../assets/search.png";
import { readAllWithFilter } from '../../../utils/mimic API calls/employee';

const EmployeeSearchBox = ({ filterObj = {}, filterKeys = [], setEmps = () => { }, isANDed = false, withHead = false, setErr = () => { } }) => {
  const [query, setQuery] = useState("");


  const search = async () => {
    const obj = {};
    filterKeys.forEach(el => obj[el] = query)
    try {
      const data = await readAllWithFilter({ ...filterObj, ...obj }, isANDed, withHead);
      setErr("");
      setEmps(data);
    } catch (err) {
      setErr(err.message);
    }
  }



  return (
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
  );
};

export default EmployeeSearchBox;