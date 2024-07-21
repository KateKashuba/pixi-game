import * as PIXI from 'pixi.js';

export class Score {
    private score: number;
    private text: PIXI.Text;

    constructor(private app: PIXI.Application) {
        this.score = 0;
        this.text = new PIXI.Text(`Score: ${this.score}`, {
            fontSize: 24,
            fill: 0x0961ED,
            align: 'left'
        });

        // Position the text at the top of the screen
        this.text.x = 10;
        this.text.y = 10;

        this.app.stage.addChild(this.text);
    }

    // Increases the score by a specified amount and updates the displayed text.
    public increaseScore(amount: number): void {
        this.score += amount;
        this.updateText();
    }

    // Updates the text to display the current score.
    private updateText(): void {
        this.text.text = `Score: ${this.score}`;
    }
}
