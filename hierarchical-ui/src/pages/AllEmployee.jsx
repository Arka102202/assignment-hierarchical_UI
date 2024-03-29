import React, { useEffect, useState } from 'react';
import { readAllByNameEmailPh } from '../utils/mimic API calls/employee';
import Header from '../components/header/Header';
import EmployeeTab from '../components/tabs/employeeTab/EmployeeTab';
import { useNavigate, useSearchParams } from "react-router-dom";
import logo from "../assets/go-back.png";

const AllEmployee = () => {
  const [allEmps, setAllEmps] = useState([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [emailQ, setEmailQ] = useState(searchParams.get("emailQ") || "");
  const [nameQ, setNameQ] = useState(searchParams.get("nameQ") || "");
  const [phQ, setPhQ] = useState(searchParams.get("phQ") || "");
  const [err, setErr] = useState(false);
  const [refetch, setRefetch] = useState(false);

  const search = async () => {
    try {
      const resp = await readAllByNameEmailPh(1, -1, emailQ, nameQ, phQ);
      setAllEmps(resp);
      setErr(false);
    } catch (err) {
      setAllEmps([]);
      setErr(true);
    }
  }


  useEffect(() => {
    // console.log(emailQ, nameQ, phQ);
    search();
    setSearchParams({ emailQ, nameQ, phQ });
  }, [emailQ, nameQ, phQ])

  return (
    <div className='outer-box'>
      <Header />
      <div className='search-boxes'>
        <button className='go-back-btn' onClick={() => navigate("/")}>
          <img src={logo} alt="" />
        </button>
        <SearchBox query={nameQ} setQuery={setNameQ} title='Name filter' />
        <SearchBox query={emailQ} setQuery={setEmailQ} title='Email filter' />
        <SearchBox query={phQ} setQuery={setPhQ} title='Phone number filter' />
      </div>

      <div className='emp-table'>
        {allEmps.length > 0 && <>
          {allEmps.map((el, idx) => <EmployeeTab key={idx} data={el} deptId={el.deptId}
            teamId={el.teamId} setRefetchMember={setRefetch} showExtraFeature={false} />)}
        </>}
        {err && <p className='no-info'>Looks like there are no employee</p>}
      </div>

    </div>
  );
};

export default AllEmployee;


const SearchBox = ({ query = "", setQuery = () => { }, title = "" }) => {

  const [q, setQ] = useState(query);

  return <div className='search-all-box'>
    <p className='title'>{title}</p>
    <input type="text" value={q}
      onKeyDown={(e) => {
        if (e.key === "Enter") setQuery(q);
      }}
      onBlur={() => setQuery(q)}
      onChange={e => {
        e.stopPropagation();
        setQ(e.target.value);
      }}
      onClick={(e) => e.stopPropagation()}
      placeholder='Type a name and enter'
    />
  </div>
}