<?php
include "../connection.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  session_start();

  // Destroy the session
  session_destroy();

  // Send JSON response indicating successful logout
  $response = array("message" => "Logout successful");
  echo json_encode($response);
}
?>