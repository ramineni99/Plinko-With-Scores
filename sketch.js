const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var world;
var particle;
var plinkos = [];
var divisions = [];
var divisionHeight=300;
var score =0;
var particle;
var count=0;
var turn = 0;
var gameState = "PLAY";
const Constraint = Matter.Constraint;

function setup() {
  

  engine = Engine.create();
  world = engine.world
  createCanvas(800,800);
  for(var k = 0;k<=width;k=k+80){
    divisions.push(new Division(k,height-divisionHeight/2,10,divisionHeight));
   }
   for(var t=0;t<width;t=t+50){
     plinkos.push(new Plinko(t,75,10));
     plinkos.push(new Plinko(t,150,10));
     plinkos.push(new Plinko(t,225,10));
     plinkos.push(new Plinko(t,300,10));
     plinkos.push(new Plinko(t,375,10));

   }
 // create bodies here
  ground = new Ground(400,height,800,20);
  
  Engine.run(engine);
  
}

function draw() {
  rectMode(CENTER);
  background(0);
  Engine.update(engine);
  textSize(30);
  fill("white");
  text("Score:"+score,20,50);
  text("50",20,750);
  text("100",740,750);
  text("100",660,750);
  text("100",580,750);
  text("100",500,750);
  text("100",420,750);
  text("50",340,750);
  text("50",260,750);
  text("50",180,750);
  text("50",100,750);
  rect(400,480,800,5);
  if(particle!=null){
    particle.display();
    if(particle.body.position.y>480){
      if(particle.body.position.x>=420){
       score=score+100;
       particle=null;
       if(count>=10) gameState = "END"
      }
    }
  }
  if(particle!=null){
    particle.display();
    if(particle.body.position.y>480){

      if(particle.body.position.x<=420){
       score=score+50;
       particle=null;
       if(count>=10) gameState = "END"
      }
    }
  }
 
 //display bodies here
   ground.display();
   if(gameState=="END"){
     text("Game Over",200,200);
   }
   for(var e = 0;e<divisions.length;e=e+1){
    divisions[e].display();
   }
   for(var q = 0;q<plinkos.length;q=q+1){
    plinkos[q].display();
   }
  
   drawSprites();
}
 function mouseReleased(){

  if(gameState=="PLAY"){
    particle = new Particle(mouseX,10,10);
    count=count+1;
  }

 }
