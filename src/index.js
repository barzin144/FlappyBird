import './main.scss';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './game/constants';
import Pipe from './game/pipe';
import Bird from './game/bird';
import Floor from './game/floor';
import Text from './game/gameText';
import Button from './game/gameButton';
import P5 from 'p5';
import Images from './assets/sprite.png';
import BackgroundImage from './assets/background.png';
import font from './assets/FlappyBirdy.ttf';
import Storage from './storage';

const sketch = p5 => {
    let background = p5.loadImage(BackgroundImage);
    let spriteImage = p5.loadImage(Images);
    let birdyFont = p5.loadFont(font);
    let gameStart;
    let gameOver;
    let bird;
    let pipe;
    let floor;
    let gameButton;
    let gameText;
    let score;
    let storage;
    let bestScore;

    const resetGame = () => {
        gameStart = false;
        gameOver = false;
        bird = new Bird(p5, spriteImage);
        pipe = new Pipe(p5, spriteImage);
        floor = new Floor(p5, spriteImage);
        gameText = new Text(p5, birdyFont);
        gameButton = new Button(p5, gameText, spriteImage);
        storage = new Storage();
        score = 0;
        pipe.generateFirst();
        bird.draw();
        floor.draw();
        let dataFromStorage = storage.getStorageData();

        if (dataFromStorage === null) {
            bestScore = 0;
        }
        else {
            bestScore = dataFromStorage.bestScore;
        }
    }

    const canvasClick = () => {
        if (p5.mouseButton === 'left') {
            if (gameOver === false)
                bird.jump();
            if (gameStart === false)
                gameStart = true;
            if (gameOver &&
                p5.mouseX > CANVAS_WIDTH / 2 - 85 &&
                p5.mouseX < CANVAS_WIDTH / 2 + 75 &&
                p5.mouseY > CANVAS_HEIGHT / 2 + 100 &&
                p5.mouseY < CANVAS_HEIGHT / 2 + 160
            )
                resetGame();
        }
    }

    const canvasTouch = () => {
        if (gameOver === false)
            bird.jump();
        if (gameStart === false)
            gameStart = true;
    }

    p5.setup = () => {
        var canvas = p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
        canvas.mousePressed(canvasClick);
        canvas.touchStarted(canvasTouch);
        resetGame();
    }

    p5.draw = () => {
        p5.image(background, 0, 0);
        const level = Math.floor(score / 10);
        if (gameStart && gameOver === false) {
            pipe.move(level);
            pipe.draw();

            bird.update();
            bird.draw();

            floor.update();
            floor.draw();

            gameOver = pipe.checkCrash(bird) || bird.isDead();

            if (pipe.getScore(bird))
                score++;
        }
        else {
            pipe.draw();
            bird.draw();
            floor.draw();
            if (gameOver)
                bird.update();
            else {
                floor.update();
            }
        }


        if (gameStart === false) {
            gameText.startText();
        }

        if (gameOver) {
            if (score > bestScore) {
                bestScore = score;
                storage.setStorageData({ bestScore: score });
            }

            gameText.gameOverText(score, bestScore, level);

            gameButton.resetButton();
        }
        else {
            gameText.scoreText(score, level);

        }
    }

    p5.keyPressed = (e) => {
        if (e.key === ' ') {
            if (gameOver === false)
                bird.jump();
            if (gameStart === false)
                gameStart = true;
        }
        if (e.key === 'r') {
            if (gameOver) {
                resetGame();
            }
        }
    }
}

new P5(sketch, 'Game');
