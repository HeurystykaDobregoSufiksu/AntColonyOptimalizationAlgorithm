function Grid() {
  this.nid=0;
  this.setKeyNodes=function(){
    gridnodes[0].status=0;
    gridnodes[gridnodes.length-1].status=2;
  }
  this.generateGrid= function(){
    for(var i=0;i<Math.floor(cwidth/cell);i+=1){
        dd[i] = [];
      for(var j=0;j<Math.floor(cheight/cell);j+=1){
        dd[i][j] = new Node(i*cell,j*cell,this.nid);
        this.nid+=1;
      }
    }
    for(var i=0;i<Math.floor(cwidth/cell);i+=1){
      for(var j=0;j<Math.floor(cheight/cell);j+=1){
        if(i==0 && j==0){
          dd[i][j].possibleWays.push(dd[i+1][j+1]);
          dd[i][j].possibleWays.push(dd[i][j+1]);
          dd[i][j].possibleWays.push(dd[i+1][j]);
        }else if(i==0 && j==gridsize[1]-1){
          dd[i][j].possibleWays.push(dd[i][j-1]);
          dd[i][j].possibleWays.push(dd[i+1][j]);
          dd[i][j].possibleWays.push(dd[i+1][j-1]);
        }else if(i==gridsize[0]-1 && j==0){
          dd[i][j].possibleWays.push(dd[i-1][j]);
          dd[i][j].possibleWays.push(dd[i-1][j+1]);
          dd[i][j].possibleWays.push(dd[i][j+1]);
        }else if(i==gridsize[0]-1 && j==gridsize[1]-1){
          dd[i][j].possibleWays.push(dd[i-1][j-1]);
          dd[i][j].possibleWays.push(dd[i][j-1]);
          dd[i][j].possibleWays.push(dd[i-1][j]);
        }else if(i==0){
          dd[i][j].possibleWays.push(dd[i][j-1]);
          dd[i][j].possibleWays.push(dd[i][j+1]);
          dd[i][j].possibleWays.push(dd[i+1][j-1]);
          dd[i][j].possibleWays.push(dd[i+1][j]);
          dd[i][j].possibleWays.push(dd[i+1][j+1]);
        }else if(i==gridsize[0]-1){
          dd[i][j].possibleWays.push(dd[i-1][j-1]);
          dd[i][j].possibleWays.push(dd[i-1][j]);
          dd[i][j].possibleWays.push(dd[i-1][j+1]);
          dd[i][j].possibleWays.push(dd[i][j-1]);
          dd[i][j].possibleWays.push(dd[i][j+1]);
        }else if(j==gridsize[1]-1){
          dd[i][j].possibleWays.push(dd[i-1][j-1]);
          dd[i][j].possibleWays.push(dd[i-1][j]);
          dd[i][j].possibleWays.push(dd[i][j-1]);
          dd[i][j].possibleWays.push(dd[i+1][j-1]);
          dd[i][j].possibleWays.push(dd[i+1][j]);
        }else if(j==0){
          dd[i][j].possibleWays.push(dd[i-1][j]);
          dd[i][j].possibleWays.push(dd[i-1][j+1]);
          dd[i][j].possibleWays.push(dd[i][j+1]);
          dd[i][j].possibleWays.push(dd[i+1][j]);
          dd[i][j].possibleWays.push(dd[i+1][j+1]);
        }else{
          dd[i][j].possibleWays.push(dd[i-1][j-1]);
          dd[i][j].possibleWays.push(dd[i-1][j]);
          dd[i][j].possibleWays.push(dd[i-1][j+1]);
          dd[i][j].possibleWays.push(dd[i][j-1]);
          dd[i][j].possibleWays.push(dd[i][j+1]);
          dd[i][j].possibleWays.push(dd[i+1][j-1]);
          dd[i][j].possibleWays.push(dd[i+1][j]);
          dd[i][j].possibleWays.push(dd[i+1][j+1]);
        }
        gridnodes.push(dd[i][j]);
      }
    }
  }

  this.drawGrid=function(){
    gridnodes.forEach(function(node) {
      node.drawNode();
    });
  }
}
