<?php
session_start();
include 'include.php';


?>

<!DOCTYPE html>
<html>
<head>
    <title>Login Form</title>
    <!-- Include Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        body{
            background-color: #eeeeee;
        }
        .container{
            box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
                        padding: 50px;

            margin-top: 50px;
        }
        .submit-btn{
            display: flex;
            justify-content: end;
        }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="index.php">My Website</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="btn btn-success ml-2" href="signup.php">Sign Up</a>
                </li>
            </ul>
        </div>
    </nav>
    <div class="container">
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <h2 class="text-center mt-4">Login</h2>
                <form method="post">
                    <div class="form-group">
                        <label for="username">Username or Email</label>
                        <input type="text" class="form-control" id="username" name="email" placeholder="Enter your email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" id="password" name="password" placeholder="Enter your password" required>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="remember">
                        <label class="form-check-label" for="remember">Remember me</label>
                    </div>
                    
                    <div class="submit-btn">
                        <button type="submit" class="btn btn-primary" id="submit" >Login</button>
                    </div>
                    <div class="d-flex justify-content-center align-items-end p-4">
                            <p>Dont have Account?<a href="signup.php">SignUp</a> </p>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Include Bootstrap JS and jQuery -->
    <!-- <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script> -->
    <script>
        let submit = document.getElementById("submit");
        submit.addEventListener('click',(e)=>{
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;

            if (username.trim() === "") {
                alert("Please enter your username or email.");
                e.preventDefault();
            }

            if (password.trim() === "") {
                alert("Please enter your password.");
                e.preventDefault();
            }
        })
    </script>
</body>
</html>

<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $email = $_POST['email'];
    $password =$_POST['password'];
    $validateIsEmpty = validateIsEmpty($email,$password);
    $role ="";

    if($validateIsEmpty){
        echo "fill empty fields";

    }
    // fetch data from db
    else{
        $sql = "SELECT Id,`username`, `password`, `role` FROM `users` WHERE username='$email' AND password ='$password'";


        try {
            $result = mysqli_query($conn, $sql);
            
            // if ($result) {
            //     echo "User is now registered";
            // } else {
            //     echo "Could not register user: " . mysqli_error($conn);
            // }
        } catch (mysqli_sql_exception $e) {
            echo "An error occurred: " . $e->getMessage();
        }


        //check on role and if user exist in db
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $role = $row["role"];
            $id =$row['Id'];
            $_SESSION["userId"]=$id;

        // update last login in db   


        }
            if ($role == 1) {
                header("Location:http://localhost\singup\project\admin\index.html");
            }
            elseif($role == 2){
                header("Location:http://localhost\singup\project\UserPage\userPage.php");
            }
          }

    }

    
    











function validateIsEmpty($email,$password){
    if(empty($email) || empty($password)){
        return true;
    }
    return false;
}







mysqli_close($conn);   

?>