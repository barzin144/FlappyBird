import './main.scss';
import { CANVAS_HEIGHT, CANVAS_WIDTH, BIRDSIZE } from './game/constants';
import Pipe from './game/pipe';
import Bird from './game/bird';
import Floor from './game/floor';
import P5 from 'p5';
import Images from './assets/sprite.png';
import BackgroundImage from './assets/background.png';

const sketch = p5 => {
    let gameStart = false;
    let gameOver = false;
    let spriteImage = p5.loadImage(Images);
    let background = p5.loadImage(BackgroundImage);
    let bird = new Bird(p5, spriteImage);
    let pipe = new Pipe(p5, spriteImage);
    let floor = new Floor(p5, spriteImage);
    let score = 0;

    p5.setup = () => {
        p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
        pipe.generateFirst();
        bird.draw();
        floor.draw();
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

        p5.textSize(50);
        p5.text(score, CANVAS_WIDTH / 2 - 10, 100 );
        p5.fill('white');

    }

    p5.keyPressed = (e) => {
        if (e.key === ' ') {
            if (gameOver === false)
                bird.jump();
            if (gameStart === false)
                gameStart = true;
        }
    }
}

new P5(sketch, 'Game');
