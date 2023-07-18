const imagePaths = [
    "EmojiPNG/thinking.png",
    "EmojiPNG/mustache.png",
    "EmojiPNG/purple.png",
    "EmojiPNG/sombrero.png",
    "EmojiPNG/smiley.png",
    "EmojiPNG/gamer.png",
    "EmojiPNG/vader.png",
    "EmojiPNG/red.png",
];

const gameWrapper = document.querySelector(".game-wrapper");
const gameContent = document.getElementById("game-content");
const main = document.getElementById("main");
const gameHeader = document.querySelector(".game-header");
const startButton = document.getElementById("start");
const score = document.getElementById("score");
const time = document.getElementById("time");
const life = document.getElementById("lives");
const after = document.getElementById("play-again");
const endScore = document.querySelector(".scored");

startButton.classList.remove("hide");
gameContent.classList.add("hide");
score.classList.add("hide");
time.classList.add("hide");
life.classList.add("hide");
after.classList.add("hide");
startButton.addEventListener("click", initializer);

function initializer() {
    startButton.classList.add("hide");
    gameContent.classList.remove("hide");
    score.classList.remove("hide");
    time.classList.remove("hide");
    life.classList.remove("hide");
    console.log("started");
    generate6Cards();
}

let level = 1;
var level1 = 0;
var level2 = 0;
var level3 = 0;
var level4 = 0;
var level5 = 0;
var total = 0;
var currentScore = 0;

function updateScore() {
    var paddedScore = Math.abs(currentScore).toString().padStart(5, "0");
    var sign = currentScore < 0 ? "-" : " ";
    score.innerHTML = "Score: " + sign + paddedScore;
}

function finalScore() {
    total = level1 + level2 + level3 + level4 + level5;
    return;
}

function updateLives() {
    life.innerHTML = "Lives: " + heart.repeat(lives);
}

function youLose() {
    finalScore();

    let scoreData = {
        level1: level1,
        level2: level2,
        level3: level3,
        level4: level4,
        level5: level5,
        total: total,
    };

    after.classList.remove("hide");
    gameContent.classList.add("hide");
    score.classList.add("hide");
    time.classList.add("hide");
    life.classList.add("hide");
    gameHeader.innerHTML = "You Lose";
    endScore.innerHTML = `You Scored: ${total}`;
    
    
    const submit = document.getElementById("submit-score");
    submit.addEventListener("click", function(){
        console
        var xhr = new XMLHttpRequest();
        var url = "save_score_function.php";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var json = JSON.parse(xhr.responseText);
                console.log(json);
            }
        };
        var data = JSON.stringify(scoreData);
        xhr.send(data);
        submit.innerHTML = `Score submitted, click again to see the Leaderboard`;
        setTimeout(() => {
             submit.href = "leaderboard.php";
        }, 500);
       
    })
}


function youWin() {
    finalScore();

    let scoreData = {
        level1: level1,
        level2: level2,
        level3: level3,
        level4: level4,
        level5: level5,
        total: total,
    };

    after.classList.remove("hide");
    gameContent.classList.add("hide");
    score.classList.add("hide");
    time.classList.add("hide");
    life.classList.add("hide");
    gameHeader.innerHTML = "Congratulations, You Won!";
    endScore.innerHTML = `You Scored: ${total}`;
    
    const submit = document.getElementById("submit-score");
    submit.addEventListener("click", function(){
        console
        var xhr = new XMLHttpRequest();
        var url = "save_score_function.php";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var json = JSON.parse(xhr.responseText);
                console.log(json);
            }
        };
        var data = JSON.stringify(scoreData);
        xhr.send(data);
    })
}

const heart = "♥";
var lives = 3;
var count = 60;
var currentTime;
var timer;
function startTimer() {
    timer = setInterval(function () {
        count--;
        time.innerHTML = count;
        if (count == 0) {
            clearInterval(timer);
            count = 60;
            youLose();
        }
    }, 1000);
}

function stopTimer() {
    currentTime = count;
    clearInterval(timer);
    count = 60;
    setTimeout(() => {
        time.innerHTML = 60;
    }, 900);
}

