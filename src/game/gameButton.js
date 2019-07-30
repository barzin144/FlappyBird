import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants";

export default class GameButton {
    constructor(p5, text, spriteImage) {
        this.p5 = p5;
        this.gameText = text;
        this.image = spriteImage;
    }

    resetButton() {
        this.p5.image(this.image, CANVAS_WIDTH / 2 - 85, CANVAS_HEIGHT / 2 + 100, 160, 60, 200, 170, 160, 60);
        this.gameText.resetText();
    }
}
