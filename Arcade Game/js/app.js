// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed*dt;

    //Check if enemy is off screen, then create a new enemy with new random speed
    if(this.x > 500){
        this.x = -100;
        this.speed = Math.random()*400+100;
    }

    // Check for collision between player and enemies by calculating the distance between the player's center and the enemy's
    var enemyCenterX = this.x + 50
    var enemyCenterY = this.y + 85;
    var playerCenterX = player.x + 50;
    var playerCenterY = player.y + 85;
    if (Math.sqrt((Math.pow((enemyCenterX - playerCenterX),2)) + (Math.pow((enemyCenterY - playerCenterY),2))) < 50) {
        //If collision detected, reset player position
        player.x = 200;
        player.y = 380;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

//Make sure player does not get off screen
Player.prototype.update = function() {
    if(this.x > 505 - 101)
    this.x = 505 - 105;

    if(this.x <= 0)
        this.x = 0;

    if(this.y <= 0) {
        //If player wins, show a massage and reset the position
        alert("You Win!")
        player.x = 200;
        player.y = 380;
    }

    if(this.y > 606 - 226)
        this.y = 606 - 226;

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
            this.x -= 100;
            break;
        case 'up':
            this.y -= 80;
            break;
        case 'right':
            this.x += 100;
            break;
        case 'down':
            this.y += 80;
            break;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//Each enemy has its own random speed, with the appropriate  location
var allEnemies = [new Enemy(-100,60, Math.random()*400+100), new Enemy(-100,140,Math.random()*400+100), new Enemy(-100,220,Math.random()*400+100)];
var player = new Player(200, 380);




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
