//Configuration
let config = {
    type: Phaser.AUTO,
    width: 2560,
    height: 1440,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 200}
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};


let game = new Phaser.Game(config);

let keyA;
let keyS;
let keyD;
let keyW;

function preload(){
    this.load.setBaseURL("https://labs.phaser.io");

    this.load.image('background', 'https://thumbs.dreamstime.com/z/pixel-art-trees-pixel-art-seamless-background-trees-grass-105761511.jpg')
    this.load.image('player', '/assets/sprites/player.png')
    this.load.image('slime', '/assets/sprites/slime.png')

}

function create(){
    let background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background')
    let scaleX = this.cameras.main.width / background.width
    let scaleY = this.cameras.main.height / background.height
    let scale = Math.max(scaleX, scaleY)
    background.setScale(scale).setScrollFactor(0)

    hero = this.physics.add.sprite(270, 450, 'player');
    hero.setCollideWorldBounds(true);

    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

}

function update(){

    if(keyA.isDown) {
        hero.x = hero.x - 2;
    } else if(keyS.isDown) {
        hero.x = hero.x + 2;
    } else if(keyD.isDown) {
        hero.y = hero.y - 2;
    } else if(keyW.isDown) {
        hero.y = hero.y + 2;
    }

}
