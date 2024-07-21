import * as PIXI from 'pixi.js';
import { Yard } from './Yard';

export class Animal {
    private graphics: PIXI.Graphics;
    private x: number;
    private y: number;
    private radius: number;
    private follow: boolean = false;
    private target: { x: number, y: number } | null = null;

    constructor(x: number, y: number, radius: number = 10) {
        this.x = x;
        this.y = y;
        this.radius = radius;

        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(0xFFFFFF);
        this.graphics.drawCircle(0, 0, this.radius);
        this.graphics.endFill();

        // Position the animal
        this.graphics.x = this.x;
        this.graphics.y = this.y;
    }

    public getGraphics(): PIXI.Graphics {
        return this.graphics;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    // Sets whether the animal should follow the target.
    public setFollow(follow: boolean): void {
        this.follow = follow;
    }

    // Checks if the animal is currently following the target.
    public isFollowing(): boolean {
        return this.follow;
    }

    // Sets the target position for the animal to move towards.
    public setTarget(target: { x: number, y: number } | null): void {
        this.target = target;
    }

    // Moves the animal towards its target position at the specified speed.
    public moveTowards(moveSpeed: number): void {
        if (!this.follow || !this.target) return;

        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 1) {
            const moveX = dx * (moveSpeed / distance);
            const moveY = dy * (moveSpeed / distance);
            this.x += moveX;
            this.y += moveY;

            this.graphics.x = this.x;
            this.graphics.y = this.y;
        }
    }

    // Checks if the animal is within a certain range of the hero.
    public isWithinRange(heroX: number, heroY: number, range: number): boolean {
        const dx = heroX - this.x;
        const dy = heroY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < range;
    }

    // Checks if the animal is within the bounds of the yard.
    public isWithinYard(yard: Yard): boolean {
        const yardBounds = yard.getBounds();
        return this.x > yardBounds.x && this.x < yardBounds.x + yardBounds.width &&
            this.y > yardBounds.y && this.y < yardBounds.y + yardBounds.height;
    }
}
