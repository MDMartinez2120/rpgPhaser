//Configuration
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 300},
           debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


let game = new Phaser.Game(config);

let keyA;
let keyS;
let keyD;
let keyW;

function preload(){
    this.load.image('background', '/assets/Backdrop.png');
    this.load.spritesheet('player', '/assets/sprites/Hero.png', {frameWidth: 32, frameHeight: 32});
    this.load.image('platform', '/assets/Platform.png');

}

function create(){
    //BACKGROUND
    let backdrop = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background');
    let scaleX = this.cameras.main.width / backdrop.width
    let scaleY = this.cameras.main.height / backdrop.height
    let scale = Math.max(scaleX, scaleY);
    backdrop.setScale(scale).setScrollFactor(0);

    //PLATFORMS
    platforms = this.physics.add.staticGroup();

    platforms.create(600, 400, 'platform').setScale(5);
    platforms.create(150, 350, 'platform').setScale(5);



    //CHARACTER SPRITE
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
        frameRate: 2,
        repeat: -1
    });
    hero = this.physics.add.sprite(100, 450, 'player');
    hero.play('walk');
    hero.body.setGravityY(300);
    hero.setScale(3);
    hero.setBounce(0.2);
    hero.setCollideWorldBounds(true);



    this.physics.add.collider(hero, platforms)

    //MOVEMENT CONTROLS
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

}

function update(){

    if(keyA.isDown) {
        hero.x = hero.x - 2;
    } else if(keyS.isDown) {
        hero.y = hero.y + 2;
    } else if(keyD.isDown) {
        hero.x = hero.x + 2;
    } else if(keyW.isDown || keyD.isDown) {
        hero.y = hero.y - 17;
    }

}
