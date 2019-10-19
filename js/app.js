// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = "images/enemy-bug.png";
};

//Update position x
Enemy.prototype.update = function(dt) {
  this.x += this.speed * dt;
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

let Player = function(x, y) {
  Enemy.call(this, x, y);
  this.sprite = "images/char-boy.png";
};

Player.prototype.update = function(dt) {};
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(key) {
  // Move up one block until river
  if (key == "up" && this.y > 0) {
    this.y -= 83;
  } else if (key == "down" && this.y < 400) {
    this.y += 83;
  } else if (key == "left" && this.x > 0) {
    this.x -= 100;
  } else if (key == "right" && this.x < 400) {
    this.x += 100;
  } else if (this.y < 0) {
    this.x = 200;
    this.y = 405;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = new Array();

//observed 83 to be optimal y separation by trial and error
allEnemies[0] = new Enemy(0, 62, 50);
allEnemies[1] = new Enemy(0, 145, 50);
allEnemies[2] = new Enemy(0, 228, 50);

let player = new Player(200, 405);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
