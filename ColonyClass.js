function AntColony(howmanyants){
  this.antspercolony=howmanyants;
  this.ants=[];
  this.bestScore=0;
  this.bestRoad=[];

  this.generateAnts=function(){
    for(var cntants=0;cntants<this.antspercolony;cntants+=1){
        this.ants.push(new Ant(startnodeid));
        this.ants[this.ants.length-1].calculateRoad();
    }
  }

  this.moveAnts=function(){

    for(var i=0;i<this.ants.length;i+=1){
      if(this.ants[i].antstatus==true){
        //this.ants[i].clcmoves();
        this.ants[i].moveAnt();
      }
    }
  }

  this.drawAnts=function(){
    for(var i=0;i<this.ants.length;i+=1){
      if(this.ants[i].antstatus==true){
          this.ants[i].drawAnt();
      }else{
        this.ants.splice(i,1);
        this.ants.push(new Ant(startnodeid));
        this.ants[this.ants.length-1].calculateRoad();
      }

    }
  }

  this.getBestscore=function(){
    for(var i=0;i<this.ants.length;i+=1){
      if(this.bestScore<this.ants[i].pheromoneAmount){
        this.bestScore=this.ants[i].pheromoneAmount;
        this.bestRoad=this.ants[i].roadmap;
      }
    }
  }
}
