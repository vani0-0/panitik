document.addEventListener("DOMContentLoaded", async function () {
  var gradeSelect = document.getElementById("grade");
  const sectionDropdown = document.getElementById("section-select");

  async function fetchSections(grade, sectionId) {
    const response = await fetch(`/api/section?grade=${grade}`);
    const data = await response.json();

    sectionDropdown.innerHTML = "";

    let optionsHtml = `<option disabled value="" selected>Select section</option>`;
    data.forEach((section) => {
      optionsHtml += `<option value="${section._id}"} ${
        sectionId && sectionId === section._id ? "selected" : ""
      }>${section.name}</option>`;
    });
    sectionDropdown.innerHTML = optionsHtml;
  }

  gradeSelect.addEventListener("change", function () {
    var selectedGrade = this.value;
    fetchSections(selectedGrade);
  });

  var editMode = sectionDropdown.getAttribute("data-edit-mode") === "true";
  var section = sectionDropdown.getAttribute("data-student-section");
  if (editMode) {
    await fetchSections(gradeSelect.value, section);
  } else {
    await fetchSections(gradeSelect.value);
  }
});
