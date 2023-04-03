var space, spaceImg;
var ast, astImg, astGroup;
var ast2, ast2Img;

var ast;
var ship, shipImg;
var block, blockGroup
var score = 0;
var highscore;
var reset;
var hit;
var cont;
var gameState = "PLAY";

function preload() {
  spaceImg = loadImage("space-5.jpg");
  astImg = loadImage("asteroid.png");
  shipImg = loadImage("spaceship-1.png");
  ast2Img = loadImage("ast2.png");
  hit =new Audio("ie_shot_gun-luminalace-770179786.mp3");
  cont = new Audio("alien-spaceship_daniel_simion.mp3");
}

function setup() {
  createCanvas(600, 600);
  space = createSprite(300, 600);
  space.addImage(spaceImg);
  space.velocityY = 1;

  ship = createSprite(300, 500, 50, 50);
  ship.addImage(shipImg);
  ship.scale = 0.14;
 // ship.debug = true;

  astGroup = new Group();
  blockGroup = new Group();
  highscore = localStorage.getItem("highScore") || 0;
}

function draw() {
  hit.volume=0.7;
  cont.volume=0.1;
  
  if (gameState === "PLAY") {
    cont.loop=true;
    cont.play();
    spawnast();
    spawnast2();
    drawSprites();
    if (space.y > 300) {
      space.y = 200;
    }
    score = score + Math.round(frameCount % 30 === 0);
    //highscore = score;
    fill("yellow");
    text("Score: " + score, 500, 50);
    text("HighScore: " + highscore, 500, 65);
    if (keyDown("up")) {
      ship.y = ship.y - 20;
    }
    if (keyDown("down")) {
      ship.y = ship.y + 20;
    }
    if (keyDown("right")) {
      ship.x = ship.x + 20;
    }
    if (keyDown("left")) {
      ship.x = ship.x - 20;
    }
    if(astGroup.isTouching(ship)){
      hit.play();
      cont.pause();
    }
    if (astGroup.isTouching(ship) || ship.y < 0 || ship.x < 0 || ship.x > 600 || ship.y > 600) {
      
      ship.destroy();
      gameState = "END";
    }
  }
  if (gameState === "END") {
    alert("Game Over! Your score is " + score + " pls press `ok` to reset");
    
    if (score > highscore) {
      highscore = score;
      localStorage.setItem("highScore", highscore);
    }
    resetgame();
  }
}

function spawnast() {
  if (frameCount % 25 === 0) {
    var ast = createSprite(Math.round(random(100, 500)), 50);
    ast.addImage(astImg);
    ast.scale = 0.3;

    ast.velocityY = 10;
    astGroup.add(ast);
    ast.lifetime = 800;
    ship.depth = ast.depth;
    ship.depth = ship.depth + 1;
    ast.setCollider("circle", -6, 0, 173);
    //ast.debug = true;

    var block = createSprite(200, 115);

    block.x = ast.x;
    block.y = ast.y;

    block.visible = false;
    block.y = ast.y - 12;
    block.velocityY = 1;
    block.lifetime = 800;
    blockGroup.add(block);
    block.setCollider("circle", 0, 7, 47);
    //block.debug = true;
  }
}

function spawnast2(){
  if(frameCount % 50 == 0){
    var ast2 = createSprite(Math.round(random(170, 350)), 50);
    ast2.addImage(ast2Img);
    ast2.scale = 0.3;
    ast2.velocityY = 13;
    astGroup.add(ast2);
    ast2.lifetime = 800;
    ship.depth = ast2.depth;
    ship.depth = ship.depth + 1;
    ast2.setCollider("circle", -6, 0, 155);
    //ast2.debug = true;

    var block = createSprite(200, 115);

    block.x = ast2.x;
    block.y = ast2.y;

    block.visible = false;
    block.y = ast2.y - 12;
    block.velocityY = 1;
    block.lifetime = 800;
    blockGroup.add(block);
    block.setCollider("circle", 0, 7, 47);
    //block.debug = true;
  }
}
function resetgame() {
  // Change gameState to PLAY
  gameState = "PLAY";
  
  // Reset score
  score = 0;
  
  // Destroy all asteroids and blocks
  astGroup.destroyEach();
  blockGroup.destroyEach();
  
  // Recreate the ship sprite
  ship = createSprite(300, 500, 50, 50);
  ship.addImage(shipImg);
  ship.scale = 0.14;
  //ship.debug = true;
  
  // Reset ship position and make it visible
  ship.position.x = 300;
  ship.position.y = 500;
  ship.visible = true;
  
  // Reset highscore if current score is higher
  if (score > highscore) {
    highscore = score;
    //localStorage.setItem("highscore", highscore);
  score=0;
  }
}

