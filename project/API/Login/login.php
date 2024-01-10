<?php
session_start(); 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../connection.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $data = json_decode(file_get_contents('php://input'), true);

  if ($data && isset($data["email"]) && isset($data["password"])) {
    $email = $data["email"];
    $password = $data["password"];

    if (empty($email) || empty($password)) {
      $response = array('success' => false, 'error' => 'Email and password cannot be empty');
      header("Content-Type: application/json");
      echo json_encode($response);
      exit;
    }

    $query = "SELECT username, Id, Role, password FROM users WHERE email = ?";
    $stmt = $con->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($username, $Id, $Role, $stored_password);
    $result = $stmt->fetch();

    if ($result) {
      if (password_verify($password, $stored_password)) {
        $_SESSION['username'] = $username;
        $_SESSION['user_id'] = $Id;
        $_SESSION['role'] = $Role;

        $response = array('success' => true, 'username' => $username, 'role' => $Role, 'user_id' => $Id);
        header("Content-Type: application/json");
        echo json_encode($response);
      } else {
        $response = array('success' => false, 'error' => 'Invalid password');
        header("Content-Type: application/json");
        echo json_encode($response);
      }
    } else {
      $response = array('success' => false, 'error' => 'Invalid email');
      header("Content-Type: application/json");
      echo json_encode($response);
    }

    $stmt->close();
  } else {
    $response = array('success' => false, 'error' => 'Invalid JSON data');
    header("Content-Type: application/json");
    echo json_encode($response);
  }
}

$con->close();
?>