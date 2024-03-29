import { nanoid } from "nanoid";

const names = [
  "Liam", "Emma", "Noah", "Olivia", "William", "Ava", "James", "Isabella",
  "Oliver", "Sophia", "Benjamin", "Charlotte", "Elijah", "Mia", "Lucas",
  "Amelia", "Mason", "Harper", "Logan", "Evelyn", "Alexander", "Abigail",
  "Ethan", "Emily", "Jacob", "Elizabeth", "Michael", "Sofia", "Daniel",
  "Avery", "Henry", "Ella", "Jackson", "Madison", "Sebastian", "Scarlett",
  "Aiden", "Victoria", "Matthew", "Aria", "Samuel", "Grace", "David",
  "Chloe", "Joseph", "Camila", "Carter", "Penelope", "Owen", "Riley",
  "Wyatt", "Layla", "John", "Lillian", "Jack", "Nora", "Luke", "Zoey",
  "Jayden", "Mila", "Dylan", "Aubrey", "Grayson", "Hannah", "Levi",
  "Lily", "Isaac", "Addison", "Gabriel", "Eleanor", "Julian", "Natalie",
  "Mateo", "Luna", "Anthony", "Savannah", "Jaxon", "Brooklyn", "Lincoln",
  "Leah", "Joshua", "Zoe", "Christopher", "Stella", "Andrew", "Hazel",
  "Theodore", "Ellie", "Caleb", "Paisley", "Ryan", "Audrey", "Asher",
  "Skylar", "Nathan", "Violet", "Thomas", "Claire", "Leo", "Bella"
];

function generateRandom10DigitNumber() {
  const min = 6000000000; // Smallest 10-digit number
  const max = 9999999999; // Largest 10-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const genEmp = () => {
  const emps = []
  for (let i = 0; i < names.length; i++) {
    const employee = {
      _id: nanoid(),
      cDate: new Date().toISOString(),
      status: "active",
      name: names[i],
      phNumber: generateRandom10DigitNumber()+"",
      emailId: "789456123.sikdar@gmail.com",
      teamId: "",
      deptId: "",
      position: "unknown",
      password: "123456",
      isHead: false
    };

    emps.push(employee);
  }

  localStorage.setItem("emp", JSON.stringify(emps));
}