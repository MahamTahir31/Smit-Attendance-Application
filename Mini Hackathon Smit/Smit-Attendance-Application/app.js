import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

// for Realtime Database
import {
  getDatabase,
  set,
  ref,
  onValue, // onChildAdded, onChildRemoved, onChildChanged, on, get,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
const auth = getAuth();
const database = getDatabase();

const signup = () => {
  let username = document.getElementById("username").value; 
  let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value; 
  createUserWithEmailAndPassword(auth, email, password)
    .then((resolve) => {
      alert("successfully Signup");
      console.log(resolve);
      let userId = auth.currentUser.uid;
      console.log(userId);
      let usersReference = ref(database, "users/" + userId );  //ref func needed to make reference 
      let usersObj = {
        username: username,
        email: email,
        password: password,
        admin: "false"
      };
      set(usersReference, usersObj);  //set function
    })
    .catch((reject) => {
      alert("Signup failed!", reject);
    });
};

let signup_btn = document.getElementById("signup-btn");
if (signup_btn) {
  signup_btn.addEventListener("click", signup);
} else {
  const login = () => {
    let email = document.getElementById("login-email");
    let password = document.getElementById("login-password");
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((resolve) => {
        alert("successfully Login");
        // window.location.href = "./dashboard.html" ---- user will directly go to the dashboard after login.
        let userId = auth.currentUser.uid;
        let usernameRef = ref(database, "users/" + userId);  //parameters of ref--> 1)reference jaha se data get krna h, 2) what we need to get
        onValue(usernameRef, (data)=> { //get data from database
            let userData = data.val().username;
            let userDataEmail = data.val().email;
            let userDataPassword = data.val().password;
            let isAdmin = data.val().admin;
            console.log(userData, userDataEmail, userDataPassword);
            // to give data in a <p> tag with id=username
            // document.getElementById("username").innerHTML = userData; 
            if (isAdmin === "false") {
              // Redirect to classes.html
              window.location.href = "./Users.html";
            } else {
              // Redirect to dashboard.html for admins
              window.location.href = "./Admin.html";
            } 
        })
      })
      .catch((reject) => {
        alert(reject);
      });
  };

  let login_btn = document.getElementById("login-btn");
  login_btn.addEventListener("click", login);
}

/*
// Class Management details (classes)
const classForm = document.getElementById('class-form');
      const classList = document.getElementById('class-list');

      classForm.addEventListener('submit', function (e) {
          e.preventDefault();
      });

      document.getElementById('add-class').addEventListener('click', function () {
          const classTimings = document.getElementById('class-timings').value;
          const schedule = document.getElementById('schedule').value;
          const teacherName = document.getElementById('teacher-name').value;
          const sectionName = document.getElementById('section-name').value;
          const courseName = document.getElementById('course-name').value;
          const batchNumber = document.getElementById('batch-number').value;

          const newRow = document.createElement('tr');
          newRow.innerHTML = `
              <td>${classTimings}</td>
              <td>${schedule}</td>
              <td>${teacherName}</td>
              <td>${sectionName}</td>
              <td>${courseName}</td>
              <td>${batchNumber}</td>
              <td><button class="delete-btn">Delete</button></td>
          `;

          classList.appendChild(newRow);

          // Clear the form fields
          classForm.reset();
      });

      classList.addEventListener('click', function (e) {
          if (e.target.classList.contains('delete-btn')) {
              e.target.closest('tr').remove();
          }
      });

      
//  Student Management details (studentDetails)

// Sample student data array (you should load this from a database in a real application)
let studentsData = [];

// Function to add a student to the list and update the table
function addStudentToTable(student) {
  const table = document.getElementById('student-list');
  const newRow = table.insertRow(table.rows.length);
  
  const cellName = newRow.insertCell(0);
  const cellFatherName = newRow.insertCell(1);
  const cellRollNo = newRow.insertCell(2);
  const cellContactNo = newRow.insertCell(3);
  const cellCnicNo = newRow.insertCell(4);
  const cellCourseName = newRow.insertCell(5);
  const cellAssignedClass = newRow.insertCell(6);
  const cellPicture = newRow.insertCell(7);
  const cellActions = newRow.insertCell(8);
  
  cellName.innerHTML = student.name;
  cellFatherName.innerHTML = student.fatherName;
  cellRollNo.innerHTML = student.rollNumber;
  cellContactNo.innerHTML = student.contactNumber;
  cellCnicNo.innerHTML = student.cnicNumber;
  cellCourseName.innerHTML = student.courseName;
  cellAssignedClass.innerHTML = student.assignedClass;
  cellPicture.innerHTML = '<img src="' + student.picture + '" width="50" height="50">';
  
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', function() {
      editStudent(student, newRow.rowIndex);
  });
  cellActions.appendChild(editButton);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function() {
      deleteStudent(newRow.rowIndex);
  });
  cellActions.appendChild(deleteButton);
}

// Function to add a new student when the form is submitted
document.getElementById('add-student').addEventListener('click', function() {
  const name = document.getElementById('name').value;
  const fatherName = document.getElementById('father-name').value;
  const rollNumber = document.getElementById('roll-number').value;
  const contactNumber = document.getElementById('contact-number').value;
  const cnicNumber = document.getElementById('cnic-number').value;
  const picture = document.getElementById('picture').value; // You need to handle file upload appropriately
  const courseName = document.getElementById('course-name').value;
  const assignedClass = document.getElementById('assigned-class').value;

  const student = {
      name,
      fatherName,
      rollNumber,
      contactNumber,
      cnicNumber,
      picture,
      courseName,
      assignedClass,
  };

  // Add the student to the data array
  studentsData.push(student);

  // Add the student to the table
  addStudentToTable(student);

  // Clear the form fields
  document.getElementById('student-form').reset();
});

// Function to edit a student's information
function editStudent(student, rowIndex) {
  // Implement your code to edit the student's information here
}

// Function to delete a student's information
function deleteStudent(rowIndex) {
  const table = document.getElementById('student-list');
  table.deleteRow(rowIndex);
  
  // Implement your code to delete the student's information from the data array here
  studentsData.splice(rowIndex - 1, 1);
}
*/

// Add classes

const db = firebase.database();
let classTimings = document.getElementById("classTimings");
let scheduleOfClasses = document.getElementById("scheduleOfClasses");
let teacherName = document.getElementById("teacherName");
let sectionName = document.getElementById("sectionName");
let courseName = document.getElementById("courseName");
let batchNumber = document.getElementById("batchNumber");
const classesRef = db.ref("classes");
// Sample class data
let classData = {
classTimings: classTimings,
scheduleOfClasses: scheduleOfClasses,
teacherName: teacherName,
sectionName: sectionName,
courseName: courseName,
batchNumber: batchNumber
};

// Push the class data to the "classes" reference
const newClassRef = classesRef.push(classData);

// Optionally, you can retrieve the new class's unique key using newClassRef.key
console.log("Class created with key: " + newClassRef.key);