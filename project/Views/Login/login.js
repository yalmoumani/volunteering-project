document.getElementById("login-button").addEventListener("click", function (e) {
    e.preventDefault(); // Prevent form submission
  
    const enterEmail = document.getElementById("email").value; // Get the entered email
    const enterPassword = document.getElementById("password1").value;
    const errormessage = document.getElementById("errormessage");
  
    // Create a request object
    const request = {
      email: enterEmail,
      password: enterPassword
    };
  
    // Send a POST request to the login API endpoint
    fetch("http://localhost/yasmeen/volunteering-project/project/API/Login/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.success) {
          // Extract user data from the response
          const storedUsername = data.username;
          const storedRole = data.role;
          const storedUserId = data.user_id;
  
          // Store user data in session storage or cookies
          sessionStorage.setItem("isLoggedIn", "true");
          sessionStorage.setItem("role", storedRole);
          sessionStorage.setItem("username", storedUsername);
          sessionStorage.setItem("user_id", storedUserId);
  
          // Redirect based on role
          if (storedRole === 1) {
            window.location.href = "/Views/Admin/admin.html";
          } else if (storedRole === 2) {
            window.location.href = "../main.html";
          }
        } else {
          if (data && data.error === "Invalid email") {
            errormessage.textContent = "Please check your email and try again.";
          } else if (data && data.error === "Invalid password") {
            errormessage.textContent = "Please check your password and try again.";
          } else {
            errormessage.textContent = "Please enter your email and password.";
          }
        }
      })
      .catch(error => {
        console.error("Network Error:", error);
        errormessage.textContent = "A network error occurred during login";
      });
  });