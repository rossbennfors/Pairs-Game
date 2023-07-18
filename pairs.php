<?php
    session_start();

    $avatarImage = $_SESSION['avatarImage'];
    $username = $_SESSION['username'];

    $scoresJson = file_get_contents("scores.json");
    $scores = json_decode($scoresJson, true);
    $players = $scores["players"];

    $level1 = 0;
    $level2 = 0;
    $level3 = 0;
    $level4 = 0;
    $level5 = 0;
    $total = 0;

    foreach ($players as $player) {
        if ($player['level1'] > $level1) {
            $level1 = $player['level1'];
        }
        if ($player['level2'] > $level2) {
            $level2 = $player['level2'];
        }
        if ($player['level3'] > $level3) {
            $level3 = $player['level3'];
        }
        if ($player['level4'] > $level4) {
            $level4 = $player['level4'];
        }
        if ($player['level5'] > $level5) {
            $level5 = $player['level5'];
        }
        if ($player['total'] > $total) {
            $total = $player['total'];
        }
    }

    echo '<script>window.level1Top = ' . $level1 . '; window.level2Top = ' . $level2 . '; window.level3Top = ' . $level3 . '; window.level4Top = ' . $level4 . '; window.level5Top = ' . $level5 . '; window.highscore = ' . $total . ';</script>';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=10" />
    <link rel="stylesheet" href="mystyles.css" />
    <script src="game.js" defer></script>
    <title>Pairs</title>
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
        <h1 class="game-header">Rules</h1>
        <div class="game-wrapper">
            <?php
            if (isset($_SESSION["username"])){
            ?> 
            <div id="start">
                <span class="rules">
                    You will have 3 lives for level one and then the hard
                    the level is the more lives you will have.
                </span>
                <span class="rules">
                    You have a minute to complete each level but will gain
                    time with every set of cards matched.
                </span>
                <span class="rules">
                    You get points for each set matched, negative points for
                    each wrong guess and you get bonus points for how quick
                    you complete a level (double for level 5): <br />
                    <ul>
                        <li>in 10 seconds +100</li>
                        <li>in 20 seconds +75</li>
                        <li>in 30 seconds +50</li>
                        <li>in 40 seconds +25</li>
                    </ul>
                </span>
                <button>Start Game</button>
            </div>
            <?php
            } else {
            ?>
            <div id="start">
                <h2>You are not using a registered session<br>Your score will not be saved<br>
                </h2>
                <span class="rules">
                    You will have 3 lives for level one and then the hard
                    the level is the more lives you will have.
                </span>
                <span class="rules">
                    You have a minute to complete each level but will gain
                    time with every set of cards matched.
                </span>
                <span class="rules">
                    You get points for each set matched, negative points for
                    each wrong guess and you get bonus points for how quick
                    you complete a level (double for level 5): <br />
                    <ul>
                        <li>in 10 seconds +100</li>
                        <li>in 20 seconds +75</li>
                        <li>in 30 seconds +50</li>
                        <li>in 40 seconds +25</li>
                    </ul>
                </span>
                <button >Start Game</button>
            </div>
            <?php
            }
            ?> 
            <div id="play-again">
                <h2 class="scored"></h2>
                
                <?php
                
                if (isset($_COOKIE["username"])){
                ?>  
                
                <a href="#" id="submit-score">Submit Your Score</a>
                <br />
                <span class="disclaimer">**Only levels you completed will be saved**</span>
                <br />
                <span>or</span>
                <br />
                <?php
                }
                ?>  
                <a href="pairs.php">Play Again</a>
            </div>
            <div id="game-content"></div>
            <div id="score">Score: 00000</div>
            <div id="lives">Lives: ♥♥♥</div>
            <div id="time">60</div>
        </div>
    </div>
</body>
</html>
