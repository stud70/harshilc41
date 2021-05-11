class Player{
    constructor(){
        this.index = null;
        this.distance = 0;
        this.name = null;
        this.rank = 0;

    }

    getCount(){
    var playerCountref = database.ref('Count');
    playerCountref.on("value", function(data){
        myPlayerCount = data.val();
   })
    }

    updatecount(Count){
        database.ref('/').update({
            Count:Count
        })
    }
    update(){
        var playerIndex = "Players/Player"+this.index;
        database.ref(playerIndex).set({
            Name:this.name,
            Distance : this.distance
        })

    }

    getcarsatEnd(){
        var finishedPlayersinforef = database.ref("CarsAtEnd");
        finishedPlayersinforef.on("value",(data)=>{
            finishedPlayers = data.val();

        })
    }

    static updateCars_AtEnd(rank){
        database.ref("/").update({
            CarsAtEnd : rank
        })
    }
    
    static getPlayerInfo(){
        var playerinforef = database.ref("Players");
        playerinforef.on("value",(data)=>{
        allPlayers = data.val();
        
        })
    }
}