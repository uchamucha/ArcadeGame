// Bugs constructor
var Enemy = function(x, y) {
  this.x = x;
  this.y = y;
  this.randomizer = function() {
    return 100 * Math.random() + 100;
  };
  this.speed = this.randomizer();
  this.sprite = "images/enemy-bug.png";
};

//Update bug position along x-axis
Enemy.prototype.update = function(dt) {
  //make bugs move
  this.x += this.speed * dt;

  //make bugs reappear head first
  if (this.x > 500) {
    this.x = -100;
    this.speed = this.randomizer();
  }
};

// Render bugs on the screen
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Create array to hold bug instances
let allEnemies = new Array();

// Instantiate three bugs and store them in the array
allEnemies[0] = new Enemy(0, 62);
allEnemies[1] = new Enemy(0, 145);
allEnemies[2] = new Enemy(0, 228);

// Player constructor
let Player = function(x, y) {
  // Using call on Enemy constructor to keep things DRY
  Enemy.call(this, x, y);
  this.sprite = "images/char-boy.png";
};

// Update Player position on the canvas
Player.prototype.update = function() {
  // Collision detection!
  allEnemies.forEach(function(bug) {
    if (
      player.x - bug.x < 80 &&
      player.x - bug.x > -80 &&
      (player.y - bug.y < 70 && player.y - bug.y > -70)
    ) {
      player.x = 200;
      player.y = 405;
    }
  });

  //Reset player after reaching river
  if (this.y < 0) {
    setTimeout(() => {
      this.x = 200;
      this.y = 405;
    }, 250);
  }
};

// Render player on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Add method to handle input to change player
Player.prototype.handleInput = function(key) {
  if (key == "up" && this.y > 0) {
    this.y -= 83;
  } else if (key == "down" && this.y < 400) {
    this.y += 83;
  } else if (key == "left" && this.x > 0) {
    this.x -= 100;
  } else if (key == "right" && this.x < 400) {
    this.x += 100;
  }
};

// Instantiate player
let player = new Player(200, 405);

// Add eventlisteners for keys
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
