import * as PIXI from 'pixi.js';
import { MainHero } from './MainHero';
import { Animal } from './Animal';
import { Yard } from './Yard';
import { Score } from './Score';

class Game {
    private app: PIXI.Application;
    private mainHero: MainHero;
    private animals: Animal[] = [];
    private yard: Yard;
    private score: Score;
    private followGroup: Animal[] = [];
    private maxFollowGroupSize: number = 5;
    private followDistance: number = 50; // Distance at which animals start to follow the hero
    private animalSpeed: number = 5; // Speed of animals

    constructor() {
        this.app = new PIXI.Application({
            resizeTo: window,
            backgroundColor: 0x81B622
        });

        document.body.appendChild(this.app.view as HTMLCanvasElement);

        // Create the yard and add it to the stage first
        this.yard = new Yard(0, 0, this.app.screen.width, 50);
        this.app.stage.addChild(this.yard.getGraphics());

        // Create the main hero and add it to the stage
        this.mainHero = new MainHero(this.app);
        
        // Create the score and add it to the stage
        this.score = new Score(this.app);

        // Spawn animals and add them to the stage
        this.spawnAnimals(10);

        // Set up event listeners
        this.setupEventListeners();

        // Start the game loop
        this.gameLoop();
    }

    // Sets up event listeners for the game.
    private setupEventListeners(): void {
        const canvas = this.app.view as HTMLCanvasElement;
        if (canvas) {
            canvas.addEventListener('click', (event: MouseEvent) => {
                const rect = canvas.getBoundingClientRect();
                const mouseX = event.clientX - rect.left;
                const mouseY = event.clientY - rect.top;
                
                this.mainHero.setTarget(mouseX, mouseY);
            });
        }
    }

    // Spawns a specified number of animals at random positions.
    private spawnAnimals(count: number): void {
        for (let i = 0; i < count; i++) {
            const x = Math.random() * this.app.screen.width;
            const y = Math.random() * this.app.screen.height;

            const animal = new Animal(x, y);
            this.animals.push(animal);
            this.app.stage.addChild(animal.getGraphics());
        }
    }

    // The main game loop, which updates the positions of animals and handles the game logic.
    private gameLoop(): void {
        // Update the position of animals in the follow group
        this.followGroup.forEach((animal, index) => {
            const target = index === 0 
                ? { x: this.mainHero.getX(), y: this.mainHero.getY() - 10 }
                : { x: this.followGroup[index - 1].getX(), y: this.followGroup[index - 1].getY() - 10 };
            
            // Maintain some distance between the animals
            const distance = 15;
            animal.setTarget(this.getPositionAbove(target.x, target.y, distance));
            animal.moveTowards(this.animalSpeed);

            // Check if the animal has reached the yard
            if (animal.isWithinYard(this.yard)) {
                this.score.increaseScore(1);
                this.removeAnimal(animal);
            }
        });

        // Check and update follow group
        this.updateFollowGroup();

        // Continue the game loop
        requestAnimationFrame(() => this.gameLoop());
    }

    private getPositionAbove(x: number, y: number, distance: number): { x: number, y: number } {
        return {
            x: x,
            y: y - distance
        };
    }

    // Check if animals should start or stop following
    private updateFollowGroup(): void {
        this.animals.forEach(animal => {
            if (animal.isWithinRange(this.mainHero.getX(), this.mainHero.getY(), this.followDistance)) {
                if (!animal.isFollowing() && this.followGroup.length < this.maxFollowGroupSize) {
                    animal.setFollow(true);
                    this.followGroup.push(animal);
                }
            }
        });
    }

    // Remove the animal from the follow group and the stage
    private removeAnimal(animal: Animal): void {
        this.followGroup = this.followGroup.filter(a => a !== animal);
        this.animals = this.animals.filter(a => a !== animal);
        this.app.stage.removeChild(animal.getGraphics());
    }
}

// Start the game
window.onload = () => {
    new Game();
};
