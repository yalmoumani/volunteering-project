const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('keyup', (e) => {
    e.preventDefault();
    const content = document.getElementById('lala').value;

    // Clear existing table rows
    tableBody.innerHTML = "";

    // Fetch data based on the search input
    const url = 'http://localhost/singup/project/admin/getEventByCD.php';
    const dataToSend = {
        'content': content,
    };


    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json',
        },
    };
    console.log(requestOptions);

    fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            data.forEach(event => {
                const row = document.createElement("tr");
                for (const key in event) {
                    const cell = document.createElement("td");
                    cell.textContent = event[key];
                    row.appendChild(cell);
                }
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});
document.addEventListener('DOMContentLoaded', function () {
    const modalContainer = document.querySelector('.modal-container');
    const createEventButton = document.querySelector('.btn-outline-success');
    const cancelButton = document.querySelector('#cancelButton');
  
    createEventButton.addEventListener('click', function () {
      modalContainer.style.display = 'block';
    });
  
    cancelButton.addEventListener('click', function () {
      modalContainer.style.display = 'none';
    });
  });