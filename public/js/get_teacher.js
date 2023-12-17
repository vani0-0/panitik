document.addEventListener("DOMContentLoaded", async function () {
  const teacherDropdown = document.getElementById("teacher-select");

  async function fetchTeachers(teacherId) {
    const response = await fetch("/api/user/all?role=TEACHER");
    const data = await response.json();

    teacherDropdown.innerHTML = "";

    let optionsHtml = `<option disabled value="" selected>Select teacher</option>`;
    data.forEach((teacher) => {
      optionsHtml += `<option value="${teacher._id}"} ${
        teacherId && teacherId === teacher._id ? "selected" : ""
      }>${teacher.name}</option>`;
    });
    teacherDropdown.innerHTML = optionsHtml;
  }

  var teacher = teacherDropdown.getAttribute("data-section-teacher");
  await fetchTeachers(teacher ?? "");
});
