
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var mogli,edges, mogli_running, mogli_collided;
var jungleImage
var jungle;
var invisibleGround;
var obstaclesGroup, obstacle1, obstacle2;
var  rewardsGroup, reward, reward1;

var reset, resetImg;

function preload()
{
  mogli_running = loadAnimation("boy1.png", "boy2.png", "boy3.png", "boy4.png")
  jungleImage = loadImage("jungle.png");
  mogli_collided = loadAnimation("boyfalling.png");
  reward1 = loadImage("diamond_reward.jpg");
  reward = loadImage("coins.png");
  obstacle1 = loadImage("rocks.png");
  obstacle2 = loadImage("rocks2.png");
  resetImg = loadImage("reset (2).png");

}

function setup() {
	createCanvas(800, 400);
  
	//Creating the sprite for mogli and the ground.
  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle_road", jungleImage);
  jungle.x = width/2;
  jungle.scale = 3
  jungle.velocityX = - 4
 
  mogli = createSprite(80,330,50,150);
  mogli.addAnimation("mogli", mogli_running);
	mogli.scale = 0.5;
  mogli.addAnimation("collided", mogli_collided);
  mogli.setCollider("circle",0,0,300);
  edges = createEdgeSprites();
 
  invisibleGround = createSprite(400,10,1600,2);
  invisibleGround.visible = false;
  
  reset = createSprite(550,140);
  reset.addImage(resetImg);

  reset.visible = false;

  rewardsGroup = new Group();
  obstaclesGroup = new Group();

}


function draw() {
 background(0);
 
 if (gameState===PLAY){

  jungle.velocityX=-3

  if(jungle.x<100)
  {
     jungle.x=400
  }
 //console.log(mogli.y)
  if(keyDown("space")&& mogli.y>270) {
    
    mogli.velocityY = -16;
  }

  mogli.velocityY = mogli.velocityY + 0.8
  spawnRewards();
  spawnObstacles();
 
 if (jungle.x < 0){
  jungle.x = jungle.width/2;
}

if(obstaclesGroup.isTouching(mogli)){
  gameState = END;
}
if(rewardsGroup.isTouching(mogli)){

  rewardsGroup.destroyEach();
}
}
else if (gameState === END) {
gameOver.x=camera.position.x;
restart.x=camera.position.x;
//gameOver.visible = true;
//reset.visible = true;
mogli.velocityY = 0;
jungle.velocityX = 0;
obstaclesGroup.setVelocityXEach(0);
rewardsGroup.setVelocityXEach(0);

mogli.changeAnimation("boyfallling.png",mogli_collided);

obstaclesGroup.setLifetimeEach(-1);
rewardsGroup.setLifetimeEach(-1);

if(mousePressedOver(reset)) {
    reset();
}
}

else if (gameState === WIN) {
jungle.velocityX = 0;
mogli.velocityY = 0;
obstaclesGroup.setVelocityXEach(0);
rewardsGroup.setVelocityXEach(0);


obstaclesGroup.setLifetimeEach(-1);
rewardsGroup.setLifetimeEach(-1);


 


mogli.collide(invisibleGround);


  drawSprites();
 
}
}

function spawnRewards() {
 
  if (frameCount % 150 === 0) {

    var reward = createSprite(camera.position.x+500,330,40,10);

    reward.scale = 0.6;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: reward.addImage(reward);
              break;
      case 2: reward.addImage(reward1);
              break;
      default: break;
    }
       
    reward.scale = 0.05;
    reward.lifetime = 400;
    
    reward.setCollider("rectangle",0,0,reward.width/2,reward.height/2)
    rewardsGroup.add(reward);
    
  }
  
}




function spawnObstacles() {
  if(frameCount % 120 === 0) {

    var obstacle = createSprite(camera.position.x+400,330,40,40);
    obstacle.setCollider("rectangle",0,0,200,200)
    obstacle.addImage(obstacle1);
    obstacle.scale = 0.15;      

    obstacle.lifetime = 400;
    obstaclesGroup.add(obstacle);
    
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  reset.visible = false;
  mogli.visible = true;
  mogli.changeAnimation("mogli_running",
               mogli_running);
  obstaclesGroup.destroyEach();
  rewardsGroup.destroyEach();
 
}
