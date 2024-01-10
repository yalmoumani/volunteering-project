<?php
include '../connection.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $currentDate = date('Y-m-d');

  $sql = "SELECT *
          FROM `events` 
          WHERE Last_registration >= '$currentDate'";

  $result = $con->query($sql);

  if ($result) {
    if ($result->num_rows > 0) {
      $searchResults = array();
      while ($row = $result->fetch_assoc()) {
        $searchResults[] = $row;
      }
      header('Content-Type: application/json');
      echo json_encode($searchResults);
    } else {
      echo json_encode(array('message' => 'No events found.'));
    }
  } else {
    echo json_encode(array('message' => 'Database error.'));
  }
} else {
  echo json_encode(array('message' => 'This endpoint only accepts GET requests.'));
}
?>