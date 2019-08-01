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

    const resetGame = () => {
        gameStart = false;
        gameOver = false;
        bird = new Bird(p5, spriteImage);
        pipe = new Pipe(p5, spriteImage);
        floor = new Floor(p5, spriteImage);
        gameText = new Text(p5, birdyFont);
        gameButton = new Button(p5, gameText, spriteImage);
        score = 0;
        pipe.generateFirst();
        bird.draw();
        floor.draw();
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

    p5.setup = () => {
        var canvas = p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
        canvas.mousePressed(canvasClick);
        resetGame();
    }

    p5.draw = () => {
        p5.image(background, 0, 0);

        if (gameStart && gameOver === false) {
            pipe.move();
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
            gameText.gameOverText(score);
            gameButton.resetButton();
        }
        else {
            gameText.scoreText(score);

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

    p5.touchStarted = () => {
        if (gameOver === false)
            bird.jump();
        if (gameStart === false)
            gameStart = true;
    }
}

new P5(sketch, 'Game');
