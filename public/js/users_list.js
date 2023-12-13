document.addEventListener("DOMContentLoaded", init, false);
console.log("list");

let data, table, sortCol;
let sortAsc = false;

const pageSize = 10;
let curPage = 1;

async function init() {
  table = document.querySelector("#userTable tbody");
  let response = await fetch("/api/user/all");
  data = await response.json();
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
    .forEach((user) => {
      result += `
    <tr>
      <td> ${user.name}</td>
      <td> ${user.email}</td>
      <td> ${user.role}</td>
      <td>
        <a href="/user/${user._id}" class="edit-button">Edit</a> |
        <a href="#" class="delete-button" id="delete-button" data-user-id="${user._id}">Delete</a>
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
