document.addEventListener("DOMContentLoaded", init, false);
console.log("list");

let originalData, data, table, sortCol;
let sortAsc = false;

const pageSize = 10;
let curPage = 1;

document.getElementById("filterButton").addEventListener("click", () => {
  applyFilter();
});

async function applyFilter() {
  const filterValue = document.getElementById("filterBy").value;
  const searchTerm = document
    .getElementById("search-student")
    .value.toLowerCase();

  let filteredData = originalData.filter((student) => {
    const fieldValue = student[filterValue].toLowerCase();
    return fieldValue.includes(searchTerm);
  });

  curPage = 1;
  data = filteredData;
  renderTable();
}

async function init() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  let section = urlSearchParams.get("sectionName");
  if (section === null) {
    section = "all";
  }
  table = document.querySelector("#studentTable tbody");
  const response = await fetch(`/api/student/all?section=${section}`);

  originalData = await response.json();
  data = [...originalData]; // Create a copy of the original data
  renderTable();

  document.querySelectorAll("#userTable thead tr th").forEach((t) => {
    t.addEventListener("click", sort, false);
  });
  document
    .querySelector("#nextButton")
    .addEventListener("click", nextPage, false);
  document
    .querySelector("#prevButton")
    .addEventListener("click", previousPage, false);

  const deleteButtons = document.querySelectorAll("#delete-button");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      const userId = this.getAttribute("data-user-id");
      if (confirm("Are you sure you want to delete this user?")) {
        window.location.href = `/user/delete/${userId}`;
      }
    });
  });
}

function renderTable() {
  let result = "";
  data
    .filter((row, index) => {
      let start = (curPage - 1) * pageSize;
      let end = curPage * pageSize;
      if (index >= start && index < end) return true;
    })
    .forEach((student) => {
      result += `
    <tr>
      <td> ${student.gradeLevel}</td> 
      <td> ${student.studentNo}</td>
      <td> ${student.name}</td> 
      <td> ${student.email}</td>
      <td> ${student.gender}</td>
      <td> ${student.status} </td>
      <td>
        <a href="/student/${student._id}" class="edit-button">Update</a> |
        <a href="#" class="delete-button" id="delete-button" data-student-id="${student._id}">Delete</a>
      </td>
    </tr>
    `;
    });
  table.innerHTML = result;
}

function sort(e) {
  let thisSort = e.target.dataset.sort;
  if (sortCol === thisSort) sortAsc = !sortAsc;
  sortCol = thisSort;
  data.sort((a, b) => {
    if (a[sortCol] < b[sortCol]) return sortAsc ? 1 : -1;
    if (a[sortCol] > b[sortCol]) return sortAsc ? -1 : 1;
    return 0;
  });
  renderTable();
}

function previousPage() {
  if (curPage > 1) curPage--;
  renderTable();
}

function nextPage() {
  if (curPage * pageSize < data.length) curPage++;
  renderTable();
}
