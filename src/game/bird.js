import { BIRDSIZE, CANVAS_HEIGHT, CANVAS_WIDTH, BIRDANIMATIONFRAME, FLOOROFFSET } from './constants';


export default class Bird {

    constructor(p5, spriteImage) {
        this.p5 = p5;
        this.gravity = 0.5;
        this.velocity = 0;
        this.lift = -8;
        this.birdPosition = { y: (CANVAS_HEIGHT / 2) - (BIRDSIZE.Width / 2), x: (CANVAS_WIDTH / 2) - (BIRDSIZE.Height / 2) };
        this.image = spriteImage;
        this.frame = 0;
        this.dead = false;
        this.birdRotate = { angle: 0, xOffset: 0, yOffset: 0 };
    }

    draw() {
        if (this.dead === false)
            this.frame++;
        let animationFrame = (Math.floor(this.frame / 8)) % 4;

        this.p5.push();

        this.p5.translate(this.birdPosition.x + this.birdRotate.xOffset, this.birdPosition.y + this.birdRotate.yOffset);
        this.p5.rotate(Math.PI / 180 * this.birdRotate.angle);
        this.p5.image(this.image, 0, 0, BIRDSIZE.Width, BIRDSIZE.Height, BIRDANIMATIONFRAME[animationFrame], 0, BIRDSIZE.Width, BIRDSIZE.Height);

        this.p5.pop();
    }

    jump() {
        this.velocity = this.lift;
        this.birdRotate = { angle: -25, xOffset: -10, yOffset: 15 };
    }

    isDead() {
        return this.birdPosition.y >= CANVAS_HEIGHT - BIRDSIZE.Height - FLOOROFFSET ? true : false;
    }

    update() {
        this.velocity += this.gravity;
        this.birdPosition.y += this.velocity;

        if (this.velocity > 8)
            this.birdRotate = { angle: 0, xOffset: 0, yOffset: 0 };
        if (this.velocity > 9)
            this.birdRotate = { angle: 22.5, xOffset: 12, yOffset: -10 };

        if (this.velocity > 10)
            this.birdRotate = { angle: 45, xOffset: 30, yOffset: -15 };

        if (this.velocity > 11)
            this.birdRotate = { angle: 67.5, xOffset: 45, yOffset: -10 };

        if (this.velocity > 12)
            this.birdRotate = { angle: 90, xOffset: 60, yOffset: -10 };

        if (this.isDead()) {
            this.birdPosition.y = CANVAS_HEIGHT - BIRDSIZE.Height - FLOOROFFSET;
            this.velocity = 0;
            this.dead = true;
        }

        if (this.velocity > 15)
            this.velocity = 15;
    }
}
