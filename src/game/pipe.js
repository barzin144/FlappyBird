import { CANVAS_HEIGHT, CANVAS_WIDTH, MIN_PIPE_GAP, MAX_PIPE_GAP, BIRDSIZE, FLOOROFFSET, MaxPipeOffset, MinPipeOffset, PipeSpeed, MIN_PIPE_HEIGHT, MAX_PIPE_HEIGHT, PIPE_WIDTH } from './constants';

export default class Pipe {
    constructor(p5, spriteImage) {
        this.p5 = p5;
        this.pipesPosition = [];
        this.image = spriteImage;
    }

    generatePipeHeightAndGap() {
        const height = Math.floor(Math.random() * (MAX_PIPE_HEIGHT - MIN_PIPE_HEIGHT + 1) + MIN_PIPE_HEIGHT);
        const gap = Math.floor(Math.random() * (MAX_PIPE_GAP - MIN_PIPE_GAP + 1) + MIN_PIPE_GAP);
        return { height, gap };
    }

    generateNew() {
        const { height, gap } = this.generatePipeHeightAndGap();
        this.pipesPosition.push({ offset: 0, height, gap });
        this.draw({ offset: 0, height, gap });
    }

    generateFirst() {
        const { height, gap } = this.generatePipeHeightAndGap();
        this.pipesPosition.push({ offset: -300, height, gap });
        this.draw({ offset: -300, height, gap });
    }

    draw() {
        this.pipesPosition.forEach(pipe => {
            this.p5.image(this.image, CANVAS_WIDTH - pipe.offset, 0, PIPE_WIDTH, pipe.height, PIPE_WIDTH, 500 - pipe.height, PIPE_WIDTH, pipe.height);
            this.p5.image(this.image, CANVAS_WIDTH - pipe.offset, pipe.height + pipe.gap, PIPE_WIDTH, CANVAS_HEIGHT - pipe.height - pipe.gap - FLOOROFFSET, 0, 0, PIPE_WIDTH, CANVAS_HEIGHT - pipe.height - pipe.gap - FLOOROFFSET);
        });
    }

    move() {
        this.pipesPosition.forEach(pipe => {
            pipe.offset = pipe.offset + PipeSpeed;
        });

        if (this.pipesPosition[0].offset > CANVAS_WIDTH + PIPE_WIDTH)
            this.pipesPosition.shift();

        if (this.pipesPosition[this.pipesPosition.length - 1].offset > Math.floor(Math.random() * (MaxPipeOffset - MinPipeOffset + 1) + MinPipeOffset)) {
            this.generateNew();
        }
    }

    getScore(bird) {
        const birdMiddleX = bird.birdPosition.x + BIRDSIZE.Width / 2;
        let getScore = false;
        this.pipesPosition.forEach(pipe => {
            const pipeMiddleX = CANVAS_WIDTH - pipe.offset + PIPE_WIDTH / 2;

            if (birdMiddleX > pipeMiddleX - 2 && birdMiddleX < pipeMiddleX + 2)
               {
                    getScore = true;
                    return getScore;
               }
        });
        return getScore;
    }

    checkCrash(bird) {
        const birdStartX = bird.birdPosition.x;
        const birdEndX = bird.birdPosition.x + BIRDSIZE.Width;
        const birdStartY = bird.birdPosition.y;
        const birdEndY = bird.birdPosition.y + BIRDSIZE.Width;
        let crash = false;

        this.pipesPosition.forEach(pipe => {
            const pipeStartX = CANVAS_WIDTH - pipe.offset;
            const pipeEndX = CANVAS_WIDTH - pipe.offset + PIPE_WIDTH;

            const topPipeStartY = 0;
            const topPipeEndY = pipe.height;

            const bottomPipeStartY = pipe.height + pipe.gap;
            const bottomPipeEndY = CANVAS_HEIGHT;

            if (((birdStartX >= pipeStartX && birdStartX <= pipeEndX) || (birdEndX >= pipeStartX && birdEndX <= pipeEndX))
                &&
                ((birdStartY >= topPipeStartY && birdStartY <= topPipeEndY) || (birdEndY >= bottomPipeStartY && birdEndY <= bottomPipeEndY))) {
                crash = true;
            }

            else if (((birdStartX >= pipeStartX && birdStartX <= pipeEndX) || (birdEndX >= pipeStartX && birdEndX <= pipeEndX)) && birdStartY < 0) {
                crash = true;
            }
        });
        return crash;
    }
}




