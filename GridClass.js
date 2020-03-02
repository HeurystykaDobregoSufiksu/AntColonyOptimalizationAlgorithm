function GridC() {
  this.nid=0;
  //SETTING STARTING AND FINISH POINT
  this.setKeyNodes=function(){
    gridnodes[0].status=0;
    gridnodes[gridnodes.length-1].status=2;
    startnodeid=gridnodes[0].id;

    finishnodeid=gridnodes[gridnodes.length-1].id;
  }

  this.generateGrid= function(){
    gridnodes=[];
    //CREATING A GRAPH
    for(var i=0;i<Math.floor(cwidth/cell);i+=1){
        dd[i] = [];
      for(var j=0;j<Math.floor(cheight/cell);j+=1){
        dd[i][j] = new Node(i*cell,j*cell,this.nid);
        this.nid+=1;
      }
    }
    //ADDING PATHS TO NODES IN GRAPH

    for(var i=0;i<gridsize[0];i+=1){
      for(var j=0;j<gridsize[1];j+=1){
        if(i<gridsize[0]-1 && j<gridsize[1]-1){
          if(j>0){
              //edges.push(new Edge(dd[i][j].id,dd[i+1][j-1].id,edges.length));
              //dd[i][j].possibleWays.push(edges[edges.length-1]);
              //dd[i+1][j-1].possibleWays.push(edges[edges.length-1]);

          }

          edges.push(new Edge(dd[i][j].id,dd[i+1][j].id,edges.length));
          dd[i][j].possiblenodes.push(dd[i+1][j].id);
          dd[i][j].possibleWays.push(edges[edges.length-1]);
          dd[i+1][j].possibleWays.push(edges[edges.length-1]);
            dd[i+1][j].possiblenodes.push(dd[i][j].id);

          edges.push(new Edge(dd[i][j].id,dd[i][j+1].id,edges.length));
          dd[i][j].possiblenodes.push(dd[i][j+1].id);
          dd[i][j].possibleWays.push(edges[edges.length-1]);
          dd[i][j+1].possibleWays.push(edges[edges.length-1]);
          dd[i][j+1].possiblenodes.push(dd[i][j].id);

           edges.push(new Edge(dd[i][j].id,dd[i+1][j+1].id,edges.length));
           dd[i][j].possiblenodes.push(dd[i+1][j+1].id);
           dd[i][j].possibleWays.push(edges[edges.length-1]);
           dd[i+1][j+1].possibleWays.push(edges[edges.length-1]);
          dd[i+1][j+1].possiblenodes.push(dd[i][j].id);

        }else if(i<gridsize[0]-1 && j==gridsize[1]-1){
          //edges.push(new Edge(dd[i][j].id,dd[i+1][j-1].id,edges.length));
          //dd[i][j].possibleWays.push(edges[edges.length-1]);
          //dd[i+1][j-1].possibleWays.push(edges[edges.length-1]);

          edges.push(new Edge(dd[i][j].id,dd[i+1][j].id,edges.length));
          dd[i][j].possibleWays.push(edges[edges.length-1]);
          dd[i][j].possiblenodes.push(dd[i+1][j].id);
          dd[i+1][j].possibleWays.push(edges[edges.length-1]);
          dd[i+1][j].possiblenodes.push(dd[i][j].id);

        }else if(i==gridsize[0]-1 && j<gridsize[1]-1){
          edges.push(new Edge(dd[i][j].id,dd[i][j+1].id,edges.length));
          dd[i][j].possiblenodes.push(dd[i][j+1].id);
          dd[i][j].possibleWays.push(edges[edges.length-1]);
          dd[i][j+1].possibleWays.push(edges[edges.length-1]);
          dd[i][j+1].possiblenodes.push(dd[i][j].id);

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
