const getTime = () => Math.trunc((Math.random() * 901) + 100);

export const readAll = (page = 1, limit = 10, searchString = "") => {
  const employees = JSON.parse(localStorage.getItem("emp"));
  const start = (page - 1) * limit;
  const end = start + limit;

  // filter using the searchString

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (employees.length !== 0)
        resolve(employees.slice(start, end));
      else reject(new Error("No user found"));
    }, getTime())
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
        console.log(value, process.env.REACT_APP_USERNAME);
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
    }, getTime())
  });
}