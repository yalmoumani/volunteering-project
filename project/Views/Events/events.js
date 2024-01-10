fetch("http://localhost/yasmeen/volunteering-project/project/API/Events/getEvents.php", {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
})
  .then(response => response.json())
  .then(data => {
    if (data && data.length > 0) {
      const eventsContainer = document.getElementById("events-container");

      data.forEach(event => {
        const card = document.createElement("div");
        card.classList.add("card");

        const image = document.createElement("img");
        image.src = event.Img;
        image.alt = "";
        image.width = "100px";

        const details = document.createElement("div");
        details.classList.add("details");

        const title = document.createElement("div");
        title.classList.add("title");
        const titleHeading = document.createElement("h3");
        titleHeading.textContent = event.E_name;
        title.appendChild(titleHeading);

        const category = document.createElement("div");
        category.classList.add("category");
        const categoryHeading = document.createElement("h4");
        categoryHeading.textContent = event.Category;
        category.appendChild(categoryHeading);

        const locationDate = document.createElement("div");
        locationDate.classList.add("location-date");

        const location = document.createElement("div");
        location.classList.add("location");
        const locationIcon = document.createElement("i");
        locationIcon.classList.add("fa-solid", "fa-location-dot");
        locationIcon.style.color = "#4c4c4d";
        const locationText = document.createElement("p");
        locationText.innerHTML = `<i class="fa-solid fa-location-dot" style="color: #4c4c4d;"></i> ${event.Location}`;
        location.appendChild(locationText);

        const date = document.createElement("div");
        date.classList.add("date");
        const dateIcon = document.createElement("i");
        dateIcon.classList.add("fa-regular", "fa-calendar-days");
        dateIcon.style.color = "#4c4c4d";
        const dateText = document.createElement("p");
        const eventDate = new Date(event.E_date);
        dateText.innerHTML = `<i class="fa-regular fa-calendar-days" style="color: #4c4c4d;"></i> ${eventDate.toLocaleDateString([], { day: 'numeric', month: 'numeric', year: 'numeric' })}`;
        date.appendChild(dateText);

        const time = document.createElement("div");
        time.classList.add("time");
        const timeIcon = document.createElement("i");
        timeIcon.classList.add("fa-regular", "fa-clock");
        timeIcon.style.color = "#000000";
        const timeText = document.createElement("p");
        const eventTime = eventDate.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });
        timeText.innerHTML = `<i class="fa-regular fa-clock" style="color: #000000;"></i> ${eventTime}`;
        time.appendChild(timeText);

        const description = document.createElement("div");
        description.classList.add("description");
        const descriptionText = document.createElement("p");
        descriptionText.textContent = event.Description;
        description.appendChild(descriptionText);

    
        const button = document.createElement("div");
        button.classList.add("button");
        const viewEventLink = document.createElement("a");
        viewEventLink.href = `/Views/Events/event.html?eventId=${event.E_Id}`;
        viewEventLink.textContent = "View Event";
        // Attach the eventId as a data attribute to the link
        viewEventLink.dataset.eventId = event.E_Id;

        // Add event listener to check login status before navigating to event page
        viewEventLink.addEventListener("click", function(event) {
          event.preventDefault(); // Prevent default link behavior

          // Check if the user is logged in
          const isLoggedIn = sessionStorage.getItem("isLoggedIn");

          if (isLoggedIn) {
            // If logged in, navigate to the event page
            window.location.href = viewEventLink.href;
          } else {
            // If not logged in, show popup message
            alert("Please login or sign up to view the event.");
          }
        });

        button.appendChild(viewEventLink);

        locationDate.appendChild(location);
        locationDate.appendChild(date);
        locationDate.appendChild(time);

        details.appendChild(title);
        details.appendChild(category);
        details.appendChild(locationDate);
        details.appendChild(description);
        details.appendChild(button);

        card.appendChild(image);
        card.appendChild(details);

        eventsContainer.appendChild(card);
      });
    } else {
      console.error("Error: No events found");
    }
  })
  .catch(error => {
    console.error("Network Error:", error);
    errormessage.textContent = "A network error occurred.";
  });
  