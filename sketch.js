let cell=50,alpha=2.59,beta=-0.11,dist=10,cwidth=600,cheight=600,drawnodes=true,drawall=false,antspercolony=100, crossNodeConnectionProbability=1,
gridnodes=[],startnodeid,finishnodeid, gridsize=[Math.floor(cwidth/cell),Math.floor(cheight/cell)], pathwidth=cell/10,
colonies=[],generations, dd = [],currentbestroad=[], maxp=cwidth/cell*cwidth/cell*5, Colony,Grid,evap=0.4,edges=[],showEdges=true;

function preload(){

}
function setup() {
  createCanvas(600,600);
  background(230);
  Grid = new GridC();
  Grid.generateGrid();
  Grid.setKeyNodes();
  Colony=new AntColony(antspercolony);
  Colony.generateAnts();
}

function draw() {
  if(frameCount%10==0){
      background(230);
      if(drawnodes==true){
          Grid.drawGrid();
      }
      Colony.drawAnts();
      Colony.moveAnts();
  }
  if (mouseIsPressed){
    gridnodes.forEach(function(nod) {
      if(Math.abs(mouseX-nod.xmiddle)<cell/2 && Math.abs(mouseY-nod.ymiddle)<cell/2){
        nod.status=9;
      }
    })


  }
}
