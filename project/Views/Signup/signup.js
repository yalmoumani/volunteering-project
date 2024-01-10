let currentPage = 0;
const pages = document.querySelectorAll('.page');

function showPage(pageNumber) {
  pages.forEach((page, index) => {
    if (index === pageNumber) {
      page.style.display = 'block';
    } else {
      page.style.display = 'none';
    }
  });
}

function nextPage(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  if (currentPage < pages.length - 1) {
    currentPage++;
    showPage(currentPage);
  }
}

function previousPage(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  if (currentPage > 0) {
    currentPage--;
    showPage(currentPage);
  }
}

function submitForm(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const dateOfBirth = document.getElementById('date_of_birth').value;
  const password = document.getElementById('password').value;
  const img = document.getElementById('img').value;
  const username = document.getElementById('username').value;

  const user = {
    name: name,
    email: email,
    date_of_birth: dateOfBirth,
    password: password,
    img: img,
    username: username
  };

  fetch('http://localhost/yasmeen/volunteering-project/project/API/Login/signup.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .then(data => {
      if (data.success) {
        window.location.href = "/Views/Login/login.html"; // Redirect upon successful submission
      } else {
        const emailValidation = document.getElementById('emailValidation');
        emailValidation.innerHTML = "Email already exists. Please choose a different email.";
      }
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

showPage(currentPage);

// Add event listeners to the "Next" and "Previous" buttons
const nextButton = document.getElementById('nextButton');
nextButton.addEventListener('click', nextPage);

const previousButton = document.getElementById('previousButton');
previousButton.addEventListener('click', previousPage);

// Add event listener to the form submission
const form = document.getElementById('myForm');
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  const isValid = validateForm();

  if (isValid) {
    submitForm(event);
  }
});

// Function to validate the form inputs
function validateForm() {
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var dob = document.getElementById("date_of_birth").value;
  var password = document.getElementById("password").value;
  var confirm = document.getElementById("confirm").value;

  var usernameValidation = document.getElementById("usernameValidation");
  var emailValidation = document.getElementById("emailValidation");
  var dobValidation = document.getElementById("dobValidation");
  var passwordValidation = document.getElementById("passwordValidation");
  var confirmValidation = document.getElementById("confirmValidation");

  // Clear error messages
  usernameValidation.innerHTML = "";
  emailValidation.innerHTML = "";
  dobValidation.innerHTML = "";
  passwordValidation.innerHTML = "";
  confirmValidation.innerHTML = "";

  var isValid = true;

  // Validate name
  if (username.trim() === "") {
    usernameValidation.innerHTML = "Please enter your name.";
    isValid = false;
  }

  // Validate email
  if (email.trim() === "") {
    emailValidation.innerHTML = "Please enter your email.";
    isValid = false;
  } else {
    // Validate email format
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailValidation.innerHTML = "Please enter a valid email address.";
      isValid = false;
    }
  }

  // Validate date of birth
  if (dob.trim() === "") {
    dobValidation.innerHTML = "Please enter your date of birth.";
    isValid = false;
  } else {
    // Validate minimum age of 18
    var today = new Date();
    var dobDate = new Date(dob);
    var ageDiff =new Date() - new Date(dob);
    var ageDate = new Date(ageDiff);
    var age = Math.abs(ageDate.getUTCFullYear() - 1970);
    if (age < 18) {
      dobValidation.innerHTML = "You must be at least 18 years old.";
      isValid = false;
    }
  }
// Validate password
if (password.trim() === "") {
  passwordValidation.innerHTML = "Please enter a password.";
  isValid = false;
} else {
  // Validate password length
  if (password.length < 6 || password.length > 12) {
    passwordValidation.innerHTML = "Password must be between 6 and 12 characters long.";
    isValid = false;
  }
  // Validate password complexity
  else if (
    !/[A-Z]/.test(password) || // At least one uppercase letter
    !/[a-z]/.test(password) || // At least one lowercase letter
    !/\d/.test(password) ||    // At least one digit
    !/[!@#$%^&*]/.test(password) // At least one special character
  ) {
    passwordValidation.innerHTML =
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.";
    isValid = false;
  }
}

// Validate password confirmation
if (confirm.trim() === "") {
  confirmValidation.innerHTML = "Please confirm your password.";
  isValid = false;
} else {
  // Validate password match
  if (password !== confirm) {
    confirmValidation.innerHTML = "Passwords do not match.";
    isValid = false;
  }
}

  return isValid;
}