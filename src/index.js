import './main.scss';
import { CANVAS_HEIGHT, CANVAS_WIDTH, BIRDSIZE } from './game/constants';
import Pipe from './game/pipe';
import Bird from './game/bird';
import Floor from './game/floor';
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
    let score;

    const resetGame = () => {
        gameStart = false;
        gameOver = false;
        bird = new Bird(p5, spriteImage);
        pipe = new Pipe(p5, spriteImage);
        floor = new Floor(p5, spriteImage);
        score = 0;
        pipe.generateFirst();
        bird.draw();
        floor.draw();
    }

    p5.setup = () => {
        p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
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

        p5.textFont(birdyFont);
        p5.textSize(50);
        p5.fill('white');
        p5.text(score, CANVAS_WIDTH / 2 - 10, 100);

        if (gameStart === false) {
            p5.textSize(40);
            p5.strokeWeight(0);
            p5.fill('Black');
            p5.text('Press Space to fly', 65, 640);
        }
        if (gameOver === true) {
            p5.textSize(40);
            p5.fill('Black');
            p5.text('Press Space to reset', 35, 640);
        }

    }

    p5.keyPressed = (e) => {
        if (e.key === ' ') {
            if (gameOver === false)
                bird.jump();
            if (gameStart === false)
                gameStart = true;
            if (gameOver) {
                resetGame();
            }
        }
    }
}

new P5(sketch, 'Game');
