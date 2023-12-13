document.addEventListener("DOMContentLoaded", function () {
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      const confirmDelete = confirm(
        "Are you sure you want to delete this announcement?"
      );

      if (confirmDelete) {
        const deleteUrl = this.getAttribute("href");
        window.location.href = deleteUrl; // Redirect to the delete URL
      }
    });
  });
});
