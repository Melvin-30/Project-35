var dog,dogimg, happyDog, database, foodS, foodStock

function preload()
{
  //load images here
  dogimg=loadImage("images/dogImg.png")
  happyDog=loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500,500);
  database = firebase.database();
  dog=createSprite(250,300,50,50)  
  dog.scale=0.25;
  dog.addImage(dogimg);
  foodStock=database.ref('Food');
  foodStock.on("value",function(data){
    foodS=data.val();;
 });
}


function draw() {  
  background(46,139,87)
  drawSprites();
  fill("black");
  textSize(15);
  text("Note:Press UP Arrow Key To Feed Drago Milk",100,25)
  text("Food remaining : "+foodS,175,150)
  //add styles here
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog)
  }
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}



