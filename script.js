document.addEventListener("DOMContentLoaded", function () {
  storeDataToTable();
  displaySpecificPage(currentPage);
});

let users = [];
function validate() {
  let name = document.getElementById("username").value;
  let email = document.getElementById("mailid").value;
  let age = document.getElementById("age").value;
  let phone = document.getElementById("phone").value;

  const nameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const ageRegex = /^(1[8-9]|[2-9]\d)$/;
  const phoneRegex = /^\d{3}[-\s]?\d{3}[-\s]?\d{4}$/;

  if (!nameRegex.test(name)) {
    alert("Please Enter Valid Name");
    return false;
  }

  if (!emailRegex.test(email)) {
    alert("Please Enter Valid Email");
    return false;
  }

  if (!ageRegex.test(age)) {
    alert("Please Enter Valid Age");
    return false;
  }

  if (!phoneRegex.test(phone)) {
    alert("Please Enter Valid Phonenumber");
    return false;
  }
  let user = {
    name: name,
    email: email,
    age: age,
    phone: phone,
  };

  let users = JSON.parse(localStorage.getItem("users")) || [];

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  console.log("Users after submission:", users);
  displaySpecificPage(currentPage);

  return true;
}

var tBody = document.getElementById("tableBody");
function storeDataToTable() {
  users = JSON.parse(localStorage.getItem("users")) || [];

  tBody.innerHTML = "";
  users.forEach((element) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${element.name}</td>
      <td>${element.email}</td>
      <td>${element.age}</td>
      <td>${element.phone}</td>`;
    tBody.appendChild(row);
  });
}

const perPage = 5;
var rows = tBody.querySelectorAll("tr");
let currentPage = 1;

var prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

var searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.age.toString().includes(searchTerm) ||
      user.phone.includes(searchTerm)
  );

  // Clear the table body
  tBody.innerHTML = "";

  // Add new rows for the search results
  filteredUsers.forEach((user) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.age}</td>
      <td>${user.phone}</td>`;
    tBody.appendChild(row);
  });
  rows = tBody.querySelectorAll("tr"); 

  currentPage = 1;
  displaySpecificPage(currentPage);
  updatePagination();
});

prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displaySpecificPage(currentPage);
  }
});

nextButton.addEventListener("click", () => {
  const totalPages = Math.ceil(rows.length / perPage);
  if (currentPage < totalPages) {
    currentPage++;
    displaySpecificPage(currentPage);
  }
});

function displaySpecificPage(page) {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const rows = tBody.querySelectorAll("tr");

  rows.forEach((row, index) => {
    if (index >= startIndex && index < endIndex) {
      row.style.display = "table-row";
    } else {
      row.style.display = "none";
    }
  });

  updatePagination();
}

function updatePagination() {
  const totalPages = Math.ceil(rows.length / perPage);
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
}


//sort

