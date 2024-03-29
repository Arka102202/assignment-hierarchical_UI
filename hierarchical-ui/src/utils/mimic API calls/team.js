import { getNetworkDelay } from "./employee";

export const readAll = (page = 1, limit = 10, deptId = "", searchString = "") => {
  let teams = JSON.parse(localStorage.getItem("team"));
  if (teams)
    teams = teams.filter(el => el.deptId === deptId);
  const start = (page - 1) * limit;
  const end = start + limit;

  // filter using the searchString

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (teams && teams.length !== 0)
        if (limit === -1) resolve(teams);
        else resolve(teams.slice(start, end));
      else reject({ error: true, message: "No team found", data: [] });
    }, getNetworkDelay())
  });
}

export const findOne = (value = "", key = "") => {
  const teams = JSON.parse(localStorage.getItem("team"));
  let team;
  if (teams) team = teams.find(el => el[key] === value);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (team)
        resolve(team);
      else reject(new Error("No team found"));
    }, getNetworkDelay())
  });
}

export const addOne = (data) => {
  let teams = JSON.parse(localStorage.getItem("team"));
  let isNameExists = false;
  if (teams) {

    isNameExists = teams.some(el => el.name === data.name);

    if (!isNameExists)
      teams.push(data);
  }
  else teams = [data];

  localStorage.setItem("team", JSON.stringify(teams));

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
  let teams = JSON.parse(localStorage.getItem("team"));
  let isNameExists = false;
  isNameExists = teams.some(el => el.name === data.name && el._id !== data._id);
  if (!isNameExists) {
    let teamIdx = 0;
    teams.forEach((el, idx) => {
      if (el._id === data._id) teamIdx = idx;
    });
    teams.splice(teamIdx, 1, data);
  }
  localStorage.setItem("team", JSON.stringify(teams));

  // filter using the searchString

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!isNameExists)
        resolve("Success !!!");
      else reject({ error: true, message: "duplicate name found", data: [] });
    }, getNetworkDelay())
  });
}