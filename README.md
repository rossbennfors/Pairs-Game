# Home Page (index.php)

- "Register Now" button (if not registered)
- "Play Pairs" button (if registered)
- Navbar displays "Home", "Play Pairs" and "Register" (if not registered)
- Navbar displays "Home", Avitar, "Play Pairs" and "Leaderboard" (if registered)

# Registration Page (registrstion.php)

- Form with username and avitar fields
- Avitar images are the radio buttons (image border turns pink if selected)
- Registered message and "Play Pairs" button when registerd
- Username validation (illegal characters and length)

# Play Pairs Page (pairs.php)

- Description of general rules
- Not Registered message (if not registered)
- If not registered cannot save score
- "Start Game" button
- Complex Card implementation
- 5 levels: 1-3 pair, 4 trio, 5 quad match
- Timer + bonus points
- Lives
- Live score
- Background turns gold if score is highest for that level
- General game logic (flipping/locking cards etc)
- Scores sent via POST request
- Win/Lose messages and total score when fisnished
- "Submit Score" (if registered) and "Play Again" buttons
- Navbar displays "Home", Avitar, and "Leaderboard" (if registered)
- Nav bar displays "Home", and "Register" (if not registered)

# Leaderboard Page (leaderboard.php)

- Table shows best score for each level and total score
- In order of highest total score
- Each account can have multiple entries
- Reads and adds new data to json file
- Navbar displays "Home", Avitar, and "Play Pairs"

## save_score_function.php

- Reads post request and assigns data to session variable