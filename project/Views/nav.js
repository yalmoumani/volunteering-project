function showLinks() {
    const signupLi = document.getElementById("signup-li");
    const loginLi = document.getElementById("login-li");
    const logoutLi = document.getElementById("logout-li");
  
    if (sessionStorage.getItem("isLoggedIn") === "true") {
      signupLi.style.display = "none";
      loginLi.style.display = "none";
      logoutLi.style.display = "block";
    } else {
      signupLi.style.display = "block";
      loginLi.style.display = "block";
      logoutLi.style.display = "none";
    }
  }
  
  // Check if the user is authenticated and show the links accordingly
  // You can replace this with your own authentication logic
  // Change this to "true" if the user is authenticated
  showLinks();
  
  // Add a click event listener to the logout link
  const logoutLink = document.getElementById("logout-link");
  if (logoutLink) {
    logoutLink.addEventListener("click", function(event) {
      event.preventDefault(); // Prevent the default link behavior
  
      // Fetch the logout PHP script
      fetch("http://localhost/yasmeen/volunteering-project/project/API/Login/logout.php", {
        method: "POST",
        credentials: "same-origin"
      })
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        if (data.message) {
          // Clear session storage
          sessionStorage.clear();
          window.location.href = "/Views/Login/login.html";
        } else {
          console.error(data.message);
        }
      })
      .catch(error => {
        // Handle fetch error
        console.error("Error:", error);
      });
    });
  }