import { getNetworkDelay } from "./employee";

export const readAll = (page = 1, limit = 10, searchString = "") => {
  const depts = JSON.parse(localStorage.getItem("dept"));
  const start = (page - 1) * limit;
  const end = start + limit;

  // filter using the searchString

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (depts && depts.length !== 0) {
        if (limit === -1) resolve(depts);
        else resolve(depts.slice(start, end));
      }
      else reject({ error: true, message: "No dept found", data: [] });
    }, getNetworkDelay())
  });
}

export const findOne = (value = "", key = "") => {
  const depts = JSON.parse(localStorage.getItem("dept"));
  let dept;
  if (depts) dept = depts.find(el => el[key] === value);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (dept)
        resolve(dept);
      else reject(new Error("No dept found"));
    }, getNetworkDelay())
  });
}

export const addOne = (data) => {
  let depts = JSON.parse(localStorage.getItem("dept"));
  let isNameExists = false;
  if (depts) {

    isNameExists = depts.some(el => el.name === data.name);

    if (!isNameExists)
      depts.push(data);
  }
  else depts = [data];

  localStorage.setItem("dept", JSON.stringify(depts));

  // filter using the searchString

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!isNameExists)
        resolve("Success !!!");
      else reject({ error: true, message: "duplicate name found", data: [] });
    }, getNetworkDelay())
  });
}


export const updateOne = (data) => {
  let depts = JSON.parse(localStorage.getItem("dept"));
  let isNameExists = false;
  isNameExists = depts.some(el => el.name === data.name && el._id !== data._id);
  if (!isNameExists) {
    let deptIdx = 0;
    depts.forEach((el, idx) => {
      if (el._id === data._id) deptIdx = idx;
    });
    depts.splice(deptIdx, 1, data);
  }
  localStorage.setItem("dept", JSON.stringify(depts));

  // filter using the searchString

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!isNameExists)
        resolve("Success !!!");
      else reject({ error: true, message: "duplicate name found", data: [] });
    }, getNetworkDelay())
  });
}