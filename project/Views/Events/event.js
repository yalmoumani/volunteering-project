const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get("eventId");
// Use the eventId value in your fetch request
fetch(`http://localhost/yasmeen/volunteering-project/project/API/Events/geteventbyID.php?eventId=${eventId}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
})
  .then(response => response.json())
  .then(data => {
    const eventsContainer = document.getElementById("main");

 
    const divOuter = document.createElement("div");
    divOuter.className = "outer";
    const divImage = document.createElement("div");
    divImage.className = "image";
    const img = document.createElement("img");
    img.src = data.Img;
    img.alt = "";
    img.style.width = "70%";
    img.styleheight = "100%";
    divImage.appendChild(img);
    divOuter.appendChild(divImage);

    const divDetails = document.createElement("div");
    divDetails.className = "details";

    const divTitle = document.createElement("div");
    divTitle.className = "title";
    const h1Title = document.createElement("h1");
    h1Title.textContent = data.E_name;
    divTitle.appendChild(h1Title);
    divDetails.appendChild(divTitle);

    const divLocationTime = document.createElement("div");
    divLocationTime.className = "location-time";

    const divTime = document.createElement("div");
    const iTime = document.createElement("i");
    iTime.className = "fa-regular fa-clock fa-2xl";
    iTime.style.color = "#000000";
    const pTime = document.createElement("p");
    pTime.innerHTML = `${data.E_date.substring(11, 16)} A.M`; // Extracting time without seconds
    divTime.appendChild(iTime);
    divTime.appendChild(pTime);
    divLocationTime.appendChild(divTime);

    const divDate = document.createElement("div");
    const iDate = document.createElement("i");
    iDate.className = "fa-regular fa-calendar-days fa-2xl";
    iDate.style.color = "#000000";
    const pDate = document.createElement("p");
    pDate.textContent = data.E_date.substring(0, 10); // Extracting date
    divDate.appendChild(iDate);
    divDate.appendChild(pDate);
    divLocationTime.appendChild(divDate);

    divDetails.appendChild(divLocationTime);

    const divLocationParticipants = document.createElement("div");
    divLocationParticipants.className = "row";

    const divLocation = document.createElement("div");
    const iLocation = document.createElement("i");
    iLocation.className = "fa-solid fa-location-dot fa-2xl";
    iLocation.style.color = "#000000";
    const pLocation = document.createElement("p");
    pLocation.textContent = data.Location;
    divLocation.appendChild(iLocation);
    divLocation.appendChild(pLocation);
    divLocationParticipants.appendChild(divLocation);

    const divParticipants = document.createElement("div");
    const iParticipants = document.createElement("i");
    iParticipants.className = "fa-solid fa-user fa-2xl";
    iParticipants.style.color = "#000000";
    const pParticipants = document.createElement("p");
    pParticipants.innerHTML = `${data.Registered} / ${data.E_limit}`; // Assuming the first value is current participants and the second value is the limit
    divParticipants.appendChild(iParticipants);
    divParticipants.appendChild(pParticipants);
    divLocationParticipants.appendChild(divParticipants);

    divDetails.appendChild(divLocationParticipants);

    const divDescription = document.createElement("div");
    divDescription.className = "description";
    const h2Description = document.createElement("h2");
    h2Description.textContent = "";
    divDescription.appendChild(h2Description);
    const pDescription = document.createElement("p");
    pDescription.textContent = data.Description;
    divDescription.appendChild(pDescription);
    divDetails.appendChild(divDescription);

    const divButtonRegister = document.createElement("div");
    const buttonRegister = document.createElement("button");
    buttonRegister.className = "buttons";
    buttonRegister.id = "register";
    buttonRegister.textContent = "Register";
    divButtonRegister.appendChild(buttonRegister);
    divDetails.appendChild(divButtonRegister);

    const divButtonUnregister = document.createElement("div");
    const buttonUnregister = document.createElement("button");
    buttonUnregister.className = "buttons";
    buttonUnregister.id = "unregister";
    buttonUnregister.textContent = "Unregister";
    divButtonUnregister.appendChild(buttonUnregister);
    divDetails.appendChild(divButtonUnregister);

    divOuter.appendChild(divDetails);
    eventsContainer.appendChild(divOuter);
  });