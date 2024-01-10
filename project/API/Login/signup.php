<?php
include "../connection.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $data = json_decode(file_get_contents('php://input'), true);

  if ($data) {
    $username = $data["username"];
    $name = $data["name"];
    $email = $data["email"];
    $password = $data["password"];
    $date_of_birth = $data["date_of_birth"];
    $img = $data["img"];

    // Check if the email already exists in the database
    $check_email_query = "SELECT * FROM users WHERE email = ?";
    $stmt_check_email = $con->prepare($check_email_query);
    $stmt_check_email->bind_param("s", $email);
    $stmt_check_email->execute();
    $result_email = $stmt_check_email->get_result();

    if ($result_email->num_rows > 0) {
      $response = array('error' => "Email already exists. Please choose a different email.");
      echo json_encode($response);
      exit;
    }

    // Check if the username already exists in the database
    $check_username_query = "SELECT * FROM users WHERE username = ?";
    $stmt_check_username = $con->prepare($check_username_query);
    $stmt_check_username->bind_param("s", $username);
    $stmt_check_username->execute();
    $result_username = $stmt_check_username->get_result();

    if ($result_username->num_rows > 0) {
      $response = array('error' => "Username already exists. Please choose a different username.");
      echo json_encode($response);
      exit;
    }

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    // Save the image file
    $imageDir = "../../public/images/";
    $imageName = uniqid() . ".jpg"; // Generate a unique name for the image
    $imagePath = $imageDir . $imageName;
    $decodedImage = base64_decode($img);
    file_put_contents($imagePath, $decodedImage);

    // Insert user data into the database
    $insert_query = "INSERT INTO users (username, name, email, password, date_of_birth, img) VALUES (?, ?, ?, ?, ?, ?)";   
    $stmt = $con->prepare($insert_query);
    $stmt->bind_param("ssssss", $username, $name, $email, $hashed_password, $date_of_birth, $imagePath);
    if ($stmt->execute()) {
      $response = array('success' => true);
      echo json_encode($response);
    } else {
      $response = array('error' => "Error: " . $stmt->error);
      echo json_encode($response);
    }
  } else {
    $response = array('error' => "Invalid JSON data.");
    echo json_encode($response);
  }
}
?>