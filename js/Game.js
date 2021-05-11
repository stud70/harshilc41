class Game{
    constructor(){

    }
    //getting info from database
    getState(){
        var gamestateref = database.ref("GameState");
        gamestateref.on("value",function(data){
            myGameState = data.val();

        })
    }

    //updating the database
    update(state){
        database.ref('/').update({
            GameState:state
        })
    }

    async start(){
        if(myGameState === 0){
            player = new Player();
            var playerCountRef = await database.ref("Count").once("value");
            if(playerCountRef.exists()){
                myPlayerCount = playerCountRef.val();
                player.getCount();
            }
            
            form = new Form();
            form.display();
        }
        car1 = createSprite(100, 200);
        car2 = createSprite(300, 200);
        car3 = createSprite(500, 200);
        car4 = createSprite(700, 200);
        cars = [car1, car2, car3, car4];

        car1.addImage("car1",car1Img);
        car2.addImage("car2",car2Img);
        car3.addImage("car3",car3Img);
        car4.addImage("car4",car4Img);
    }

    play(){
        form.hide_Elements();
        
        Player.getPlayerInfo();
        player.getcarsatEnd();
        player.rank = finishedPlayers;

        if(allPlayers !== undefined){
            //var displayPosition = 130;
            image(track, 0, -displayHeight*4, displayWidth, displayHeight*5);

            var index = 0;
            var x = 200, y;
            for(var i in allPlayers){

                index = index + 1;
                x = x+200;
                y = displayHeight - allPlayers[i].Distance;

                cars[index-1].x = x;
                cars[index-1].y = y;

                if(index === player.index){
                    fill(25,254,200);
                    ellipse(x, y, 100, 100);
                    textSize(20);
                    textAlign(CENTER);
                    stroke(255, 25, 200);
                    text(allPlayers[i].Name, x, y+70);
                    cars[index-1].shapeColor = "red";
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index-1].y;
                }

            }
        }

        if(keyIsDown(UP_ARROW)&& player.index !== null){
            player.distance = player.distance + 50;
            player.update();
            
        }
        if(player.distance > 4100){
            myGameState = 2;
            player.rank += 1;
            Player.updateCars_AtEnd(player.rank);            
        }

        drawSprites();
    }
    end(){
        background(ground);
        imageMode(CENTER);
        textSize(40);
        stroke(0, 255, 0);

        if(player.rank === 1)
        image(goldImg, displayWidth/2, -displayHeight*4+150, 100, 100);

        if(player.rank === 2)
        image(silverImg, displayWidth/2, -displayHeight*4+150, 100, 100);

        if(player.rank === 3)
        image(bronzeImg, displayWidth/2, -displayHeight*4+150, 100, 100);

       if(player.rank === 4)
        text("You Lose", displayWidth/2, -displayHeight*4+200);
    }
}