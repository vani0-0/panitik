let typingTimer;
const doneTypingInterval = 500;

const emailInput = document.getElementById("emailInput");
const emailStatus = document.getElementById("emailStatus");
const submitButton = document.getElementById("submitButton");
const userForm = document.getElementById("userForm");

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

  const response = await fetch(`/api/user/check-email?email=${email}`);
  const data = await response.json();

  if (data.exists) {
    emailStatus.innerText = "Email already exists";
    emailStatus.style.color = "red";
    submitButton.disabled = true;
  } else {
    emailStatus.innerText = "Email is available";
    emailStatus.style.color = "green";
    enableSubmitButton();
  }
}

submitButton.disabled = true;
