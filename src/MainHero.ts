import * as PIXI from 'pixi.js';

export class MainHero {
    private graphics: PIXI.Graphics;
    private targetX: number;
    private targetY: number;
    private isMoving: boolean;
    private moveSpeed: number;

    constructor(private app: PIXI.Application) {
        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(0xFF0000);
        this.graphics.drawCircle(0, 0, 20); // Draw a circle with radius 20
        this.graphics.endFill();
        
        // Center the circle
        this.graphics.x = this.app.screen.width / 2;
        this.graphics.y = this.app.screen.height / 2;
        this.targetX = this.graphics.x;
        this.targetY = this.graphics.y;
        this.isMoving = false;
        this.moveSpeed = 5; // the speed of movement

        this.app.stage.addChild(this.graphics);
    }

    public getX(): number {
        return this.graphics.x;
    }

    public getY(): number {
        return this.graphics.y;
    }

    // Sets the target position for the hero to move towards.
    public setTarget(x: number, y: number): void {
        this.targetX = x;
        this.targetY = y;

        // If not already moving, start the movement animation
        if (!this.isMoving) {
            this.isMoving = true;
            this.animateMovement();
        }
    }

    // Animates the movement of the hero towards the target position.
    private animateMovement(): void {
        if (!this.isMoving) return;

        // Calculate the distance to move
        const dx = this.targetX - this.graphics.x;
        const dy = this.targetY - this.graphics.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Move the hero only if there is a significant distance to cover
        if (distance > 1) {
            const moveX = dx * (this.moveSpeed / distance);
            const moveY = dy * (this.moveSpeed / distance);
            
            // Update hero's position
            this.graphics.x += moveX;
            this.graphics.y += moveY;

            // Request the next frame
            requestAnimationFrame(() => this.animateMovement());
        } else {
            // If we're close enough to the target position, stop the animation
            this.graphics.x = this.targetX;
            this.graphics.y = this.targetY;
            this.isMoving = false;
        }
    }
}
