const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;
var  mute1
var bg_sound
var cut_sound
var sad_sound
var eating_sound
var air
var canW
var canH


function preload(){
bg_img=loadImage("background.png")
food=loadImage("melon.png")
bunny_img=loadImage("Rabbit-01.png")
blink=loadAnimation("blink_1.png","blink_2.png","blink_3.png")
eat=loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png",)
sad=loadAnimation("sad_1.png","sad_2.png","sad_3.png",)

bg_sound=loadSound('sound1.mp3')
sad_sound=loadSound('sad.wav')
air=loadSound('air.wav')
cut_sound=loadSound('rope_cut.mp3')
eating_sound=loadSound('eating_sound.mp3')

blink.playing=true
eat.playing=true
sad.playing=true
sad.looping=false
eat.looping=false
}

function setup() 
{
  var isMobile=/iPhone|iPad|iPod|Andriod/i.test(navigator.userAgent)
  if(isMobile){
    canW=windowWidth
    canH=windowHeight
    createCanvas(displayWidth+80,displayHeight);
  }
  else{
    canW=windowWidth
    canH=windowHeight
    createCanvas(windowWidth,windowHeight);
  }
  frameRate(80);
  bg_sound.play()
  bg_sound.setVolume(0.5)

  engine = Engine.create();
  world = engine.world;
  
  button=createImg('cut_btn.png')
button.position(220,30)
button.size(50,50)
button.mouseClicked(drop)

button2=createImg('cut_btn.png')
button2.position(330,35)
button2.size(50,50)
button2.mouseClicked(drop2)

button3=createImg('cut_btn.png')
button3.position(360,200)
button3.size(50,50)
button3.mouseClicked(drop3)

blower=createImg('balloon.png')
blower.position(10,250)
blower.size(150,100)
blower.mouseClicked(airblow)

mute1=createImg('mute.png')
mute1.position(450,20)
mute1.size(50,50)
mute1.mouseClicked(mute)

bunny=createSprite(200,620,100,100)
bunny.addImage(bunny_img)
bunny.scale=0.2
bunny.addAnimation("blinking",blink)
bunny.addAnimation("eating",eat)
bunny.addAnimation("crying",sad)

bunny.changeAnimation('blinking')
  rope = new Rope(7,{x:245,y:30});
  rope2 = new Rope(7,{x:370,y:40});
  rope3 = new Rope(7,{x:400,y:20});

  ground = new Ground(200,680,600,20);
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);


  blink.frameDelay=20
  eat.frameDelay=20
  sad.frameDelay=20
  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit);
  fruit_con3 = new Link(rope3,fruit );

  rectMode(CENTER);
  imageMode(CENTER)


  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,displayWidth+80,displayHeight)
  push()
  imageMode(CENTER)
  if (fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70)
  }
  rope.show();
  rope2.show();
  rope3.show();

  ellipse(fruit.position.x,fruit.position.y,30,30);
  Engine.update(engine);
  ground.show();

  if(collide(fruit,bunny)==true){
    bunny.changeAnimation('eating')
  }

  if(collide(fruit,ground.body)==true){
    bunny.changeAnimation('crying')
  }
 

drawSprites()
 
   
}
function drop(){
  cut_sound.play()
  rope.break()
  fruit_con.detach()
  fruit_con=null
}

function drop2(){
  cut_sound.play()
  rope2.break()
  fruit_con2.detach()
  fruit_con2=null
}
function drop3(){
  cut_sound.play()
  rope3.break()
  fruit_con3.detach()
  fruit_con3=null
}

function collide(body,sprite){
if(body!=null){
  var d=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
  if (d<=80){
World.remove(engine.world,fruit)
fruit=null
return true
  }
  else{
    false
  }
}
}

function keyPressed(){
  if(keyCode===LEFT_ARROW){
airblow()
  }
}

function airblow(){
Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})
air.play()
}

function mute(){
if(bg_sound.isPlaying()){
  bg_sound.stop()
}
else{
  (bg_sound.play())
}
}