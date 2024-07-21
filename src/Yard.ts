import * as PIXI from 'pixi.js';

export class Yard {
    private graphics: PIXI.Graphics;

    constructor(private x: number, private y: number, private width: number, private height: number) {
        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(0xFFFF00);
        this.graphics.drawRect(0, 0, this.width, this.height);
        this.graphics.endFill();

        // Position the yard
        this.graphics.x = x;
        this.graphics.y = y;
    }

    public getGraphics(): PIXI.Graphics {
        return this.graphics;
    }

    // Returns the bounds of the yard as an object containing x, y, width, and height.
    public getBounds(): { x: number, y: number, width: number, height: number } {
        return { x: this.x, y: this.y, width: this.width, height: this.height };
    }
}
