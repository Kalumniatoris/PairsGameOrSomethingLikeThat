var game = {
  shapesCount: 5,
  size: 5,
  colors: [],
  bcolors: [],
  lSymbols: [],
  currentSymbol:-1,
  annoyingMode:false,
  tileSize:100,
  targetMin:1,
  targetMax:3,
};
var isWon=false;
var startingShapes;
var startingSize;
var startingTileSize;
var gameHistory=[]; //do not use,


const can = 600;
var canvas;
var ccs = 100;

const bc = (p) =>{

p.setup = function() {
  p.createCanvas(can, can);
 // canvas.parent("gameBoard");
  p.background([123,55,0]);
  generateBoard(game.shapesCount, 6,6, game.size);
};
p.draw=function() {
 

  if(isWon){p.victory(); }
  else{
  p.drawSymbols();
  helper(p,false);
  }
 

};

p.mouseClicked = function(){
  //clicked outside of board or after victory
  if(p.mouseX>p.width||p.mouseX<0||p.mouseY>p.height||p.mouseY<0||isWon){return;}
  
  //console.log("clicked");
  
  
  //let vcount = game.size * game.size;
  //var svc = Math.sqrt(vcount);
  let qx = Math.floor((p.mouseX) / (game.tileSize * 2));
  let qy = Math.floor((p.mouseY) / (game.tileSize * 2));

  qx =  p.min(qx,  game.size);
  qx =  p.max(0, qx);

  qy = p.min(qy,  game.size - 1);
  qy =  p.max(0, qy);
  
   var t = qy *  game.size + qx;
    t =  p.min( game.size*game.size - 1, t);
    t =  p.max(0, t);
  
  // console.log("t: "+t);
   if(!game.lSymbols[t].disabled){
      if(game.currentSymbol==-1){
    //    console.log("selecting: ");
    game.currentSymbol=t;
    }
    else if(game.currentSymbol==t){
    //  console.log("deselecting");
     game.currentSymbol=-1; 
    }
    else{
    if(game.lSymbols[t].compareTo2(game.lSymbols[game.currentSymbol],game.targetMin,game.targetMax)){
        let t1=game.lSymbols[t];
        let t2=game.lSymbols[t];
      gameHistory.push([[t1.shape,t1.fill,t1.border],[t2.shape,t2.fill,t2.border]]); 

      game.lSymbols[t].disabled=true;
      game.lSymbols[game.currentSymbol].disabled=true;
  //    console.log("pair");
      game.currentSymbol=-1;
      
      if(Math.ceil(Math.sqrt(countLeft()))<game.size){reduceBoard(game.size-1);}
      
      
      if(game.annoyingMode){
      shuffleA();
      updateColors();
      }
      
      if(countLeft()<=1){
      isWon=true;
      }
      
    }
    }}
    
};



p.drawSymbols=function() {

   p.background(0);
  game.lSymbols.forEach(
    (x, n) => {
      var posX=(n % game.size) * game.tileSize  * 2 + game.tileSize ;
      var posY= Math.floor(n / game.size) * game.tileSize  * 2 + game.tileSize ;
      x.Sdraw(posX,posY ,game.tileSize ,this);
      if(game.currentSymbol==n){
       boardCan.noFill();
       boardCan.rect(posX-game.tileSize,posY-game.tileSize,2*game.tileSize,2*game.tileSize);
      }
    }

  );
};


var a =0;
p.victory=function(){
  game.size=startingSize;
  game.tileSize=startingTileSize;

  p.translate(p.width/2,p.height/2);
  p.rotate(a);
  p.translate(-p.width/2,-p.height/2);
startingShapes.forEach((x,n)=>{x.disabled=false

    var posX=(n % game.size) * game.tileSize  * 2 + game.tileSize ;
    var posY= Math.floor(n / game.size) * game.tileSize  * 2 + game.tileSize ;
    x.Sdraw(posX,posY ,game.tileSize ,this);
    if(game.currentSymbol==n){
     boardCan.noFill();
     boardCan.rect(posX-game.tileSize,posY-game.tileSize,2*game.tileSize,2*game.tileSize);
    }
  }

);




a+=0.01;
};



};

