/**
 *  Player's movement without physics
 *  Bounds check
 *  One more player added
 *  With simple collision rule
 */

// keys variable declaration
let keyA;
let keyS;
let keyD;
let keyW;

let bg;
let platforms;
let playerName;
let status;
let statusUpdate;


let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "thegame",

    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.spritesheet('dude', 'assets/dude.png',
     { frameWidth: 32, frameHeight: 48 }
    );
    this.load.spritesheet('boy', 'assets/dude.png',
     { frameWidth: 32, frameHeight: 48 }
    );
}

function create() {
    // displaying the sky
    bg = this.add.image(400, 300, 'sky');

    // displaying the player
    player = this.add.sprite(100, 450, 'dude');

    // player's name
    playerName = this.add.text(player.x, player.y, 'Dude',
     { fontSize: '20px', fill: '#000' }
    );

    // player2 set up
    playerY = this.add.sprite(650, 200, 'boy'); 

    // player2's name
    playerYName = this.add.text(playerY.x, playerY.y, 'Boy',
     { fontSize: '20px', fill: '#000' }
    ); 


    // ability left
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude',
         { start: 0, end: 3 }
        ),
        frameRate: 10,
        repeat: -1
    });

    // ability to turn left
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    // ability to turn right
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude',
         { start: 5, end: 8 }
        ),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();

    // keysA,S,D,W setup
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

}

function update() {
    if (cursors.left.isDown) {

        if(player.x > (player.width * 1)) { // checking bounds +x axis (player.width / 1)
            player.x -= 2;
        }   

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown && !((player.x + (player.width/2)) == (playerY.x - (playerY.width/2))))
    {
        if (player.x < (config.width - 30)) { // checking bounds +x axis
            player.x += 2;

            player.anims.play('right', true);
        }

    }
    else
    {
        player.anims.play('turn');
    }
    if (cursors.up.isDown) 
    {
        if (player.y > (player.width * 1)) { // checking bounds -y axis
            player.y -= 2;
        }
        
    }
    else if (cursors.down.isDown)
    {
        if (player.y < (config.height - 30)) { // checking bounds +y axis
            player.y += 2;
        }
        
    }

    // follows the player on the x-axis
    playerName.x = player.x - 20;

    // follows the player on the y-axis
    playerName.y = player.y - 30;

    // keysA,S,D,W movement
    if (keyA.isDown) {
        if (playerY.x > (playerY.width / 2)) {
            playerY.x -= 2;
        }
        playerY.anims.play('left', true);
    }
    else if (keyD.isDown)
    {
        if (playerY.x < (config.width - 30)) 
        {
            playerY.x += 2;
        }
        playerY.anims.play('right', true);
    }
    else if (keyW.isDown)
    {
        if (playerY.y > (player.width * 1)) {
            playerY.y -= 2;
        }
    }
    else if (keyS.isDown)
    {
        if (playerY.y < (config.height - 30))
        {
            playerY.y += 2;
        }
    }
    else
    {
        playerY.anims.play('turn');
    }

    /* Namme badge for player2 */
    // follows player2 on the x-axis
    playerYName.x = playerY.x - 20;

    // follows player2 on the y-axis
    playerYName.y = playerY.y - 30; 
}