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