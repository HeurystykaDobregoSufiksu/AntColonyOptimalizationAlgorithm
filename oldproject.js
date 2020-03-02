var cell=60,cwidth=600,cheight=600,drawnodes=true,antspercolony=1, crossNodeConnectionProbability=1, maxmoves=20,gridnodes=[],startnodeid,finishnodeid,
gridsize=[cwidth/cell,cheight/cell],colonies=[],generations, dd = [],currentbestroad=[], maxp=500000, Colony,Grid,img,evap=0.75;

function preload(){
   img = loadImage("pap.png");
}
function setup() {
  createCanvas(600,600);
  background(230);
  Grid = new Grid();
  Grid.generateGrid();
  Grid.setKeyNodes();
  Colony=new Colony(antspercolony);
  Colony.generateAnts();
}

function draw() {
  if(frameCount%60==0){
      background(230);
      if(drawnodes==true){
          Grid.drawGrid();
      }
      Colony.drawAnts();
      Colony.moveAnts();
  }
}

function Colony(howmanyants){
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
      this.ants[i].moveAnt();
    }
  }
  this.drawAnts=function(){
    for(var i=0;i<this.ants.length;i+=1){
      this.ants[i].drawAnt();
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

function Ant(){
  this.bttf=1;
  this.foundfoood=false;
  this.currentposition=startnodeid;
  this.pheromoneAmount=0;
  this.roadmap=[startnodeid];

  this.calculateRoad=function(){
    this.roadmap=[];
    this.roadmap.push(startnodeid);
    this.lastparent=0;
  }

  this.determineNextMove=function(){
      this.roulette=[],this.roulettecumulated=[],this.rouletteelements=[];
      this.neighburspheromone=0;
      this.neigburscount=0;
      if(this.currentposition!=startnodeid){
        this.neigburscount=gridnodes[this.currentposition].possibleWays.length-1;
        for(var a=0;a<gridnodes[this.currentposition].possibleWays.length;a+=1){
          //watch out for reference
          //console.log(this.roadmap.length-2);
          if(gridnodes[this.currentposition].possibleWays[a].id!=this.roadmap[this.roadmap.length-2]){
            this.neighburspheromone+=gridnodes[this.currentposition].possibleWays[a].pheromone;
            this.rouletteelements.push(gridnodes[this.currentposition].possibleWays[a].id);
            console.log(this.rouletteelements[a]+"element "+a);
          }
        }
        for(var b=0;b<this.rouletteelements.length;b+=1){
          this.roulette.push(gridnodes[this.rouletteelements[b]].pheromone/this.neighburspheromone);
        }

      }else{
        this.neigburscount=gridnodes[this.currentposition].possibleWays.length;
        for(var a=0;a<gridnodes[this.currentposition].possibleWays.length;a+=1){
          //watch out for reference
          this.neighburspheromone+=gridnodes[this.currentposition].possibleWays[a].pheromone;
          this.rouletteelements.push(gridnodes[this.currentposition].possibleWays[a].id);

        }
        for(var b=0;b<this.rouletteelements.length;b+=1){
          this.roulette.push(gridnodes[this.rouletteelements[b]].pheromone/this.neighburspheromone);
        }
      }

      this.roulettecumulated[0]=this.roulette[0];
      for(var c=1;c<this.roulette.length-1;c+=1){
        this.roulettecumulated[c]=this.roulette[c-1]+this.roulette[c];
      }
      this.roulettecumulated.push(1);
      this.rouletteselector=Math.random();
      for(var c=0;c<this.roulette.length;c+=1){
        if(this.rouletteselector<this.roulettecumulated[c]){
          this.roadmap.push(this.rouletteelements[c]);

          break;
        }
      }
  }
  this.applyPheromone=function(){
    //(1-evap)*gridnodes[this.currentposition].pheromone+this.pheromoneAmount;
      gridnodes[this.currentposition].pheromone=gridnodes[this.currentposition].pheromone+this.pheromoneAmount;
  }

  this.moveAnt=function(){
    if(this.foundfoood==true){
      //console.log(this.bttf);
      this.currentposition=this.roadmap[this.roadmap.length-this.bttf];
      //console.log(this.pheromoneAmount);
      this.applyPheromone();
      this.pheromoneAmount=this.pheromoneAmount*evap;
      this.bttf+=1;
    }else{
      this.determineNextMove();
      this.currentposition=this.roadmap[this.roadmap.length-1];
      this.applyPheromone();
      this.pheromoneAmount=this.pheromoneAmount*evap;
    }

    if(this.currentposition==finishnodeid){
      this.foundfoood=true;
      this.pheromoneAmount=maxp/this.roadmap.length;
      this.applyPheromone();
      //console.log(this.pheromoneAmount);
    }else if (this.currentposition==startnodeid) {
      this.foundfoood=false;
      this.roadmap=[0];
      this.bttf=2;
      this.applyPheromone();
      this.pheromoneAmount=0;
    }
  }

  this.drawAnt=function(){
    this.antpos=[gridnodes[this.currentposition].xmiddle,gridnodes[this.currentposition].ymiddle];
    if(this.foundfoood==true){
      fill(color(200, 0, 0));
      //ellipse(this.antpos[0],this.antpos[1],cell/5);
    }else{
      fill(color(0, 0, 200));
      ellipse(this.antpos[0],this.antpos[1],cell/5);
    }

    //image(img, this.antpos[0]-cell/2,this.antpos[1]-cell/2);

  }
}

function Grid() {
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
    //ADDING CONNECTIONS TO NODES IN GRAPH
    for(var i=0;i<Math.floor(cwidth/cell);i+=1){
      for(var j=0;j<Math.floor(cheight/cell);j+=1){
        if(i==0 && j==0){
          dd[i][j].possibleWays.push(dd[i+1][j+1]);
          dd[i][j].possibleWays.push(dd[i][j+1]);
          dd[i][j].possibleWays.push(dd[i+1][j]);
        }else if(i==0 && j==gridsize[1]-1){
          dd[i][j].possibleWays.push(dd[i][j-1]);
          dd[i][j].possibleWays.push(dd[i+1][j]);
          //dd[i][j].possibleWays.push(dd[i+1][j-1]);
        }else if(i==gridsize[0]-1 && j==0){
          dd[i][j].possibleWays.push(dd[i-1][j]);
          //dd[i][j].possibleWays.push(dd[i-1][j+1]);
          dd[i][j].possibleWays.push(dd[i][j+1]);
        }else if(i==gridsize[0]-1 && j==gridsize[1]-1){
          //dd[i][j].possibleWays.push(dd[i-1][j-1]);
          dd[i][j].possibleWays.push(dd[i][j-1]);
          dd[i][j].possibleWays.push(dd[i-1][j]);
        }else if(i==0){
          dd[i][j].possibleWays.push(dd[i][j-1]);
          dd[i][j].possibleWays.push(dd[i][j+1]);
          //dd[i][j].possibleWays.push(dd[i+1][j-1]);
          dd[i][j].possibleWays.push(dd[i+1][j]);
          //dd[i][j].possibleWays.push(dd[i+1][j+1]);
        }else if(i==gridsize[0]-1){
          //dd[i][j].possibleWays.push(dd[i-1][j-1]);
          dd[i][j].possibleWays.push(dd[i-1][j]);
          //dd[i][j].possibleWays.push(dd[i-1][j+1]);
          dd[i][j].possibleWays.push(dd[i][j-1]);
          dd[i][j].possibleWays.push(dd[i][j+1]);
        }else if(j==gridsize[1]-1){
          //dd[i][j].possibleWays.push(dd[i-1][j-1]);
          dd[i][j].possibleWays.push(dd[i-1][j]);
          dd[i][j].possibleWays.push(dd[i][j-1]);
          //dd[i][j].possibleWays.push(dd[i+1][j-1]);
          dd[i][j].possibleWays.push(dd[i+1][j]);
        }else if(j==0){
          dd[i][j].possibleWays.push(dd[i-1][j]);
          //dd[i][j].possibleWays.push(dd[i-1][j+1]);
          dd[i][j].possibleWays.push(dd[i][j+1]);
          dd[i][j].possibleWays.push(dd[i+1][j]);
          //dd[i][j].possibleWays.push(dd[i+1][j+1]);
        }else{
          if(Math.random()<crossNodeConnectionProbability){
            dd[i][j].possibleWays.push(dd[i-1][j-1]);
            dd[i][j].possibleWays.push(dd[i+1][j+1]);
            dd[i][j].possibleWays.push(dd[i-1][j+1]);
            dd[i][j].possibleWays.push(dd[i+1][j-1]);
          }
          dd[i][j].possibleWays.push(dd[i][j-1]);
          dd[i][j].possibleWays.push(dd[i][j+1]);
          dd[i][j].possibleWays.push(dd[i+1][j]);
          dd[i][j].possibleWays.push(dd[i-1][j]);
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

function Node(y,x,id){
  this.id=id, this.x=x, this.y=y,this.xmiddle=this.x+cell/2,this.ymiddle=this.y+cell/2;
  this.pheromone=1;
  this.possibleWays=[];
  this.status=1;

  this.drawNode=function(){
    if(this.status==0){
        fill(color(0, 100, 0));
        ellipse(this.x+cell/2,this.y+cell/2,cell/2);
    }else if(this.status==2){
        fill(color(0, 0, 0));
        ellipse(this.x+cell/2,this.y+cell/2,cell/2);
    }else{
        //fill(color(0, 0, 0));
        //ellipse(this.x+cell/2,this.y+cell/2,cell/4);
    }
    for(var linecnt=0;linecnt<this.possibleWays.length;linecnt+=1){
      line(this.x+cell/2,this.y+cell/2,this.possibleWays[linecnt].x+cell/2,this.possibleWays[linecnt].y+cell/2);
    }
  }
}
