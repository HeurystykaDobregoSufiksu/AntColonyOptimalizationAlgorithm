function Edge(n1id,n2id,id2){
  this.id=id2, this.node1id=n1id, this.node2id=n2id;
  this.pheromone=1, this.pheromoneProc=0, this.color=color(0,0,0);
  this.checknodestatus=function(){
    if(gridnodes[this.node1id].status==9 || gridnodes[this.node2id].status==9){
      return false;
    }else{
      return true;
    }
  }
  this.drawEdge=function(){
    this.color=color(this.pheromoneProc*255,30,30,this.pheromoneProc*255);
    stroke(this.color);
    strokeWeight(pathwidth);
    line(gridnodes[this.node1id].xmiddle,gridnodes[this.node1id].ymiddle,gridnodes[this.node2id].xmiddle,gridnodes[this.node2id].ymiddle);
  }
}
