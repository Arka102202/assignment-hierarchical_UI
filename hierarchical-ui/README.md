# Project models:

  ```
  employee = {
      _id: string,
      cDate: string,
      status: ["active", "suspended", "deleted"],
      name: string,
      phNumber: number,
      emailId: string,
      teamId: string,
      deptId: string,
      position: string
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
    - 1. `Employee`: this will store the info about a employee which has a `n:1` relationship with the team.
          So, I am only going to store the `teamId` with the employee otherwise there will be to much of duplication and also If I have change the team info then I have to do it for all the employee and that is very inconvenient for a large organization.
    - 2. `Team`: this will store the info about different team within a department. Team has a `n:1` relationship with the department.
          So, again I am storing only the reference of the department with the team. Also the name of the head of the team is stored with the team and the `_id` of that member, so that if needed we can get all the employee info on demand.
    - 3. `Dept` or department: All the department will be directly under the CEO of the company.

# Functionality of the web-app:


