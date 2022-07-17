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
    this.load.image('background', '/assets/Terrain.png');
    this.load.spritesheet('player', '/assets/sprites/herotop.png', {frameWidth: 16, frameHeight: 16});
    this.load.image('platform', '/assets/playerhouse.png', {frameWidth: 64, frameHeight: 64});
    this.load.image('treeOne', 'assets/tree1.png', {frameWidth: 32, frameHeight: 32});
}

function create(){
    //BACKGROUND\\
    this.add.image(400, 300, 'background').setScale(5);

    //PLATFORMS\\
    platforms = this.physics.add.staticGroup();

    platforms.create(200, 250, 'platform').setScale(5);




    //CHARACTER SPRITE\\
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 3, end: 4 }),
        frameRate: 3,
        repeat: 0
    });

    this.anims.create({
        key: 'turn',
        frames: [{key: 'player', frame: 2}],
        frameRate:1
    });

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
        frameRate: 3,
        repeat: 0
    });

    //CHARACTER PHYSICS\\
    hero = this.physics.add.sprite(100, 450, 'player');
    hero.body.setGravityY(300);
    hero.setScale(3);
    hero.setBounce(0.2);
    hero.setCollideWorldBounds(true);
    this.physics.add.collider(hero, platforms)

    //MOVEMENT CONTROLS\\
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

}

function update(){

    if(keyA.isDown) {
        hero.x = hero.x - 2;
        hero.anims.play('left', true);
    } else if(keyS.isDown) {
        hero.y = hero.y + 2;
    } else if(keyD.isDown) {
        hero.x = hero.x + 2;
        hero.anims.play('right', true);
    } else if(keyW.isDown) {
        hero.y = hero.y - 17;
    }
}
