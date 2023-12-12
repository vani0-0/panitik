console.log("delete.js");

const deleteButtons = document.querySelectorAll(".delete-button");

deleteButtons.forEach((button) => {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    const userId = this.getAttribute("data-user-id");
    if (confirm("Are you sure you want to delete this user?")) {
      window.location.href = `/delete-user/${userId}`;
    }
  });
});
