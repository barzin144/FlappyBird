import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants';

export default class GameText {
    constructor(p5, font) {
        this.p5 = p5;
        p5.textFont(font);
        this.p5.strokeWeight(5);
        this.p5.stroke(51);
        this.p5.fill('white');
        this.p5.textAlign(this.p5.CENTER);
    }

    scoreText(score) {
        this.p5.textSize(50);
        this.p5.text(score, 0, 100, CANVAS_WIDTH);
    }

    startText() {
        this.p5.textSize(40);
        this.p5.text('Click or', 0, CANVAS_HEIGHT / 2 + 100, CANVAS_WIDTH);
        this.p5.text('press Space', 0, CANVAS_HEIGHT / 2 + 150, CANVAS_WIDTH);
        this.p5.text('to fly', 0, CANVAS_HEIGHT / 2 + 200, CANVAS_WIDTH);
    }

    gameOverText(score, bestScore) {
        this.p5.textSize(40);
        this.p5.text('Game Over', 0, CANVAS_HEIGHT / 2 - 100, CANVAS_WIDTH);
        this.p5.text('Score: ' + score, 0, CANVAS_HEIGHT / 2, CANVAS_WIDTH);
        this.p5.text('Best: ' + bestScore, 0, CANVAS_HEIGHT / 2 + 50, CANVAS_WIDTH);
    }

    resetText() {
        this.p5.textSize(30);
        return this.p5.text('Play', 0, CANVAS_HEIGHT / 2 + 140, CANVAS_WIDTH);
    }
}