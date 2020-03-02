function Ant(){
  this.antstatus=true;
  this.foundfoood=false;
  this.currentposition=startnodeid;
  this.pheromoneAmount=0;
  this.roadmap=[startnodeid];
  this.edgesTraveled=[];

  this.calculateRoad=function(){
    this.roadmap=[];
    this.roadmap.push(startnodeid);
    this.lastparent=0;
  }
  this.checkavnodes=function(nodenumid){
    for(var nc1=0;nc1<this.roadmap.length;nc1+=1){
      if(nodenumid==this.roadmap[nc1]){
        return true;
      }
    }
    return false;
  }

    this.applied=function(currneteid){
      for(let ll2=currneteid+1;ll2<this.edgesTraveled.length;ll2+=1){
        if(this.edgesTraveled[ll2]==currneteid){
          return true;
        }
      }
      return false;
    }

  this.doesContain=function(edgeid){
    for(let ll=0;ll<this.roadmap.length;ll+=1){
      if(this.edgesTraveled[ll]==edgeid){
        return true;
        //console.log("Zwracam true");
      }
    }
    return false;
  }

  this.determineNextMove=function(){

      this.roulette=[],this.roulettecumulated=[],this.rouletteelements=[];
      this.neighburspheromone=0;
      this.neigburscount=0;
      if(this.currentposition!=startnodeid){
        this.neigburscount=gridnodes[this.currentposition].possibleWays.length;
        //;
        for(var a=0;a<this.neigburscount;a+=1){
          if(gridnodes[this.currentposition].possibleWays[a].id!=this.edgesTraveled[this.edgesTraveled.length-1]){
          //  if(!this.doesContain(gridnodes[this.currentposition].possibleWays[a].id)){
              if(gridnodes[this.currentposition].possibleWays[a].checknodestatus()==true && this.checkavnodes(gridnodes[this.currentposition].possiblenodes[a])==false){
                this.neighburspheromone+=Math.pow(gridnodes[this.currentposition].possibleWays[a].pheromone,alpha)*Math.pow(dist,beta);
                this.rouletteelements.push(gridnodes[this.currentposition].possibleWays[a].id);
              }

            //}
          }
        }

        for(var b=0;b<this.rouletteelements.length;b+=1){
          this.roulette.push(Math.pow(edges[this.rouletteelements[b]].pheromone,alpha)*Math.pow(dist,beta)/this.neighburspheromone);
        }
      }else{
        this.neigburscount=gridnodes[this.currentposition].possibleWays.length;
        for(var a=0;a<this.neigburscount;a+=1){
          //watch out for reference
        if(gridnodes[this.currentposition].possibleWays[a].checknodestatus()==true && this.checkavnodes(gridnodes[this.currentposition].possiblenodes[a])==false){
          this.neighburspheromone+=gridnodes[this.currentposition].possibleWays[a].pheromone;
          this.rouletteelements.push(gridnodes[this.currentposition].possibleWays[a].id);
        }

        }

        for(var b=0;b<this.rouletteelements.length;b+=1){
          this.roulette.push(edges[this.rouletteelements[b]].pheromone/this.neighburspheromone);
        }
      }

      this.roulettec=0;

      for(var c=0;c<this.roulette.length-1;c+=1){
        this.roulettecumulated[c]=this.roulettec += this.roulette[c];
        //console.log(this.roulettecumulated[c]);
        this.roulettec=this.roulettecumulated[c];

      }
      this.roulettecumulated.push(1);

      this.rouletteselector=Math.random();
      for(var c=0;c<this.roulette.length;c+=1){
        if(this.rouletteselector<this.roulettecumulated[c]){
          this.edgesTraveled.push(edges[this.rouletteelements[c]].id);
          if(edges[this.rouletteelements[c]].node1id==this.currentposition){
            this.roadmap.push(edges[this.rouletteelements[c]].node2id);

          }else{
            this.roadmap.push(edges[this.rouletteelements[c]].node1id);

          }

           // console.log(this.neigburscount);
           // console.log(this.rouletteelements.length);
          //console.log("jestem na elemencie "+this.currentposition+" mam "+this.neigburscount+" sasiadow, wybieram "+this.rouletteelements[c]+" z prawdopodobienstwem "+ this.roulette[c]);
          break;
        }
      }
      if(this.rouletteelements.length==0){
        this.antstatus=false;
      }
  }
  this.applyPheromone=function(zm){
    //(1-evap)*gridnodes[this.currentposition].pheromone+this.pheromoneAmount;
    edges[this.edgesTraveled[this.edgesTraveled.length-1]].pheromone=edges[this.edgesTraveled[this.edgesTraveled.length-1]].pheromone+this.pheromoneAmount;
    //this.pheromoneAmount=this.pheromoneAmount*(1-evap)+1;
  }
  this.applyPheromoneAll=function(){
    for(let egt=this.edgesTraveled.length-1;egt>=0;egt-=1){
      if(!this.applied(egt)){
          edges[this.edgesTraveled[egt]].pheromone+=this.pheromoneAmount;
      }
    }
    for(var i=0; i<edges.length;i+=1){
      edges[i].pheromone=(1-evap)*edges[i].pheromone;
      if(edges[i].pheromone<1){
        edges[i].pheromone=1;
      }
    }
    this.restartAnt();

  }
  this.roundnum=function(x) {
  return Number.parseFloat(x).toFixed(2);
  }
  this.restartAnt=function(){
    this.roadmap=[];
    this.roadmap.push(startnodeid);
    this.lastparent=0;
    this.edgesTraveled=[];
    this.currentposition=this.roadmap[this.roadmap.length-1];
  }

  this.moveAnt=function(){
    if(this.foundfoood==true){
      //console.log(this.bttf);
      this.applyPheromoneAll();
      // this.determineNextMove();
      // this.currentposition=this.roadmap[this.roadmap.length-1];
      // this.applyPheromone();
      //console.log(this.pheromoneAmount);
    }else{
      this.determineNextMove();
      
      this.currentposition=this.roadmap[this.roadmap.length-1];
    }

    if(this.currentposition==finishnodeid){
      this.foundfoood=true;
      this.pheromoneAmount=maxp/this.roadmap.length

      //console.log(this.pheromoneAmount);
      //console.log(maxp +" L "+this.roadmap.length+" wynosi "+this.pheromoneAmount);

      this.currentposition=this.roadmap[this.roadmap.length-1];
      //this.applyPheromone();

      // this.edgesTraveled=[this.edgesTraveled[this.edgesTraveled.length-1]];
    }else if (this.currentposition==startnodeid) {
      this.foundfoood=false;
      this.roadmap=[startnodeid];
      //this.applyPheromone();
      this.pheromoneAmount=0;
    }
  }

  this.drawAnt=function(){
    this.antpos=[gridnodes[this.currentposition].xmiddle,gridnodes[this.currentposition].ymiddle];
    if(this.foundfoood==true){
      fill(color(200, 0, 0));
      ellipse(this.antpos[0],this.antpos[1],cell/5);
    }else{
      fill(color(0, 0, 200));
      ellipse(this.antpos[0],this.antpos[1],cell/5);
    }
    //image(img, this.antpos[0]-cell/2,this.antpos[1]-cell/2);
  }
}
