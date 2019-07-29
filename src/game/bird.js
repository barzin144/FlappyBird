import { BIRDSIZE, CANVAS_HEIGHT, CANVAS_WIDTH, BIRDANIMATIONFRAME, FLOOROFFSET } from './constants';


export default class Bird {

    constructor(p5, spriteImage) {
        this.p5 = p5;
        this.gravity = 0.5;
        this.velocity = 0;
        this.lift = -8;
        this.birdPosition = { y: (CANVAS_HEIGHT / 2) - (BIRDSIZE.Width / 2), x: (CANVAS_WIDTH / 2) - (BIRDSIZE.Hieght / 2) };
        this.image = spriteImage;
        this.frame = 0;
        this.dead = false;
    }

    draw() {
        if (this.dead === false)
            this.frame++;
        let animationFrame = (Math.floor(this.frame / 10)) % 4;
        this.p5.image(this.image, this.birdPosition.x, this.birdPosition.y, BIRDSIZE.Width, BIRDSIZE.Hieght, BIRDANIMATIONFRAME[animationFrame], 0, BIRDSIZE.Width, BIRDSIZE.Hieght);
    }

    jump() {
        this.velocity = this.lift;
    }

    isDead() {
        return this.birdPosition.y >= CANVAS_HEIGHT - BIRDSIZE.Hieght - FLOOROFFSET ? true : false;
    }

    update() {
        this.velocity += this.gravity;
        this.birdPosition.y += this.velocity;

        if (this.isDead()) {
            this.birdPosition.y = CANVAS_HEIGHT - BIRDSIZE.Hieght - FLOOROFFSET;
            this.velocity = 0;
            this.dead = true;
        }

        if (this.velocity > 15)
            this.velocity = 15;
    }
}
