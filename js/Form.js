class Form{
    constructor(){
        this.input = createInput("").attribute("placeholder", "Name");
        this.title = createElement('h2');
        this.button = createButton("Next");
        this.greeting = createElement('h3');
        this.reset = createButton("Reset");
    }

    hide_Elements(){
        this.input.hide();
        this.button.hide();
        this.greeting.hide();
        
    }
    display(){
        
        background(bg);
        this.title.html("Drag Racing"); 
        this.title.position(displayWidth/2-50,0);
        
        this.input.position(displayWidth/2-40,displayHeight/2-80);

        this.button.position(displayWidth/2+30,displayHeight/2);
        
        this.reset.position(displayWidth-120, 30);
        
        this.button.mousePressed(()=>{
            this.input.hide();
            this.button.hide();

            //error here
            player.name = this.input.value();
            myPlayerCount=myPlayerCount+1;

            //here
            player.index = myPlayerCount;
            console.log(myPlayerCount +" "+player.name)
            player.update();
            player.updatecount(myPlayerCount);
          
            //error here
            this.greeting.html("Hello "+player.name);
            this.greeting.position(displayWidth/2-70,displayHeight/4);
        })

        this.reset.mousePressed(()=>
        {
            player.updatecount(0);
            game.update(0);
            database.ref('/').update({
                Players:null,
                CarsAtEnd : 0
            });

        })
        }
}