function shuffleImages(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function changeGold() {
    if (level == 1 && (currentScore > window.level1Top)){
        gameWrapper.style.backgroundColor = "rgba(255, 215, 0, 0.9)";
    } else if (level == 2 && (currentScore - level1 > window.level2Top)){
        gameWrapper.style.backgroundColor = "rgba(255, 215, 0, 0.9)";
    } else if (level == 3 && (currentScore - level1 - level2 > window.level3Top)){
        gameWrapper.style.backgroundColor = "rgba(255, 215, 0, 0.9)";
    } else if (level == 4 && (currentScore - level1 - level2 - level3 > window.level4Top)){
        gameWrapper.style.backgroundColor = "rgba(255, 215, 0, 0.9)";
    } else if (level == 5 && (currentScore - level1 - level2 - level3 - level4 > window.level5Top)){
        gameWrapper.style.backgroundColor = "rgba(255, 215, 0, 0.9)";
    } else {
        gameWrapper.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
    }
}

let hasFlippedCard = false;
var firstCard, secondCard, thirdCard, fourthCard;
let matched = 0;

function flipCard() {
    if (this === firstCard) return;

    this.classList.add("flipped");

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;

    if (
        firstCard.querySelector("img").src ==
        secondCard.querySelector("img").src
    ) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        hasFlippedCard = false;
        firstCard = null;
        secondCard = null;
        matched++;
        currentScore += 100;
        updateScore();
        if (count > 58) {
            count = 60;
        } else {
            count += 2;
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            hasFlippedCard = false;
            firstCard = null;
            secondCard = null;
            currentScore -= 50;
            updateScore();
            lives--;
            updateLives();
            if (lives == 0) {
                youLose();
                stopTimer();
            }
        }, 750);
    }

    changeGold();
    if (level == 1 && matched == 3) {
        stopTimer();
        level++;
        matched = 0;
        if (currentTime > 49) {
            currentScore += 100;
        } else if (currentTime > 39 && currentTime < 50) {
            currentScore += 75;
        } else if (currentTime > 29 && currentTime < 40) {
            currentScore += 50;
        } else if (currentTime > 19 && currentTime < 30) {
            currentScore += 25;
        }
        updateScore();
        level1 = currentScore;
        gameWrapper.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
        setTimeout(() => {
            lives = 4;
            generate8Cards();
        }, 1000);
        return;
    } else if (level == 2 && matched == 4) {
        stopTimer();
        level++;
        matched = 0;
        if (currentTime > 49) {
            currentScore += 100;
        } else if (currentTime > 39 && currentTime < 50) {
            currentScore += 75;
        } else if (currentTime > 29 && currentTime < 40) {
            currentScore += 50;
        } else if (currentTime > 19 && currentTime < 30) {
            currentScore += 25;
        }
        updateScore();
        level2 = currentScore - level1;
        gameWrapper.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
        setTimeout(() => {
            lives = 5;
            generate10Cards();
        }, 1000);
        return;
    } else if (level == 3 && matched == 5) {
        stopTimer();
        level++;
        matched = 0;
        if (currentTime > 49) {
            currentScore += 100;
        } else if (currentTime > 39 && currentTime < 50) {
            currentScore += 75;
        } else if (currentTime > 29 && currentTime < 40) {
            currentScore += 50;
        } else if (currentTime > 19 && currentTime < 30) {
            currentScore += 25;
        }
        updateScore();
        level3 = currentScore - (level1 + level2);
        gameWrapper.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
        setTimeout(() => {
            lives = 7;
            generate12Cards();
        }, 1000);
        return;
    }
    return;
}

//level 1
function generate6Cards() {
    gameContent.style.gridTemplateColumns = "repeat(3, 130px)";
    const randomImages = shuffleImages(imagePaths);
    const shuffledCards = randomImages
        .slice(0, 3)
        .concat(randomImages.slice(0, 3));
    const randomCards = shuffleImages(shuffledCards);

    gameHeader.innerHTML = "Match the 3 pairs";

    gameContent.innerHTML = "";
    for (let i = 0; i < 6; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.addEventListener("click", flipCard);

        const front = document.createElement("div");
        front.classList.add("front");
        front.innerHTML = `<img src="${randomCards[i]}" />`;
        card.appendChild(front);
        const back = document.createElement("div");
        back.classList.add("back");
        back.innerHTML = `<img src="back-of-card.png" />`;
        card.appendChild(back);

        gameContent.appendChild(card);
    }
    gameWrapper.appendChild(score);
    gameWrapper.appendChild(time);
    startTimer();
    return;
}

//level 2
function generate8Cards() {
    gameContent.style.gridTemplateColumns = "repeat(4, 130px)";

    const randomImages = shuffleImages(imagePaths);
    const shuffledCards = randomImages
        .slice(0, 4)
        .concat(randomImages.slice(0, 4));
    const randomCards = shuffleImages(shuffledCards);

    gameHeader.innerHTML = "Match the 4 pairs";

    gameContent.innerHTML = "";
    for (let i = 0; i < 8; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.addEventListener("click", flipCard);

        const front = document.createElement("div");
        front.classList.add("front");
        front.innerHTML = `<img src="${randomCards[i]}" />`;
        card.appendChild(front);
        const back = document.createElement("div");
        back.classList.add("back");
        back.innerHTML = `<img src="back-of-card.png" />`;
        card.appendChild(back);

        gameContent.appendChild(card);
    }
    updateLives();
    startTimer();
    return;
}

