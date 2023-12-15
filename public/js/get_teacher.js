document.addEventListener("DOMContentLoaded", function () {
  async function fetchSections() {
    const response = await fetch('/api/user/all?role=TEACHER');
    const data = await response.json();
    const sectionDropdown = document.getElementById("teacher-select");

    sectionDropdown.innerHTML = "";

    const option = document.createElement('option')
    option.disabled = true;
    option.text = "select section";
    sectionDropdown.appendChild(option)

    data.forEach((section) => {
      const option = document.createElement("option");
      option.value = section._id;
      option.text = section.name;
      sectionDropdown.appendChild(option);
    });
  }

  fetchSections(document.getElementById("grade").value);

  document.getElementById("grade").addEventListener("change", function () {
    var selectedGrade = this.value;
    fetchSections(selectedGrade);
  });
});
