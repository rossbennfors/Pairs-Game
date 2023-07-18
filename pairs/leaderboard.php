<?php
    session_start();

    $avatarImage = $_SESSION['avatarImage'];
    $username = $_SESSION['username'];
    $scoreData = $_SESSION['scoreData'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=10" />
    <link rel="stylesheet" href="mystyles.css" />
    <script src="leaderboard.js" defer></script>
    <title>Leaderboard</title>
</head>
<body>
    <nav>
        <div class="nav-link-wrapper">
            <ul>
                <li class="home-link">
                    <a href="index.php" class="home" name="home">Home</a></li>
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
        <div class="leaderboard-wrapper">
            <div class="leaderboard">
                <h2>Leaderboard</h2>
                <table id="leaderboard-table">
                    <thead>
                        <tr>
                            <th rowspan="2">Username</th>
                            <th colspan="5">Best Score</th>
                            <th rowspan="2">Total Best Score</th>
                        </tr>
                        <tr>
                            <th>Level 1</th>
                            <th>Level 2</th>
                            <th>Level 3</th>
                            <th>Level 4</th>
                            <th>Level 5</th>    
                        </tr>                        
                    </thead>
                    <tbody>

                    <?php
                    $scoresJson = file_get_contents("scores.json");
                    $scores = json_decode($scoresJson, true);
                    $players = $scores["players"];

                    $scoreArray = json_decode($scoreData, true);
                    $player = array("username" => $username);
                    
                    $player = array_merge($player, $scoreArray); 

                    $players[] = $player;

                    usort($players, function($a, $b) {
                        return $b['total'] - $a['total'];
                    });

                    $players = array_slice($players, 0, 8);
                    
                    foreach ($players as $score){
                        echo "<tr><td>" . $score['username'] . "<td>" . $score['level1'] . "<td>" . $score['level2'] . "<td>" . $score['level3'] . "<td>" . $score['level4'] . "<td>" . $score['level5'] . "<td>" . $score['total'] . "</td></tr>";
                    }

                    $jsonData = json_encode(array("players" => $players));
                    file_put_contents("scores.json", $jsonData); 
                    ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</body>
</html>