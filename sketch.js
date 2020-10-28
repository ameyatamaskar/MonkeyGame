
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var ground;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400, 400);

  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  //console.log(ground.x);
  
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();
}


function draw() {
  background(255);
  
  if (ground.x<0){
    ground.x=ground.width/2;
  }
  
  if (keyDown("space")&&monkey.y>=314){
   monkey.velocityY=-12; 
  }
  
  monkey.velocityY=monkey.velocityY+0.8;
  
  monkey.collide(ground);
  
  spawnBanana();
  spawnObstacles();
  
  
  if (obstaclesGroup.isTouching(monkey)){
    ground.x=0;
    monkey.velocityX=0;
    obstaclesGroup.velocityX=0;
    bananaGroup.velocityX=0;
    textSize(20);
    text("Game Over!",200,200)
  }
  
  if (bananaGroup.isTouching(monkey)){
    score=score+1;
    bananaGroup.destroyEach();
    textSize(20);
  }
  text("Score:"+score,100,150);
  
  
  var survivalTime=0;
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time:"+survivalTime,100,50);
  drawSprites();
}

function spawnBanana() {
  
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,250));
    banana.addImage(bananaImage);
    banana.scale = 0.101;
    banana.velocityX = -3;
    banana.lifetime = 200;
    bananaGroup.add(banana);
  }
}

function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(600,320,10,40);
   obstacle.velocityX=-6;
   obstacle.addImage(obstacleImage);
    obstacle.scale = 0.101;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
 }
}


