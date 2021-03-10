var game = {
  colorsCount: 12,
  shapesCount: 4,
  size: 3,
  colors: [],
  bcolors: [],
  lSymbols: [],
  currentSymbol:-1

};

const can = 600;
var siz;

var canvas;
var canC;
var ccs = 100;

const bc = (p) =>{

p.setup = function() {
  p.createCanvas(can, can);
 // canvas.parent("gameBoard");
  p.background([123,55,0]);
  generateBoard(game.shapesCount, game.colorsCount, game.size);
};
p.draw=function() {

  p.drawSymbols();
  helper(p,false);


};

p.mouseClicked = function(){
  
  if(p.mouseX>p.width||p.mouseX<0||p.mouseY>p.height||p.mouseY<0){return;}
  
  console.log("clicked");
  
  
   let vcount = size * size;
  var svc = Math.sqrt(vcount);
  let qx = Math.floor((p.mouseX) / (siz * 2));
  let qy = Math.floor((p.mouseY) / (siz * 2));

  qx =  p.min(qx, svc);
  qx =  p.max(0, qx);

  qy = p.min(qy, svc - 1);
  qy =  p.max(0, qy);
  
   var t = qy * svc + qx;
    t =  p.min(vcount - 1, t);
    t =  p.max(0, t);
  
   console.log("t: "+t);
   if(!game.lSymbols[t].disabled){
      if(game.currentSymbol==-1){
        console.log("selecting: ");
    game.currentSymbol=t;
    }
    else if(game.currentSymbol==t){
      console.log("deselecting");
     game.currentSymbol=-1; 
    }
    else{
    if(game.lSymbols[t].compareTo(game.lSymbols[game.currentSymbol])){
      game.lSymbols[t].disabled=true;
      game.lSymbols[game.currentSymbol].disabled=true;
      console.log("pair");
      game.currentSymbol=-1;
    }
    }}
    
};



p.drawSymbols=function() {
  var svc = size;
   p.background(0);
  game.lSymbols.forEach(
    (x, n) => {
      x.Sdraw((n % svc) * siz * 2 + siz, Math.floor(n / svc) * siz * 2 + siz, siz,this);
    }

  );
};





};

let boardCan=new p5(bc,'gameBoard');

//////
function generateBoard(shapes, colors, sizesq) {
  game.currentSymbol=-1;
  game.shapesCount=shapes;
  game.colorsCount=colors;game.size=sizesq;
  size = sizesq;
  console.log("Generating board " + [shapes, colors, size]);
  let vcount = size * size;
  siz = (can / Math.floor(Math.sqrt(vcount))) / 2;
  generateColors(colors);
  generateSymbols(vcount, shapes);

}
/////that boardCan should be fixed, maybe I should move it into bc or something
function generateColors(count) {
  let colors = [];
  let bcolors = [];
  for (n = 0; n < count; n += 1) {
    colors.push([Math.floor(boardCan.random(255)), Math.floor(boardCan.random(255)), Math.floor(boardCan.random(255))]);
    bcolors.push([Math.floor(boardCan.random(255)), Math.floor(boardCan.random(255)), Math.floor(boardCan.random(255))]);
  }

  game.colors = colors;
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
  let vcount = size * size;
  var svc = Math.sqrt(vcount);
  let qx = Math.floor((cv.mouseX) / (siz * 2));
  let qy = Math.floor((cv.mouseY) / (siz * 2));

  qx =  cv.min(qx, svc);
  qx =  cv.max(0, qx);

  qy =  cv.min(qy, svc - 1);
  qy =  cv.max(0, qy);
  cv.text(qx, cv.mouseX, cv.mouseY);
  cv.text(qy, cv.mouseX + 15, cv.mouseY);
  cv.text(qy * svc + qx, cv.mouseX + 15, cv.mouseY + 10);
  cv.noFill();
  cv.stroke(255, 255, 255);
  cv.square(qx * siz * 2, qy * siz * 2, siz * 2);

      var t = qy * svc + qx;
    t =  cv.min(vcount - 1, t);
    t =  cv.max(0, t);
    
  



  if (hints) {

    game.lSymbols.forEach((x, n) => { if (x.compareTo(game.lSymbols[t])) {  cv.noStroke();  cv.fill(0, 150, 0);  cv.square(n % svc * siz * 2, Math.floor(n / svc) * siz * 2, 5); } });
    game.lSymbols.forEach((x, n) => { if (x.compareTo2(game.lSymbols[t], 2)) {  cv.noStroke();  cv.fill(150, 150, 0);  cv.square(n % svc * siz * 2 + 10, Math.floor(n / svc) * siz * 2, 5); } });
    game.lSymbols.forEach((x, n) => { if (x.compareTo2(game.lSymbols[t], 3)) {  cv.noStroke();  cv.fill(0, 150, 150);  cv.square(n % svc * siz * 2 + 20, Math.floor(n / svc) * siz * 2, 5); } });
  }
}
