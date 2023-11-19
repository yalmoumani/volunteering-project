<?php
// Include the database connection file
include "connection.php";

// Set the appropriate headers
header('Content-Type: application/json');

// Check if the request is for user details
if ($_GET['action'] === 'user') {
  // Retrieve the user details from the database
  $userId = $_GET['userId'];
  $sql = "SELECT * FROM users WHERE id = '$userId'";
  $result = mysqli_query($con, $sql);
  $row = mysqli_fetch_assoc($result);

  // Return the user details as JSON response
  echo json_encode($row);
}

// Check if the request is for event details
if ($_GET['action'] === 'event') {
  // Retrieve the event details from the database
  $eventId = $_GET['eventId'];
  $sql = "SELECT * FROM events WHERE E_Id = '$eventId'";
  $result = mysqli_query($con, $sql);
  $row = mysqli_fetch_assoc($result);

  // Return the event details as JSON response
  echo json_encode($row);
}

// Close the database connection
mysqli_close($con);
?>
```