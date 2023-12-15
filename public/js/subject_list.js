document.addEventListener("DOMContentLoaded", init, false);
console.log("list");

let data, table, sortCol;
let sortAsc = false;

const pageSize = 10;
let curPage = 1;

async function init() {
  table = document.querySelector("#subjectTable tbody");
  let response = await fetch("/api/subject/all");
  data = await response.json();
  renderTable();
  console.log(data)
  document.querySelectorAll("#subjectTable thead tr th").forEach((t) => {
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
      const subjectId = this.getAttribute("data-subject-id");
      if (confirm("Are you sure you want to delete this subject?")) {
        window.location.href = `/subject/delete/${subjectId}`;
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
    .forEach((subject) => {
      result += `
    <tr>
      <td> ${subject.gradeLevel}</td>
      <td> ${subject.section.name}</td>
      <td> ${subject.name}</td>
      <td> ${subject.teacher.name}</td>
      <td> ${subject.subjectCode}</td>
      
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
{/* <td>
        <a href="/student?subjectName=${subject.name}" class="edit-button">View Students</a> |
        <a href="/subject/${subject._id}" class="edit-button">Edit</a> |
        <a href="#" class="delete-button" id="delete-button" data-subject-id="${subject._id}">Delete</a>
      </td> */}