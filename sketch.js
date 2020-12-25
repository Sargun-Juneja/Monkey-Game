var monkey, img, banana, stone, ground;
var obstacleGroup;
var stoneImage, bananaImage, player_running;
var backImage;
var score;

var obstaclesGroup;

function preload() {
  backImage = loadImage("jungle.jpg")
  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");

}

function setup() {
  createCanvas(550, 400);
  jungle = createSprite(200, 200, 400, 400);
  jungle.addImage("jungle", backImage);
  jungle.velocityX = -4

  jungle.x = jungle.width / 2;

  monkey = createSprite(50, 250, 20, 20);
  //banana = createSprite(350, 200, 20, 70);

  ground = createSprite(275, 370, 600, 1);


  monkey.addAnimation("player", player_running);
  monkey.scale = 0.1;

  ground.velocityX = -4;

  score = 0;

  //banana.addImage("banana",bananaImage);
  //banana.scale = 0.05

  ground.visible = false;
  obstaclesGroup = new Group();
  FruitGroup = new Group();

}

function draw() {
  background(255);
  //monkey.velocityX = 4;
  monkey.collide(ground)

  //monkey.debug = true;

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  if (jungle.x < 0) {
    jungle.x = jungle.width / 2;
  }



  if (keyDown("space")) {
    monkey.velocityY = -15;
  }

  monkey.velocityY = monkey.velocityY + 0.8

  Obstacles();
  Fruits();

  if (obstaclesGroup.isTouching(monkey)) {
    monkey.scale = 0.07;
  }

  if (FruitGroup.isTouching(monkey)) {
    score = score + 2;
    FruitGroup.destroyEach();
    monkey.scale = monkey.scale + 0.12;
  }

  switch (score) {
    case 100:
      monkey.scale = 0.12;
      break;
    case 250:
      monkey.scale = 0.14;
      break;
    case 500:
      monkey.scale = 0.16;
      break;
    case 750:
      monkey.scale = 0.18;
      break;
    case 1000:
      monkey.scale = 0.20;
      break;
  }

  drawSprites();
  score = score + Math.round(getFrameRate() / 60);
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 400, 50);
}


function Obstacles() {
  if (frameCount % 100 === 0) {
    var stone = createSprite(600, 350, 10, 40);
    stone.addImage("stone", stoneImage)
    stone.velocityX = -6;
    stone.scale = 0.2;
    stone.lifetime = 300;
    obstaclesGroup.add(stone);
  }
}

function Fruits() {
  if (frameCount % 150 === 0) {
    var banana = createSprite(600, 250, 10, 40);
    banana.addImage("banana", bananaImage)
    banana.velocityX = -6;
    banana.scale = 0.1;
    banana.lifetime = 300;
    FruitGroup.add(banana);
  }
}