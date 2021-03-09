var colors;
var bcolors;

var lSymbols;
const can=600;
var shapes=4;
var colors=12;
var size=7;
var siz;

var canvas;

function setup() {
  shapes=4;
  
  
  
  console.log("setup");
  print("setup");
canvas=createCanvas(can,can);
canvas.parent("gameBoard");

generateBoard(shapes,colors,size);
}
var a;

function draw() {

     drawSymbols();
     helper(canvas);
    

}

function drawSymbols(){
  var svc=size;
  background(0);
  lSymbols.forEach(
        (x,n)=>
      {
        x.Sdraw((n%svc)*siz*2+siz,floor(n/svc)*siz*2+siz,siz);
      }
      
      );
}
function generateBoard(shapes,colors,sizesq){
  size=sizesq;
 console.log("Generating board "+[shapes,colors,size]);
  let vcount=size*size;
  siz=(can/floor(sqrt(vcount)))/2;
generateColors(colors);
generateSymbols(vcount,shapes);

}

function generateSymbols(count,shapes=4){
 lSymbols=[];
 for(n=0;n<count;n+=1){
 lSymbols.push( new Shape(floor(random(shapes)),floor(random(colors.length)),floor(random(bcolors.length))));
 } 
}


function generateColors(count){
colors=[];
bcolors=[];
for(n=0;n<count;n+=1){
colors.push([floor(random(255)),floor(random(255)),floor(random(255))]);
bcolors.push([random(255),random(255),random(255)]);
}
}

function helper(c){
     strokeWeight(1);
     noStroke();
     fill(255);
     let vcount=size*size;
        var svc=sqrt(vcount);
     let qx=floor((mouseX)/(siz*2));
     let qy=floor((mouseY)/(siz*2));
     
     qx=min(qx,svc);
     qx=max(0,qx);
     
       qy=min(qy,svc-1);
     qy=max(0,qy);
      text(qx,mouseX,mouseY);
      text(qy,mouseX+15,mouseY);
      text(qy*svc+qx,mouseX+15,mouseY+10);
      noFill();
      stroke(255,255,255);
      square(qx*siz*2,qy*siz*2,siz*2);
      var t=qy*svc+qx;
      t=min(vcount-1,t);
      t=max(0,t);
      
        lSymbols.forEach((x,n)=>{if(x.compareTo(lSymbols[t])){noStroke();fill(0,150,0);square(n%svc*siz*2,floor(n/svc)*siz*2,5);}});
      lSymbols.forEach((x,n)=>{if(x.compareTo2(lSymbols[t],2)){noStroke();fill(150,150,0);square(n%svc*siz*2+10,floor(n/svc)*siz*2,5);}});
      lSymbols.forEach((x,n)=>{if(x.compareTo2(lSymbols[t],3)){noStroke();fill(0,150,150);square(n%svc*siz*2+20,floor(n/svc)*siz*2,5);}});

}
