var myGameState = 0;
var myPlayerCount = 0;
var form,player,game;
var database, position;
var allPlayers;
var car1, car2, car3, car4, cars;
var track, bg, ground, car1Img, car2Img, car3Img, car4Img;
var goldImg, silverImg, bronzeImg;
var finishedPlayers;

function preload(){
    track = loadImage("images/track.jpg");
    bg = loadImage("images/track.png");
    ground = loadImage("images/ground.png");

    car1Img = loadImage("images/car1.png");
    car2Img = loadImage("images/car2.png");
    car3Img = loadImage("images/car3.png");
    car4Img = loadImage("images/car4.png");

    goldImg = loadImage("images/gold.png");
    silverImg = loadImage("images/silver.png");
    bronzeImg = loadImage("images/bronze.png");
}
function setup(){
    createCanvas(displayWidth-40, displayHeight-30);

    database = firebase.database();
   
    game = new Game();
    game.getState();
    game.start();

}

function draw(){
    background(bg);
    
    if(myPlayerCount === 4){
        game.update(1);
    }
    
    if(myGameState === 1){
        clear ();
        game.play();
        
    }

    if(myGameState === 2 && finishedPlayers > 0)
    {
        image(track, 0, -displayHeight*4, displayWidth, displayHeight*5);
        drawSprites();
        console.log(player.distance);
    }
    if(myGameState === 2 && finishedPlayers === 4){
        game.end();
    }
}