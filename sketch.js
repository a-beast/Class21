var space,spaceImg
var rocket,rocketImg
var star,starImg
var astroid,astroidImg
var gameOver,gameOverImg
var restart,restartImg
var gameState = "play"
var crash,crashImg
var points
var stars


function preload(){
spaceImg = loadImage("bg.png")
rocketImg = loadAnimation("rocket.png")
starImg = loadImage("star.png")
astroidImg = loadImage("astroid.png")
gameOverImg = loadImage("game over.png")
restartImg = loadImage("restart.png")
crashImg= loadImage("crash.png")
tune = loadSound("tune.mp3")
tune2 = loadSound("lost.mp3")
boom = loadAnimation("boom.png")
}

function setup() {
createCanvas(400,670)

//tune.loop()
space=createSprite(200,300)
space.addImage("space",spaceImg)
space.velocityY=1

rocket=createSprite(300,300,50,50)
rocket.addAnimation("rocket",rocketImg)
rocket.addAnimation("boom",boom)
rocket.scale=0.2

starsGroup = new Group()
astroidsGroup = new Group()

gameOver = createSprite(200,350)
gameOver.addImage(gameOverImg)

restart = createSprite(200,550)
restart.addImage(restartImg)
restart.scale=1.5
crash = createSprite(200,100)
crash.addImage(crashImg);

rocket.debug=true 
rocket.setCollider("rectangle",0,0,150,200)

points=0
stars=0

edges=createEdgeSprites()
}


function draw() {

background(255)




if(space.y > 400){
  space.y = 300}
                
if (gameState==="play") {

  rocket.scale=0.2

  space.velocityY = (4 + 3* points/100)
  points = points + Math.round(getFrameRate()/60) 

  rocket.changeAnimation("rocket",rocketImg)

    if(keyDown("SPACE")){
     
         rocket.velocityY = -10 
    }
    
  rocket.x = World.mouseX

   spawnastroids()
   spawnstars()

  rocket.velocityY = rocket.velocityY + 0.5 

  rocket.bounceOff(edges[0])
  rocket.bounceOff(edges[1])

  if(starsGroup.isTouching(rocket)){
    stars+=1
    starsGroup.destroyEach()
  }

  if(astroidsGroup.isTouching(rocket) || rocket.y > 600){
    gameState = "end"

  }

  

gameOver.visible=false
restart.visible=false 
crash.visible=false

}
 
  if (gameState === "end"){
    gameOver.visible=true
    restart.visible=true
    crash.visible=true
    astroidsGroup.setLifetimeEach(-1)
    starsGroup.setLifetimeEach(-1)
     
    astroidsGroup.setVelocityYEach(0)
    starsGroup.setVelocityYEach(0)

    space.velocityY = 0
    rocket.velocityY = 0
    
    if (mousePressedOver(restart)) {
    reset()
  }

  rocket.changeAnimation("boom",boom)
  rocket.scale=0.8

  }


drawSprites()
fill ("yellow")
text("POINTS:- "+ points,290,30)

fill ("yellow")
text("STARS:- "+ stars,290,60)

}

function spawnastroids() {
  if (frameCount % 240 === 0) {
    astroid = createSprite(200,-50)
    astroid.addImage(astroidImg)
    astroid.scale=0.3

    astroid.x=Math.round(random(120,400))
    astroid.debug=true
    astroid.setCollider("circle",0.1,1,90)
    astroid.velocityY= (1+points/100)

    rocket.depth = astroid.depth
    rocket.depth +=1
   // 9462331548

    astroid.lifetime = 800

    astroidsGroup.add(astroid);
}
}

function spawnstars() {
if (frameCount % 240 === 0) {
    star = createSprite(200,-20)
    star.addImage(starImg)
    star.scale=0.3

    star.x=Math.round(random(120,400))

    star.velocityY= (1+points/100)

    rocket.depth = star.depth
    rocket.depth +=1

    star.lifetime = 800

    starsGroup.add(star);
}
}

function reset(){
  gameState="play"
  starsGroup.destroyEach()
  astroidsGroup.destroyEach()
  gameOver.visible=false
  restart.visible=false  
  crash.visible=false
  points=0 
  stars=0
  rocket.x=300
  rocket.y=300
  rocket.scale=0.2
}