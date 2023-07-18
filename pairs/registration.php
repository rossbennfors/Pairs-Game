<?php
    session_start(); 
    
    $avatarImage = $_SESSION['avatarImage'];
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=10" />
        <link rel="stylesheet" href="mystyles.css" />
        <script defer src="script.js"></script>
        <title>Registration</title>
    </head>
    <body>
        <nav>
            <div class="nav-link-wrapper">
                <ul>
                    <li class="home-link">
                        <a href="index.php" class="home" name="home">Home</a>
                    </li>
                    <?php 
                    if (isset($_COOKIE['avatar'])){
                    ?>
                    <li>
                        <div class="nav-avatar">
                            <img
                                src="<?php echo $avatarImage; ?>"
                                alt="Avatar"
                            />
                        </div>
                    </li>
                    <?php
                    }
                    ?>
                </ul>
            </div>
        </nav>
        <div id="main">
            <div class="form-wrapper">
                <?php
                $avatarImage = $_SESSION['avatarImage'];
                if (isset($_GET['username'])) { 
                    $username = $_GET['username']; 
                    setcookie('username', $username, time() + (86400 * 30));

                    $_SESSION['username'] = $username;
                    
                    $avatar = $_GET['avatar'];
                    setcookie('avatar', $avatar, time() + (86400 * 30)); 
                }
                if (isset($_GET['avatar'])) {
                    switch ($_GET['avatar']) {
                        case 'avatar1':
                            $_SESSION['avatarImage'] = 'EmojiPNG/gamer.png';
                            break;
                        case 'avatar2':
                            $_SESSION['avatarImage'] = 'EmojiPNG/red.png';
                            break;
                        case 'avatar3':
                            $_SESSION['avatarImage'] = 'EmojiPNG/mustache.png';
                            break;
                        case 'avatar4':
                            $_SESSION['avatarImage'] = 'EmojiPNG/vader.png';
                            break;
                        default:
                            $_SESSION['avatarImage'] = 'EmojiPNG/purple.png';
                    }
                }
                if (isset($_SESSION['username'])) {
                ?>
                <div class="form">
                    <h2>You are registered</h2>
                    <a href="pairs.php">Play Pairs</a>
                </div>
                <?php 
                } else { 
                ?>
                <form
                    action=""
                    id="form"
                    class="form"
                    method="get"
                >
                    <h2 id="h">Register</h2>
                    <div class="input-group">
                        <input
                            type="text"
                            name="username"
                            id="username"
                            required
                        />
                        <label for="username">Username</label>
                        <div id="error"></div>
                    </div>

                    <div class="av-group">
                        <div class="av-label">Avatar</div>
                        <div>
                            <input
                                type="radio"
                                id="avatar1"
                                name="avatar"
                                value="avatar1"
                                required
                            />
                            <label for="avatar1"
                                ><img src="EmojiPNG/gamer.png" alt="Avatar 1"
                            /></label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                id="avatar2"
                                name="avatar"
                                value="avatar2"
                                required
                            />
                            <label for="avatar2"
                                ><img src="EmojiPNG/red.png" alt="Avatar 2"
                            /></label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                id="avatar3"
                                name="avatar"
                                value="avatar3"
                                required
                            />
                            <label for="avatar3"
                                ><img
                                    src="EmojiPNG/mustache.png"
                                    alt="Avatar 3"
                            /></label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                id="avatar4"
                                name="avatar"
                                value="avatar4"
                                required
                            />
                            <label for="avatar4"
                                ><img src="EmojiPNG/vader.png" alt="Avatar 4"
                            /></label>
                        </div>
                    </div>
                    <input type="submit" value="Register" class="submit-btn" />
                </form>

                <?php
                }
                ?>
            </div>
        </div>
    </body>
</html>
