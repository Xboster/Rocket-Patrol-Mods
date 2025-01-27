// Rocket prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
    }

    update() {
        // move spaceship left
        if (this.flipX) {
            this.x += this.moveSpeed;
        } else {
            this.x -= this.moveSpeed;
        }

        // wrap from left to right edge
        if (!this.flipX && this.x < 0 - this.width) {
            this.x = game.config.width;
        }
        if (this.flipX && this.x > game.config.width) {
            this.x = 0 - this.width;
        }
    }

    // reset position
    reset() {
        this.x = game.config.width;
    }

    speedup() {
        this.moveSpeed += 2;
    }
}
