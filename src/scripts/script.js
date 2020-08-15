// By Łea uwu

// GLOBAL VARIABLES

// Game area dimensions
let gameArea;
let gameAreaHeight = 22;
let gameAreaWidth = 19;
let blockSideLength = 30;

// Details for game area initalization
// wall (0), pac-dot (1), power-pellet (2), fruit (3), empty (4), ghost-spawn (5), outside (6)
let gameAreaInit = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 2, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 2, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [6, 6, 6, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 6, 6, 6],
    [0, 0, 0, 0, 1, 0, 1, 0, 5, 5, 5, 0, 1, 0, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 5, 5, 5, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [6, 6, 6, 0, 1, 0, 1, 1, 1, 3, 1, 1, 1, 0, 1, 0, 6, 6, 6],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 2, 1, 0, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 0, 1, 2, 0],
    [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// Holder array for the parts of the game area
let gameAreaBlocks = new Array(gameAreaHeight).fill('').map(() => new Array(gameAreaWidth).fill(''));

// Pacman details
let pacman = { figure: '', x: 16, y: 9, isInAnimation: true }

// Ghost details (Blinky, Inky, Pinky, Clyde)
let ghosts = [
    { key: 0, figure: '', x: 10, y: 8, previousMove: 4, isThereWall: false, isInAnimation: false, isEaten: false, leftSpawn: false, canBeEaten: false },
    { key: 1, figure: '', x: 10, y: 9, previousMove: 4, isThereWall: false, isInAnimation: false, isEaten: false, leftSpawn: false, canBeEaten: false },
    { key: 2, figure: '', x: 10, y: 10, previousMove: 4, isThereWall: false, isInAnimation: false, isEaten: false, leftSpawn: false, canBeEaten: false },
    { key: 3, figure: '', x: 9, y: 9, previousMove: 4, isThereWall: false, isInAnimation: false, isEaten: false, leftSpawn: false, canBeEaten: false }
]

// Variable for collosion check
let canCheckCollosion = true;

// Variables for ghost hunt
let isPowerPelletActive = false;
let ghostsEatenCounter = 0;

// Variables for score counting
let dotsEatenByLevel = 0;
let fullScoreCounter = 0;
let levelCounter = 1;
let lifeCounter = 3;

// Audio files
let backgroundMusic = new Audio('src/sounds/background.mp3');
let chompSound = new Audio('src/sounds/chomp.mp3');
let eatFruitSound = new Audio('src/sounds/eatfruit.wav');
let sirenSound = new Audio('src/sounds/siren.mp3');
let eatGhostSound = new Audio('src/sounds/eatghost.wav');
let deathSound = new Audio('src/sounds/death.wav');

backgroundMusic.loop = true;



// FUNCTIONS

// Build game area
function buildGameArea() {
    for (let i = 0; i < gameAreaHeight; i++) {
        for (let j = 0; j < gameAreaWidth; j++) {
            let block = $('<div></div>').addClass('base');

            switch (gameAreaInit[i][j]) {
                case 0:
                    block.addClass('wall');
                    break;
                case 1:
                    block.addClass('pac-dot');
                    break;
                case 2:
                    block.addClass('power-pellet');
                    break;
                case 3:
                    block.addClass('cherry');
                    break;
                case 4:
                    block.addClass('empty');
                    break;
                case 5:
                    block.addClass('ghostspawn');
                    break;
                case 6:
                    block.addClass('outside');
                    break;
            }

            block.css({
                width: blockSideLength,
                height: blockSideLength,
                top: i * blockSideLength,
                left: j * blockSideLength
            });

            gameAreaBlocks[i][j] = block;
            block.appendTo(gameArea);
        }
    }
}

// Add Pacman to game area
function addPacman() {
    pacman.figure = $('<img src="src/images/figures/pacman.gif" id="pacman" alt="pacman" />');
    pacman.figure.css({
        top: pacman.x * blockSideLength,
        left: pacman.y * blockSideLength,
        width: blockSideLength,
        height: blockSideLength,
    });

    pacman.figure.appendTo(gameArea);
}

// Check game area borders (Pacman)
function canPacmanMoveInDirection(x, y) {
    if (gameAreaInit[pacman.x + x][pacman.y + y] === 0 ||
        gameAreaInit[pacman.x + x][pacman.y + y] === 5 ||
        gameAreaInit[pacman.x + x][pacman.y + y] === 6) {
        return false;
    }

    return true;
}

// Handle point collection
function collectPoint() {
    let currentField = $(gameAreaBlocks[pacman.x][pacman.y]);

    if (currentField.attr('class') === 'base pac-dot') {
        currentField.removeClass('pac-dot');
        currentField.addClass('empty');
        fullScoreCounter += 10;
        dotsEatenByLevel++;
    } else if (currentField.attr('class') === 'base power-pellet') {
        currentField.removeClass('power-pellet');
        currentField.addClass('empty');
        fullScoreCounter += 50;
        dotsEatenByLevel++;
        ghostHunt();
    } else if (currentField.attr('class') === 'base cherry') {
        eatFruitSound.play();
        currentField.removeClass('cherry');
        currentField.addClass('empty');
        fullScoreCounter += 100;
        dotsEatenByLevel++;
    } else if (currentField.attr('class') === 'base strawberry') {
        eatFruitSound.play();
        currentField.removeClass('strawberry');
        currentField.addClass('empty');
        fullScoreCounter += 300;
        dotsEatenByLevel++;
    } else if (currentField.attr('class') === 'base orange') {
        eatFruitSound.play();
        currentField.removeClass('orange');
        currentField.addClass('empty');
        fullScoreCounter += 500;
        dotsEatenByLevel++;
    } else if (currentField.attr('class') === 'base apple') {
        eatFruitSound.play();
        currentField.removeClass('apple');
        currentField.addClass('empty');
        fullScoreCounter += 700;
        dotsEatenByLevel++;
    } else if (currentField.attr('class') === 'base melon') {
        eatFruitSound.play();
        currentField.removeClass('melon');
        currentField.addClass('empty');
        fullScoreCounter += 1000;
        dotsEatenByLevel++;
    }

    if (dotsEatenByLevel % 190 === 0 && dotsEatenByLevel != 0) {
        dotsEatenByLevel = 0;
        refillAndLevelUp();
    }

    $('#score').text(fullScoreCounter);
}

// Pacman animation
function animatePacman(speed) {
    pacman.figure.animate({
        top: pacman.x * blockSideLength,
        left: pacman.y * blockSideLength
    }, speed, collectPoint);
}

// Moving Pacman
function movePacman(event) {
    if (pacman.isInAnimation) {
        switch (event.key) {
            case 'ArrowRight':
                if (canPacmanMoveInDirection(0, 1)) {
                    pacman.y++
                };
                break;
            case 'ArrowLeft':
                if (canPacmanMoveInDirection(0, -1)) {
                    pacman.y--
                };
                break;
            case 'ArrowDown':
                if (canPacmanMoveInDirection(1, 0)) {
                    pacman.x++
                };
                break;
            case 'ArrowUp':
                if (canPacmanMoveInDirection(-1, 0)) {
                    pacman.x--
                };
                break;
            default:
                return;
        }

        if (pacman.x === 10 && pacman.y === -1) {
            pacman.y = 18;
            animatePacman(1);
            return;
        } else if (pacman.x === 10 && pacman.y === 19) {
            pacman.y = 0;
            animatePacman(1);
            return;
        }

        backgroundMusic.play();
        chompSound.play();

        ghosts.forEach(ghost => { ghost.isInAnimation = true });

        animatePacman(75);
    }
}

// Add ghosts to game area
function addGhosts() {
    ghosts[0].figure = $('<img src="src/images/figures/blinky.png" class="ghost" id="blinky" alt="blinky" />');
    ghosts[1].figure = $('<img src="src/images/figures/inky.png" class="ghost" id="inky" alt="inky" />');
    ghosts[2].figure = $('<img src="src/images/figures/pinky.png" class="ghost" id="pinky" alt="pinky" />');
    ghosts[3].figure = $('<img src="src/images/figures/clyde.png" class="ghost" id="clyde" alt="clyde" />');

    ghosts.forEach(ghost => {
        ghost.figure.css({
            top: ghost.x * blockSideLength,
            left: ghost.y * blockSideLength,
            width: blockSideLength,
            height: blockSideLength,
        });

        ghost.figure.appendTo(gameArea);
    });
}

// Check game area borders (Ghosts)
function canGhostMoveInDirection(x, y, key) {
    if (gameAreaInit[ghosts[key].x + x][ghosts[key].y + y] === 0 ||
        gameAreaInit[ghosts[key].x + x][ghosts[key].y + y] === 6 ||
        (ghosts[key].leftSpawn && gameAreaInit[ghosts[key].x + x][ghosts[key].y + y] === 5)) {
        return false;
    }

    return true;
}

// Animate ghosts
function animateGhost(key, speed) {
    ghosts[key].figure.animate({
        top: ghosts[key].x * blockSideLength,
        left: ghosts[key].y * blockSideLength
    }, speed)
}

// Move ghosts
function moveGhost(key) {
    if (ghosts[key].isInAnimation && !ghosts[key].isEaten) {
        let direction = ghosts[key].previousMove;

        if (ghosts[key].isThereWall) {
            direction = (Math.floor(Math.random() * 4) + 1);
            ghosts[key].isThereWall = false;
        }

        switch (direction) {
            case 1: // Right
                if (canGhostMoveInDirection(0, 1, key)) {
                    ghosts[key].y++;
                    ghosts[key].previousMove = 1;
                } else {
                    ghosts[key].isThereWall = true;
                    return;
                }
                break;
            case 2: // Left
                if (canGhostMoveInDirection(0, -1, key)) {
                    ghosts[key].y--;
                    ghosts[key].previousMove = 2;
                } else {
                    ghosts[key].isThereWall = true;
                    return;
                }
                break;
            case 3: // Down
                if (canGhostMoveInDirection(1, 0, key)) {
                    ghosts[key].x++;
                    ghosts[key].previousMove = 3;
                } else {
                    ghosts[key].isThereWall = true;
                    return;
                }
                break;
            case 4: // Up
                if (canGhostMoveInDirection(-1, 0, key)) {
                    ghosts[key].x--;
                    ghosts[key].previousMove = 4;
                } else {
                    ghosts[key].isThereWall = true;
                    return;
                }
                break;
        }

        if (ghosts[key].x === 10 && ghosts[key].y === -1) {
            ghosts[key].y = 18;
            animateGhost(key, 1);
            return;
        } else if (ghosts[key].x === 10 && ghosts[key].y === 19) {
            ghosts[key].y = 0;
            animateGhost(key, 1);
            return;
        }

        if (ghosts[key].x === 8) {
            ghosts[key].leftSpawn = true;
        }

        animateGhost(key, 75);
    }
}

// Collosion detection
function checkCollosion() {
    pacmanX = pacman.figure.position().left;
    pacmanY = pacman.figure.position().top;

    ghosts.forEach(ghost => {
        ghostX = ghost.figure.position().left;
        ghostY = ghost.figure.position().top;

        if ((distance({ x: pacmanX, y: pacmanY }, { x: ghostX, y: ghostY }) <= blockSideLength / 2) && canCheckCollosion) {
            if (isPowerPelletActive && ghost.canBeEaten) {
                eatGhostSound.currentTime = 0;
                eatGhostSound.play();

                ghostsEatenCounter++;
                fullScoreCounter += 200 * ghostsEatenCounter;
                $('#score').text(fullScoreCounter);

                Object.assign(ghost, { x: 10, y: 9, isEaten: true, leftSpawn: false, canBeEaten: false });
                animateGhost(ghost.key, 1);
            } else if (!isPowerPelletActive) {
                canCheckCollosion = false;

                lifeCounter--;
                $(`#life${lifeCounter}`).remove();

                restart();
            }
        }
    });
}

// Calculate distance
function distance(a, b) {
    let dx = a.x - b.x;
    let dy = a.y - b.y;

    return Math.sqrt(dx * dx + dy * dy)
}

// Eat ghosts
function ghostHunt() {
    if (!isPowerPelletActive) {
        isPowerPelletActive = true;
        ghosts.forEach(ghost => { ghost.canBeEaten = true });

        sirenSound.currentTime = 0;
        sirenSound.play();

        $('.ghost').attr('src', 'src/images/figures/scaredy.png');

        setTimeout(() => {
            ghosts.forEach(ghost => { ghost.isEaten = false });
            ghosts.forEach(ghost => { ghost.canBeEaten = false });

            $('#blinky').attr('src', 'src/images/figures/blinky.png');
            $('#inky').attr('src', 'src/images/figures/inky.png');
            $('#pinky').attr('src', 'src/images/figures/pinky.png');
            $('#clyde').attr('src', 'src/images/figures/clyde.png');

            ghostsEatenCounter = 0;

            sirenSound.pause();

            isPowerPelletActive = false;
        }, 10000);

        let counter = 10;
        $('#countdown').removeClass('hidden');
        $('#countdown').text(`BÓNUSZ: ${counter} MP`);
        let countdownInterval = setInterval(() => {
            counter--;

            $('#countdown').text(`BÓNUSZ: ${counter} MP`);

            if (counter === 3) {
                $('.ghost').attr('src', 'src/images/figures/scaredy-cooldown.gif');
            }

            if (counter === 0) {
                clearInterval(countdownInterval);
                $('#countdown').addClass('hidden');
            }
        }, 1000);
    }
}

// Refill map and handle level up
function refillAndLevelUp() {
    levelCounter++;
    $('#level').text(levelCounter);

    for (let i = 0; i < gameAreaHeight; i++) {
        for (let j = 0; j < gameAreaWidth; j++) {
            if (i === pacman.x && j === pacman.y) {
                continue;
            }

            let currentBlock = $(gameAreaBlocks[i][j]);

            if (gameAreaInit[i][j] === 1 || gameAreaInit[i][j] === 4) {
                currentBlock.removeClass('empty');
                currentBlock.addClass('pac-dot');
            } else if (gameAreaInit[i][j] === 2) {
                currentBlock.removeClass('empty');
                currentBlock.addClass('power-pellet');
            } else if (gameAreaInit[i][j] === 3 && levelCounter === 2) {
                currentBlock.removeClass('empty');
                currentBlock.addClass('strawberry');
            } else if (gameAreaInit[i][j] === 3 && levelCounter === 3) {
                currentBlock.removeClass('empty');
                currentBlock.addClass('orange');
            } else if (gameAreaInit[i][j] === 3 && levelCounter === 4) {
                currentBlock.removeClass('empty');
                currentBlock.addClass('apple');
            } else if (gameAreaInit[i][j] === 3 && levelCounter >= 5) {
                currentBlock.removeClass('empty');
                currentBlock.addClass('melon');
            }
        }
    }
}

// Get player name for scoreboard
function getPlayerName() {
    let player = prompt('Játékosnév:', 'anonymus');
    localStorage.setItem(player, fullScoreCounter);
    fillToplist();
}

// Restart or end game when a life is lost
function restart() {
    deathSound.play();
    pacman.figure.fadeOut(1000);
    pacman.isInAnimation = false;

    if (lifeCounter === 0) {
        $('#lost-game').css({ display: 'flex' });

        backgroundMusic.pause();

        ghosts.forEach(ghost => { ghost.isInAnimation = false });

        setTimeout(() => getPlayerName(), 100);
    } else {
        ghosts.forEach(ghost => { ghost.figure.fadeOut(250) });

        Object.assign(ghosts[0], { x: 10, y: 8 });
        Object.assign(ghosts[1], { x: 10, y: 9 });
        Object.assign(ghosts[2], { x: 10, y: 10 });
        Object.assign(ghosts[3], { x: 9, y: 9 });

        setTimeout(() => {
            ghosts.forEach(ghost => {
                animateGhost(ghost.key, 1);
                ghost.figure.fadeIn(1);
            });
        }, 1000);

        ghosts.forEach(ghost => { Object.assign(ghost, { isInAnimation: false, leftSpawn: false }) });

        Object.assign(pacman, { x: 16, y: 9 });
        animatePacman(1);
        pacman.figure.fadeIn(1);

        setTimeout(() => {
            canCheckCollosion = true;
            pacman.isInAnimation = true;
        }, 1600);
    }
}

// Fill scoreboard
function fillToplist() {
    $('#scoreboard').empty();

    let data = [];

    for (let i = 0; i < localStorage.length; i++) {
        data[i] = [localStorage.key(i), parseInt(localStorage.getItem(localStorage.key(i)))];
    }

    data.sort((a, b) => { return b[1] - a[1]; });

    for (let temp of data.keys()) {
        if (temp < 5) {
            $('#scoreboard').append('<div class="player"> <div>' + data[temp][0] + '</div><div>' + data[temp][1] + '</div></div>');
        }
    }
}

// Load page
$(() => {
    gameArea = $('<div></div>');
    gameArea.appendTo('#game-container');
    gameArea.attr('id', 'gamearea');


    buildGameArea();
    addPacman();

    let canMove = true;
    $(window).on('keydown', event => {
        if (!canMove) {
            return;
        }

        canMove = false;
        setTimeout(() => canMove = true, 100);

        movePacman(event);
    });

    addGhosts();

    setInterval(() => {
        ghosts.forEach(ghost => moveGhost(ghost.key));
    }, 250);

    setInterval(() => { checkCollosion() }, 1);

    fillToplist();
});