let boardCan=new p5(bc,'gameBoard');

//////

function updateTileSize(tilesCount){
  game.tileSize  = (can / Math.floor(Math.sqrt(tilesCount))) / 2;
 
}

function generateBoard(shapes, colors,bcolors, sizesq) {
  game.currentSymbol=-1;
  game.shapesCount=shapes;
  //game.colorsCount=colors;
  game.size=sizesq;
  console.log("Generating board " + [shapes, colors, game.size]);
  let vcount = game.size * game.size;
  updateTileSize(vcount);
  //
  generateColors(colors);
   generateBcolors(bcolors);
 // generateSymbols(vcount, shapes);
  
  generateSymbols2(vcount, shapes);
  startingShapes=Object.assign(game.lSymbols);
  
startingSize=game.size;
startingTileSize=game.tileSize;

}
/////that boardCan should be fixed, maybe I should move it into bc or something
function generateColors(count) {
  let colors = [];
//  let bcolors = [];
  for (n = 0; n < count; n += 1) {
    colors.push([Math.floor(boardCan.random(255)), Math.floor(boardCan.random(255)), Math.floor(boardCan.random(255))]);
  //  bcolors.push([Math.floor(boardCan.random(255)), Math.floor(boardCan.random(255)), Math.floor(boardCan.random(255))]);
  }

  game.colors = colors;
//  game.bcolors = bcolors;
}

function generateBcolors(count) {
  let bcolors = [];
  for (n = 0; n < count; n += 1) {
   bcolors.push([Math.floor(boardCan.random(255)), Math.floor(boardCan.random(255)), Math.floor(boardCan.random(255))]);
  }

  game.bcolors = bcolors;
}


function generateSymbols(count, shapes = 4) {
  let lSymbols = [];
  for (n = 0; n < count; n += 1) {
    lSymbols.push(new Shape(Math.floor(boardCan.random(shapes)), Math.floor(boardCan.random(game.colors.length)), Math.floor(boardCan.random(game.bcolors.length))));
  }
  game.lSymbols = lSymbols;
}




function helper(cv,hints) {
  cv.strokeWeight(1);
  cv.noStroke();
  cv.fill(255);
  let vcount = game.size * game.size;
  var svc = Math.sqrt(vcount);
  let qx = Math.floor((cv.mouseX) / (game.tileSize * 2));
  let qy = Math.floor((cv.mouseY) / (game.tileSize * 2));

  qx =  cv.min(qx, svc);
  qx =  cv.max(0, qx);

  qy =  cv.min(qy, svc - 1);
  qy =  cv.max(0, qy);
  //cv.text(qx, cv.mouseX, cv.mouseY);
  //cv.text(qy, cv.mouseX + 15, cv.mouseY);
  //cv.text(qy * svc + qx, cv.mouseX + 15, cv.mouseY + 10);
  cv.noFill();
  cv.stroke(255, 255, 255);
  cv.square(qx * game.tileSize * 2, qy * game.tileSize * 2, game.tileSize * 2);

      var t = qy * svc + qx;
    t =  cv.min(vcount - 1, t);
    t =  cv.max(0, t);
    
  



  if (hints) {

    game.lSymbols.forEach((x, n) => { if (x.compareTo(game.lSymbols[t]))     {  cv.noStroke();  cv.fill(0, 150, 0);    cv.square(n % svc * game.tileSize * 2, Math.floor(n / svc) * game.tileSize * 2, 5);      } });
    game.lSymbols.forEach((x, n) => { if (x.compareTo2(game.lSymbols[t], 2)) {  cv.noStroke();  cv.fill(150, 150, 0);  cv.square(n % svc * game.tileSize * 2 + 10, Math.floor(n / svc) * game.tileSize * 2, 5); } });
    game.lSymbols.forEach((x, n) => { if (x.compareTo2(game.lSymbols[t], 3)) {  cv.noStroke();  cv.fill(0, 150, 150);  cv.square(n % svc * game.tileSize * 2 + 20, Math.floor(n / svc) * game.tileSize * 2, 5); } });
  }
}
