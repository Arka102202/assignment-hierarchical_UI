# Basic project details:

  This is a web-app to visualize the hierarchical structure of a company. So, the users will only be the company's employees. There will not be any `signUp` feature but a `login` form will be provided for the employees of the company, for this I am creating a demo `username`=`Arkadyuti` and `password`=`123456`. Upon login user will be able to perform all the actions like `creating` new `department`s, `team`s, `employee`s, `adding` `employee`s to a `team` as members and all other stuff.

  At the time of `adding` a new `employee` the default `username` will the `emailId` and `password` will be the first part of the `emailId`, e.g. `emailId`: 789456123.sikdar@gmail.com, then  `username`: 789456123.sikdar@gmail.com and `password`: 789456123.sikdar.
  The demo `username` and `password` is `username`=`Arkadyuti` and `password`=`123456`.

  Head of any department will be able to see all the team and members info of the department, Head of the team will be able to see all the members info.

  This web-app has two pages:

  1.  `/`:
      this page will hold the hierarchical UI part of the web page and user will be able to navigate through the UI to info about different departments and teams.

  2.  `/allEmployees`:
      this page will show a tabular representation of all the employees and user will be able to `filter` an employee by `Employee Name`, `Phone Number`, and `Email ID`.

  `Assumptions`:
  1. `An employee from HR can't be moved to the design team` to implement this the department name has to be exactly `HR` and `Design`.
  2. Employees can be added without assigning to any team or department, but a department will must have a `Head`, and a team will must have a `Head` and `At-least one member`.
  3. 


# Project models:

  ```
  employee = {
      _id: string,
      cDate: string,
      status: ["active", "suspended", "deleted"],
      name: string,
      phNumber: string,
      emailId: string,
      teamId: string,
      deptId: string,
      position: string,
      password: string,
      isHead: boolean
  };
  team = {
    _id: string,
    cDate: string,
    status: ["active", "inActive", "deleted"],
    name: string,
    deptId: string,
    hasHead: boolean,
    headEmp: {
      name: string,
      _id: string,
    }
  };
  dept = {
    _id: string,
    cDate: string,
    status: ["active", "inActive", "deleted"],
    name: string,
    hasHead: boolean,
    headEmp: {
      name: string,
      _id: string,
    }
  } 
```
  - In order to create this hierarchical structure we need 3 data storing models:
    1. `Employee`: this will store the info about a employee which has a `n:1` relationship with the team.
          So, I am only going to store the `teamId` with the employee otherwise there will be to much of duplication and also If I have change the team info then I have to do it for all the employee and that is very inconvenient for a large organization.
    2. `Team`: this will store the info about different team within a department. Team has a `n:1` relationship with the department.
          So, again I am storing only the reference of the department with the team. Also the name of the head of the team is stored with the team and the `_id` of that member, so that if needed we can get all the employee info on demand.
    3. `Dept` or department: All the department will be directly under the CEO of the company.

# Functionality of the web-app:

  1.  Able to view the `HIERARCHICAL-VIEW` of the company:
      this has been implemented in a drop-down fashion. to see all the dept. in the company, one has to `click` on the `CEO tab` then that will display all the departments in the company. in the same way to see all the team under a dept on has to `click` on that particular `dept tab` and so on.
  2.  able to perform actions like - `Add`, `Modify`, `promoting-to-head-of-team/dept`, `Add-to-team`, `Transfer-to-team` and 
      `Remove-from-team` with  
      an `employee`:
      - at the end of each employee row there will be `four buttons` for - `Modify`, `Transfer-to-team`, `Remove-from-team`, `promoting-to-head-of-team/dept`.
      - at the team level there will be one button to `Add` a completely new member to the team after creating the actual employee, 
        one button to `Add multiple existing employee` as member, one button to `Remove multiple existing employee` from the team and if a `replacement teamId and deptId` then they will be added to that team, other wise they will be team less until they are assigned one and one more button to `transfer multiple existing member` to another team(An employee from HR can't be moved to the design team).
      - `Adding a single new employee` can be done from `/allEmployee` page and at the time of creation if the teamId and deptId are 
        provided then the employee will be added to that team.
      - `Add-to-team` button will be provided on the `/allEmployee` page to add multiple employee to a specific team. 
  3.  able to perform actions like - `Add`, `modify` with a `team`:
      - there will be two button one at the dept level and one at the global level to `add a team` to a specific dept.
      - one button will be provided to `modify` the info of any team at the tam level.
  4.  able to perform actions like -  `Add`, `Modify` with a `dept`:
      - there will be two button one at the CEO level and one at the global level to `add a dept`.
      - one button will be provided to `modify` the info of any dept at the dept level.
  5.  able to `search` for a `team` or `department` by `name`: 
  6.  able to `filter` an employee by `Employee Name`, `Phone Number`, and `Email ID`: 
  7.  only the head of a team will be able to see the employee: 
      * In order to implement this feature, I am providing a fake account aspect to the web app, so that I cam keep track of the employee 
        is logged in and based on that info I will be able implement this feature.