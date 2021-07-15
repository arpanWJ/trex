var trex,trex_running,edges,cloud,cloudImg;
var ground,groundImage,obstacles,obstaclesImg;
var groundInvisible,obstaclesImg2,obstaclesImg3,obstaclesImg4,obstaclesImg5,obstaclesImg6;
var score=0;
var PLAY=1,END=0;
var gameState=PLAY;
var obstaclesG,cloudG;
function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage=loadImage("ground2.png");
  cloudImg=loadImage("cloud.png");
  obstaclesImg1=loadImage("obstacle1.png");
  obstaclesImg2=loadImage("obstacle2.png");
  obstaclesImg3=loadImage("obstacle3.png");
  obstaclesImg4=loadImage("obstacle4.png");
  obstaclesImg5=loadImage("obstacle5.png");
  obstaclesImg6=loadImage("obstacle6.png");
}
function setup(){
  createCanvas(600,200);
  //edges = createEdgeSprites();
  trex =createSprite(50,150,20,50);
  trex.addAnimation("running" ,trex_running);
  trex.scale=0.5;
  ground=createSprite(300,180,600,10);
  ground.addImage("ground",groundImage);
 // ground.velocityX=-5;
  ground.scale=0.5;
  groundInvisible=createSprite(300,190,600,10);
  groundInvisible.visible=false;
  var rand=Math.round(random(100,200));
  console.log(rand);
obstaclesG=new Group();
cloudG=new Group();
}
function draw(){
  background("white");
  text("score: "+score,100,100);
  if (gameState===PLAY)
  {
  ground.velocityX=-5;
  if(ground.x<0){
    ground.x=300;
  }
  score=score+Math.round(frameCount/60);

  if(keyDown("space")&&trex.isTouching(ground)){
  trex.velocityY=-12;
}
trex.velocityY=trex.velocityY+0.8;
  spawnclouds();
  spawnObstacles();
if(obstaclesG.isTouching(trex)){
gameState=END;

}
}
if(gameState===END)
{
console.log("END");
ground.velocityX=0;
trex.velocityY=0;
obstaclesG.setVelocityXEach(0);
cloudG.setVelocityXEach(0); 
}

trex.collide( groundInvisible); 
  drawSprites();
} 

function spawnclouds(){
  if(frameCount%60==0){
  cloud=createSprite(600,50,10,10);
  cloud.y=Math.round(random(50,60));
  cloud.velocityX=-5;
  cloud.addImage(cloudImg);
  cloud.scale=0.5;
  cloud.depth=trex.depth;
  trex.depth=trex.depth+1;
  cloud.lifetime=120;
  cloudG.add(cloud);
  }
}

function spawnObstacles(){
  if(frameCount%60==0){
    obstacles=createSprite(600,170,10,10);
  obstacles.velocityX=-6;
    var choice=Math.round(random(1,6));
    switch(choice){
      case 1:obstacles.addImage(obstaclesImg1);
             break;
       case 2:obstacles.addImage(obstaclesImg2);
            break;
        case 3:obstacles.addImage(obstaclesImg3);
           break;
        case 4:obstacles.addImage(obstaclesImg4);
          break;
        case 5:obstacles.addImage(obstaclesImg5);
           break;
        case 6:obstacles.addImage(obstaclesImg6);
           break;
      default:break;    
    }
    obstacles.scale=0.5;
    obstacles.lifetime=100;
    obstaclesG.add(obstacles);
  }
}
