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

  const isValid = validateForm();

  if (isValid) {
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
        // Handle the response from the server, if needed
        if (response.ok) {
          window.location.href = "/Views/Login/login.html"; // Redirect upon successful submission
        } else {
          // Handle error scenarios
          throw new Error('Network response was not ok.');
        }
      })
      .catch(error => {
        // Handle and display errors
        console.error('There was a problem with the fetch operation:', error);
        // You can display an error message on the page if needed
      });
  }
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
  } else {
    usernameValidation.innerHTML = ""; // Clear error message when the input is corrected
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
    } else {
      emailValidation.innerHTML = ""; // Clear error message when the input is corrected
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
    var ageDiff = today - dobDate;
    var age =Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365.25));
    if (age < 18) {
      dobValidation.innerHTML = "You must be at least 18 years old.";
      isValid = false;
    } else {
      dobValidation.innerHTML = ""; // Clear error message when the input is corrected
    }
  }

  // Validate password
  if (password.trim() === "") {
    passwordValidation.innerHTML = "Please enter a password.";
    isValid = false;
  } else {
    // Validate password length and complexity
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,12}$/;
    if (!passwordRegex.test(password)) {
      passwordValidation.innerHTML = "Password must be 6-12 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.";
      isValid = false;
    } else {
      passwordValidation.innerHTML = ""; // Clear error message when the input is corrected
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
    } else {
      confirmValidation.innerHTML = ""; // Clear error message when the input is corrected
    }
  }

  // Disable submit button if form is invalid
  const submitButton = document.getElementById('submitButton');
  submitButton.disabled = !isValid;

  return isValid;
}

// Function to check for changes or corrections in the input fields
function checkChanges() {
  const form = document.getElementById('myForm');
  const inputs = form.getElementsByTagName('input');

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('input', function() {
      validateForm();
    });
  }
}

// Run the checkChanges function
checkChanges();