//level 3
function generate10Cards() {
    gameContent.style.gridTemplateColumns = "repeat(5, 130px)";
    const randomImages = shuffleImages(imagePaths);
    const shuffledCards = randomImages
        .slice(0, 5)
        .concat(randomImages.slice(0, 5));
    const randomCards = shuffleImages(shuffledCards);

    gameHeader.innerHTML = "Match the 5 pairs";

    gameContent.innerHTML = "";
    for (let i = 0; i < 10; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.addEventListener("click", flipCard);

        const front = document.createElement("div");
        front.classList.add("front");
        front.innerHTML = `<img src="${randomCards[i]}" />`;
        card.appendChild(front);
        const back = document.createElement("div");
        back.classList.add("back");
        back.innerHTML = `<img src="back-of-card.png" />`;
        card.appendChild(back);

        gameContent.appendChild(card);
    }
    updateLives();
    startTimer();
    return;
}

let hasFlippedCardTwice = false;
function flipCardTrio() {
    if (this === firstCard) return;

    this.classList.add("flipped");

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    if (!hasFlippedCardTwice) {
        hasFlippedCardTwice = true;
        secondCard = this;

        if (
            firstCard.querySelector("img").src ==
            secondCard.querySelector("img").src
        ) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
        } else {
            setTimeout(() => {
                firstCard.classList.remove("flipped");
                secondCard.classList.remove("flipped");
                hasFlippedCard = false;
                hasFlippedCardTwice = false;
                firstCard = null;
                secondCard = null;
                thirdCard = null;
                currentScore -= 50;
                updateScore();
                lives--;
                updateLives();
                if (lives == 0) {
                    youLose();
                    stopTimer();
                }
            }, 750);
        }
        return;
    }

    if (hasFlippedCardTwice) {
        thirdCard = this;
        if (
            firstCard.querySelector("img").src ==
            thirdCard.querySelector("img").src
        ) {
            thirdCard.classList.add("matched");
            hasFlippedCard = false;
            hasFlippedCardTwice = false;
            firstCard = null;
            secondCard = null;
            thirdCard = null;
            matched++;
            currentScore += 150;
            updateScore();
            if (count > 57) {
                count = 60;
            } else {
                count += 3;
            }
        } else {
            setTimeout(() => {
                firstCard.classList.remove("flipped");
                secondCard.classList.remove("flipped");
                thirdCard.classList.remove("flipped");
                firstCard.classList.remove("matched");
                secondCard.classList.remove("matched");
                hasFlippedCard = false;
                hasFlippedCardTwice = false;
                firstCard = null;
                secondCard = null;
                thirdCard = null;
                currentScore -= 50;
                updateScore();
                lives--;
                updateLives();
                if (lives == 0) {
                    youLose();
                    stopTimer();
                }
            }, 750);
        }
    }
    changeGold();
    if (matched == 4) {
        stopTimer();
        matched = 0;
        level++;
        if (currentTime > 49) {
            currentScore += 100;
        } else if (currentTime > 39 && currentTime < 50) {
            currentScore += 75;
        } else if (currentTime > 29 && currentTime < 40) {
            currentScore += 50;
        } else if (currentTime > 19 && currentTime < 30) {
            currentScore += 25;
        }
        updateScore();
        level4 = currentScore - (level1 + level2 + level3);
        gameWrapper.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
        setTimeout(() => {
            lives = 10;
            generate16Cards();
        }, 1000);
        return;
    }
    return;
}

//level 4
function generate12Cards() {
    gameContent.style.gridTemplateColumns = "repeat(6, 130px)";
    const randomImages = shuffleImages(imagePaths);
    const shuffledCards = randomImages
        .slice(0, 4)
        .concat(randomImages.slice(0, 4).concat(randomImages.slice(0, 4)));
    const randomCards = shuffleImages(shuffledCards);

    gameHeader.innerHTML = "Match the 4 trios";

    gameContent.innerHTML = "";
    for (let i = 0; i < 12; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.addEventListener("click", flipCardTrio);

        const front = document.createElement("div");
        front.classList.add("front");
        front.innerHTML = `<img src="${randomCards[i]}" />`;
        card.appendChild(front);
        const back = document.createElement("div");
        back.classList.add("back");
        back.innerHTML = `<img src="back-of-card.png" />`;
        card.appendChild(back);

        gameContent.appendChild(card);
    }
    updateLives();
    startTimer();
    return;
}

