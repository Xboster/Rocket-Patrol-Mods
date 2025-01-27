class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    init() {}
    preload() {
        // load images/tile sprites
        this.load.image("rocket", "./assets/rocket.png");
        this.load.image("spaceship", "./assets/spaceship.png");
        this.load.image("starfield", "./assets/starfield.png");
        // load spritesheet
        this.load.spritesheet("explosion", "./assets/explosion.png", {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9,
        });
        // load audio
        this.load.audio("sfx-select", "./assets/sfx-select.wav");
        this.load.audio("sfx-explosion", "./assets/sfx-explosion.wav");
        this.load.audio("sfx-shot", "./assets/sfx-shot.wav");
    }

    create() {
        // animation configuration
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion", {
                start: 0,
                end: 9,
                first: 0,
            }),
            frameRate: 30,
        });

        this.selected = 1;
        this.menuConfig = {
            fontFamily: "monospace",
            fontSize: "28px",
            backgroundColor: "#00FF00",
            color: "#000000",
            align: "right",
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0,
            strokeThickness: 0,
            shadow: {
                offsetX: 0,
                offsetY: 0,
                color: "#EEEEEE",
                blur: 0,
                stroke: 0,
                fill: 0,
            },
        };

        this.menuConfigSelected = {
            fontFamily: "monospace",
            fontSize: "28px",
            backgroundColor: "#00FF00",
            color: "#000000",
            align: "right",
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0,
            strokeThickness: 3,
            shadow: {
                offsetX: 3,
                offsetY: 2,
                color: "#EEEEEE",
                blur: 0,
                stroke: true,
                fill: true,
            },
        };

        this.add
            .text(
                game.config.width / 2,
                game.config.height / 3 - borderUISize - borderPadding,
                "ROCKET PATROL REDUX",
                this.menuConfig
            )
            .setOrigin(0.5);

        this.add
            .text(
                game.config.width / 2,
                game.config.height - borderUISize / 2,
                "USE <- -> arrows to move & (F) to fire",
                this.menuConfig
            )
            .setOrigin(0.5);
        this.menuConfig.backgroundColor = "#00FF00";
        this.menuConfig.color = "#000";

        this.easy = this.add
            .text(
                (borderUISize + borderPadding) * 2,
                game.config.height / 2 - (borderUISize + borderPadding),
                "1. Easy Mode",
                this.menuConfig
            )
            .setOrigin(0);
        this.normal = this.add
            .text(
                (borderUISize + borderPadding) * 2,
                game.config.height / 2,
                "2. Normal Mode",
                this.menuConfig
            )
            .setOrigin(0);
        this.hard = this.add
            .text(
                (borderUISize + borderPadding) * 2,
                game.config.height / 2 + (borderUISize + borderPadding),
                "3. Hard Mode",
                this.menuConfig
            )
            .setOrigin(0);

        // define keys
        keyLEFT = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.LEFT
        );
        keyRIGHT = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.RIGHT
        );
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            if (this.selected > 1 && this.selected <= 3) {
                this.selected -= 1;
            }
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            if (this.selected >= 1 && this.selected < 3) {
                this.selected += 1;
            }
        }
        if (Phaser.Input.Keyboard.JustDown(keyFIRE)) {
            switch (this.selected) {
                case 1:
                    console.log("Easy mode activated.");
                    game.settings = {
                        spaceshipSpeed: 2,
                        gameTimer: 75000,
                    };
                    this.sound.play("sfx-select");
                    this.scene.start("playScene");
                    break;
                case 2:
                    console.log("Normal mode activated.");
                    // hard mode
                    game.settings = {
                        spaceshipSpeed: 3,
                        gameTimer: 60000,
                    };
                    this.sound.play("sfx-select");
                    this.scene.start("playScene");
                    break;
                case 3:
                    console.log("Hard mode activated.");
                    // hard mode
                    game.settings = {
                        spaceshipSpeed: 4,
                        gameTimer: 45000,
                    };
                    this.sound.play("sfx-select");
                    this.scene.start("playScene");
                    break;
                default:
                    console.log("Invalid difficulty.");
            }
        }

        this.easy.setStyle(this.menuConfig);
        this.normal.setStyle(this.menuConfig);
        this.hard.setStyle(this.menuConfig);

        if (this.selected == 1) {
            this.easy.setStyle(this.menuConfigSelected);
        }
        if (this.selected == 2) {
            this.normal.setStyle(this.menuConfigSelected);
        }
        if (this.selected == 3) {
            this.hard.setStyle(this.menuConfigSelected);
        }
    }
}
