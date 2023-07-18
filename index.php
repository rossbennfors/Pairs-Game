<?php
    session_start();

    $avatarImage = $_SESSION['avatarImage'];
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="mystyles.css" />
        <title>Pairs by Ross Bennfors</title>
    </head>
    <body>
        <nav>
            <div class="nav-link-wrapper">
                <ul>
                    <li class="home-link">
                        <a href="index.php" class="home" name="home">Home</a>
                    </li>
                    <?php
                    if (isset($_COOKIE["username"])){
                    ?>    
                    <li><a href="leaderboard.php" name="leaderboard">Leaderboard</a></li>
                    <?php
                    } else {
                    ?>
                    <li><a href="registration.php" name="register">Register</a></li>
                    <?php
                    }
                    ?>
                    <li><a href="pairs.php" name="memory">Play Pairs</a></li>
                    <?php 
                    if (isset($_COOKIE['avatar'])){
                    ?>
                    <li><div class="nav-avatar"><img src="
                    <?php
                        echo $avatarImage;
                    ?>
                    " alt="Avatar"></div></li>
                    <?php
                    }
                    ?>
                </ul>
            </div>
        </nav>
        <div id="main">
            <div class="title">
                <div class="header">
                    <h1>Welcome to Pairs</h1>
                </div>
                <div class="para">
                    <?php
                    if (isset($_SESSION["username"])){
                    ?>
                    <p><a href="pairs.php" name="memory">Click Here to Play Pairs</a></p>
                    <?php
                    } else {
                    ?>
                    <p>You are not using a registered session.</p>
                    <a href="registration.php">Register now!</a>
                    <?php
                    }
                    ?>                    
                </div>
            </div>
        </div>
    </body>
</html>
