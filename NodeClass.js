function Node(y,x,id2){
  this.id=id2, this.x=x, this.y=y,this.xmiddle=this.x+cell/2,this.ymiddle=this.y+cell/2;
  this.possibleWays=[];
  this.possiblenodes=[];
  this.status;
  if(Math.random()<0.1){
    this.status=9;
  }else{
    this.status=1;
  }

  this.calcEdgesVal=function(){
    this.neigbursPaths=0;
    for(var edc=0;edc<this.possibleWays.length;edc+=1){
      this.neigbursPaths+=this.possibleWays[edc].pheromone;
    }
    for(var edc=0;edc<this.possibleWays.length;edc+=1){
      this.possibleWays[edc].pheromoneProc=this.possibleWays[edc].pheromone/this.neigbursPaths;
    }
  }
  this.drawEdges=function(){
    this.calcEdgesVal();
    for(var edc=0;edc<this.possibleWays.length;edc+=1){
      this.possibleWays[edc].drawEdge();
    }
  }
  this.drawNode=function(){
    // for(var linecnt=0;linecnt<this.possibleWays.length;linecnt+=1){
    //   line(this.x+cell/2,this.y+cell/2,this.possibleWays[linecnt].x+cell/2,this.possibleWays[linecnt].y+cell/2);
    // }
    if(showEdges===true){
        this.drawEdges();
    }
    strokeWeight(0);
    if(this.status==0){
        fill(color(0, 100, 0));
        ellipse(this.x+cell/2,this.y+cell/2,cell/2);

    }else if(this.status==2){
        fill(color(0, 0, 0));
        ellipse(this.x+cell/2,this.y+cell/2,cell/2);

    }else if(this.status==9){
        fill(color(0, 0, 0));
        rect(this.x,this.y,cell,cell);
    }
    else{
      if(drawall===true){
        fill(color(0, 0, 0));
        ellipse(this.x+cell/2,this.y+cell/2,cell/2);
      }
    }
  }
}
