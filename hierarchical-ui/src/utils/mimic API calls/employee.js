export const getNetworkDelay = () => Math.trunc((Math.random() * 901) + 100);

export const readAll = (page = 1, limit = 10, teamId = "") => {
  let employees = JSON.parse(localStorage.getItem("emp"));
  if (employees) {
    employees = employees.filter(el => el.teamId === teamId);
    let headIdx = 0;
    employees.forEach((el, idx) => {
      if (el.isHead) headIdx = idx;
    });
    const [headEmp] = employees.splice(headIdx, 1);
    employees.unshift(headEmp);
  }
  const start = (page - 1) * limit;
  const end = start + limit;

  // filter using the searchString

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (employees && employees.length !== 0)
        if (limit === -1) resolve(employees);
        else resolve(employees.slice(start, end));
      else reject({ error: true, message: "No team found", data: [] });
    }, getNetworkDelay())
  });
}

export const readAllWithFilter = (filterObj = {}, isANDed = true, withHead = false) => {
  let employees = JSON.parse(localStorage.getItem("emp"));
  const temp = [];
  if (employees) {
    employees.forEach(el => {
      let res = isANDed;
      Object.entries(filterObj).forEach(([key, value]) => {
        if (isANDed) res = res && (el[key].includes(value));
        else res = res || (el[key].includes(value));
      })

      if (res && !el.isHead) temp.push(el);
      else if (res && withHead && el.isHead) temp.push(el);
    });
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (temp && temp.length !== 0)
        resolve(temp);
      else reject({ error: true, message: "No user found", data: [] });
    }, getNetworkDelay())
  });
}
/**
 * this func will return all the employees who are not from the provided team and 
 * also from team which has more than 3 members otherwise there will be teams with 
 * no or one members.
 * @param {*} deptId 
 * @param {*} teamId 
 * @param {*} name 
 * @returns an Array of right employees who are able to join the provided team
 */
export const readAllForAddMemBer = (deptId = "", teamId = "", name = "") => {
  const employees = JSON.parse(localStorage.getItem("emp"));
  const employeesByTeam = {};
  employees.forEach(el => {
    if (!el.isHead) {
      if (el.teamId) {
        if (employeesByTeam[el.teamId]) employeesByTeam[el.teamId].push(el);
        else employeesByTeam[el.teamId] = [el];
      }
      else {
        if (employeesByTeam.unknown) employeesByTeam.unknown.push(el);
        else employeesByTeam.unknown = [el];
      }
    }
  });
  const resp = [];

  Object.entries(employeesByTeam).forEach(([key, value]) => {
    console.log({ key, value });
    if (key !== teamId && value.length > 1) {
      let count = 0, canGo = value.length - 1;
      for (let i = 0; i < value.length || count < canGo; i++) {
        if (!name) resp.push(value[i]);
        else if (value[i].name.includes(name)) resp.push(value[i]);
        count++;
      }
    }
  })

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (resp && resp.length !== 0)
        resolve(resp);
      else reject({ error: true, message: "No user found", data: [] });
    }, getNetworkDelay())
  });
}

export const findOne = (value = "", key = "") => {
  const employees = JSON.parse(localStorage.getItem("emp"));
  let employee;
  if (employees) employee = employees.find(el => el[key] === value);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (employee)
        resolve(employee);
      else {
        if (value === process.env.REACT_APP_USERNAME) resolve({
          _id: "Arkadyuti",
          cDate: "date",
          status: "active",
          name: "Arkadyuti Sikdar",
          phNumber: "7384731979",
          emailId: "Arkadyuti",
          teamId: "",
          deptId: "",
          position: "",
          password: "123456",
          isHead: false
        });
        else reject(new Error("No user found"));
      }
    }, getNetworkDelay())
  });
}

export const addOne = (data) => {
  let teams = JSON.parse(localStorage.getItem("emp"));
  if (teams) teams.push(data);
  else teams = [data];

  localStorage.setItem("emp", JSON.stringify(teams));

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Success !!!");
    }, getNetworkDelay())
  });
}

export const updateOne = (data) => {
  let emps = JSON.parse(localStorage.getItem("emp"));
  let empIdx = 0;
  emps.forEach((el, idx) => {
    if (el._id === data._id) empIdx = idx;
  });
  emps.splice(empIdx, 1, data);
  localStorage.setItem("emp", JSON.stringify(emps));

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Success !!!");
    }, getNetworkDelay())
  });
}

export const updateMany = (data = []) => {
  let emps = JSON.parse(localStorage.getItem("emp"));
  data.forEach(emp => {
    let empIdx = 0;
    emps.forEach((el, idx) => {
      if (el._id === emp._id) empIdx = idx;
    });
    emps.splice(empIdx, 1, emp);
  })

  localStorage.setItem("emp", JSON.stringify(emps));

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Success !!!");
    }, getNetworkDelay())
  });
}


export const switchHead = (curHead = {}, futureHead = {}, deptId = "", teamId = "", isTeam = "teamId") => {
  let emps = JSON.parse(localStorage.getItem("emp"));
  const grps = JSON.parse(localStorage.getItem(isTeam.substring(0, 4)));
  let grp, grpIdx;
  if (grps) {
    grps.forEach((el, idx) => {
      if ((isTeam === "teamId" && el._id === teamId) || el._id === deptId) {
        grp = el; grpIdx = idx;
      }
    });
  }
  let head, headIdx, member, memberIdx;

  emps.forEach((el, idx) => {
    if (el._id === curHead._id) {
      head = el;
      headIdx = idx;
    }
    if (el._id === futureHead._id) {
      member = el;
      memberIdx = idx;
    }
  });

  member.isHead = true;
  member.deptId = deptId;
  member.teamId = teamId;
  head.isHead = false;
  head.deptId = deptId;
  head.teamId = teamId;

  grp.headEmp = { _id: futureHead._id, name: futureHead.name };

  emps.splice(headIdx, 1, head);
  emps.splice(memberIdx, 1, member);
  grps.splice(grpIdx, 1, grp);
  localStorage.setItem("emp", JSON.stringify(emps));
  localStorage.setItem(isTeam.substring(0, 4), JSON.stringify(grps));

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Success !!!");
    }, getNetworkDelay())
  });
}