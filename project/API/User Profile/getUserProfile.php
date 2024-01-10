<?php
       include "connection.php";
    session_start();
    if (!isset($_SESSION['userId'])) {
        header("Location: login.php");
        exit;
    }
    $userId = $_SESSION['userId']; //replace with actual formatting
    $sql = "SELECT * FROM users WHERE id = '$userId'";
    $result = mysqli_query($con, $sql);
    $row = mysqli_fetch_assoc($result);

    mysqli_close($con);
    ?>