let hasFlippedCardThrice = false;
function flipCardQuad() {
    if (this === firstCard) return;

    this.classList.add("flipped");

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    if (!hasFlippedCardTwice) {
        hasFlippedCardTwice = true;
        secondCard = this;

        if (
            firstCard.querySelector("img").src ==
            secondCard.querySelector("img").src
        ) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
        } else {
            setTimeout(() => {
                firstCard.classList.remove("flipped");
                secondCard.classList.remove("flipped");
                hasFlippedCard = false;
                hasFlippedCardTwice = false;
                firstCard = null;
                secondCard = null;
                thirdCard = null;
                currentScore -= 25;
                updateScore();
                lives--;
                updateLives();
                if (lives == 0) {
                    youLose();
                    stopTimer();
                }
            }, 750);
        }
        return;
    }

    if (!hasFlippedCardThrice) {
        hasFlippedCardThrice = true;
        thirdCard = this;
        if (
            firstCard.querySelector("img").src ==
            thirdCard.querySelector("img").src
        ) {
            thirdCard.classList.add("matched");
        } else {
            setTimeout(() => {
                firstCard.classList.remove("flipped");
                secondCard.classList.remove("flipped");
                thirdCard.classList.remove("flipped");
                firstCard.classList.remove("matched");
                secondCard.classList.remove("matched");
                hasFlippedCard = false;
                hasFlippedCardTwice = false;
                hasFlippedCardThrice = false;
                firstCard = null;
                secondCard = null;
                thirdCard = null;
                fourthCard = null;
                currentScore -= 25;
                updateScore();
                lives--;
                updateLives();
                if (lives == 0) {
                    youLose();
                    stopTimer();
                }
            }, 750);
        }
        return;
    }

    if (hasFlippedCardThrice) {
        fourthCard = this;
        if (
            firstCard.querySelector("img").src ==
            fourthCard.querySelector("img").src
        ) {
            fourthCard.classList.add("matched");
            hasFlippedCard = false;
            hasFlippedCardTwice = false;
            hasFlippedCardThrice = false;
            firstCard = null;
            secondCard = null;
            thirdCard = null;
            fourthCard = null;
            matched++;
            currentScore += 200;
            updateScore();
            if (count > 56) {
                count = 60;
            } else {
                count += 4;
            }
        } else {
            setTimeout(() => {
                firstCard.classList.remove("flipped");
                secondCard.classList.remove("flipped");
                thirdCard.classList.remove("flipped");
                fourthCard.classList.remove("flipped");
                firstCard.classList.remove("matched");
                secondCard.classList.remove("matched");
                thirdCard.classList.remove("matched");
                hasFlippedCard = false;
                hasFlippedCardTwice = false;
                hasFlippedCardThrice = false;
                firstCard = null;
                secondCard = null;
                thirdCard = null;
                fourthCard = null;
                currentScore -= 25;
                updateScore();
                lives--;
                updateLives();
                if (lives == 0) {
                    youLose();
                    stopTimer();
                }
            }, 750);
        }
    }
    changeGold();
    if (matched == 4) {
        stopTimer();
        matched = 0;
        level++;
        if (currentTime > 49) {
            currentScore += 200;
        } else if (currentTime > 39 && currentTime < 50) {
            currentScore += 150;
        } else if (currentTime > 29 && currentTime < 40) {
            currentScore += 100;
        } else if (currentTime > 19 && currentTime < 30) {
            currentScore += 50;
        }
        updateScore();
        level5 = currentScore - (level1 + level2 + level3 + level4);
        setTimeout(() => {
            youWin();
        }, 1000);
        return;
    }
    return;
}

//level 5
function generate16Cards() {
    gameContent.style.gridTemplateColumns = "repeat(8, 130px)";
    const randomImages = shuffleImages(imagePaths);
    const shuffledCards = randomImages
        .slice(0, 4)
        .concat(
            randomImages
                .slice(0, 4)
                .concat(
                    randomImages.slice(0, 4).concat(randomImages.slice(0, 4))
                )
        );
    const randomCards = shuffleImages(shuffledCards);

    gameHeader.innerHTML = "Match the 4 quadruples";

    gameContent.innerHTML = "";
    for (let i = 0; i < 16; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.addEventListener("click", flipCardQuad);

        const front = document.createElement("div");
        front.classList.add("front");
        front.innerHTML = `<img src="${randomCards[i]}" />`;
        card.appendChild(front);
        const back = document.createElement("div");
        back.classList.add("back");
        back.innerHTML = `<img src="back-of-card.png" />`;
        card.appendChild(back);

        gameContent.appendChild(card);
    }
    updateLives();
    startTimer();
    return;
}
