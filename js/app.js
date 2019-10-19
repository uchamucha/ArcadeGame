// Enemies our player must avoid
var Enemy = function(x, y) {
  this.x = x;
  this.y = y;
  this.randomizer = function() {
    return 100 * Math.random() + 100;
  };
  this.speed = this.randomizer();
  this.sprite = "images/enemy-bug.png";
};

//Update position x
Enemy.prototype.update = function(dt) {
  this.x += this.speed * dt;

  if (this.x > 500) {
    this.x = -100;
    this.speed = this.randomizer();
  }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let allEnemies = new Array();

//observed 83 to be optimal Y axis separation by trial and error
allEnemies[0] = new Enemy(0, 62);
allEnemies[1] = new Enemy(0, 145);
allEnemies[2] = new Enemy(0, 228);

let Player = function(x, y) {
  Enemy.call(this, x, y);
  this.sprite = "images/char-boy.png";
};

Player.prototype.update = function() {
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

  if (player.y < 0) {
    setTimeout(() => {
      player.x = 200;
      player.y = 405;
    }, 250);
  }
};
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(key) {
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

let player = new Player(200, 405);

document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
