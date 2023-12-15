let typingTimer;
const doneTypingInterval = 500;

const emailInput = document.getElementById("emailInput");
const emailStatus = document.getElementById("emailStatus");
const submitButton = document.getElementById("submitButton");
const userForm = document.getElementById("sectionForm");

emailInput.addEventListener("input", function () {
  clearTimeout(typingTimer);
  if (emailInput.value) {
    typingTimer = setTimeout(checkEmail, doneTypingInterval);
  }
});

function enableSubmitButton() {
  submitButton.disabled = false;
}

async function checkEmail() {
  const email = emailInput.value;

  const response = await fetch(`/api/user/check-email?email=${email}&role=TEACHER`);
  const data = await response.json();
  console.log(data)
  if (!data.exists) {
    emailStatus.innerText = "Email doesnt exist";
    emailStatus.style.color = "red";
    submitButton.disabled = true;
  } else {
    emailStatus.innerText = "Email is available";
    emailStatus.style.color = "green";
    enableSubmitButton();
  }
}

submitButton.disabled = false;
