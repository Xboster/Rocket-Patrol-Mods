// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 2;
        this.sfxShot = scene.sound.add("sfx-shot");
    }
    update() {
        // left/right movement
        if (keyLEFT.isDown && this.x >= borderUISize + this.width) {
            this.x -= this.moveSpeed;
        } else if (
            keyRIGHT.isDown &&
            this.x <= game.config.width - borderUISize - this.width
        ) {
            this.x += this.moveSpeed;
        }

        // fire button
        if (Phaser.Input.Keyboard.JustDown(keyFIRE) && !this.isFiring) {
            this.fire();
        }
        // if fired, move up
        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        // reset on miss
        // if (this.y <= borderUISize * 3 + borderPadding) {
        //     // reset rocket to "ground"
        //     this.reset();
        // }
    }
    reset() {
        this.isFiring = false;
        this.x = game.config.width / 2;
        this.y = game.config.height - borderUISize - borderPadding;
    }
    fire() {
        this.isFiring = true;
        this.sfxShot.play();
    }
    move(x) {
        if (x > 5 && this.x >= borderUISize + this.width) {
            this.x -= this.moveSpeed;
        }
        if (x < 5 && this.x <= game.config.width - borderUISize - this.width) {
            this.x += this.moveSpeed;
        }
    }
}
