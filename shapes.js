class Shape{
  //shape 1-n: circle,square,triangle?
  //fill/border - colors
 constructor(shape,fill,border){
 this.shape=shape;
 this.fill=fill;
 this.border=border;
 this.disabled=false;
 }
 
 compareTo(target){
   try{
   var thd=this.disabled;
   var tad=target.disabled;
  
 
 if(thd||tad){return false;}
 return(this.shape==target.shape||this.fill==target.fill||this.border==target.border);
   }
   catch(e){
     console.log(this);
     console.log(target);
   return false;
   }
 }
 
  compareTo2(target,s){
    try{
       if(this.disabled){return false;}
var t=(this.shape==target.shape)+(this.fill==target.fill)+(this.border==target.border);

return t>=s;
    }
    catch(e){
    return false;
    }
 }
 
 
Sdraw(x,y,s){
  fill(colors[this.fill]);
  stroke(bcolors[this.border]);
  
  if(this.disabled){
  fill([128,128,128]);
    stroke([128,128,128]);
  }
  strokeWeight(s/4);
  
  
  //x,y = center
  //s = size
  //s/2 from center
  switch(this.shape){
     case 0://"circle":
       circle(x,y,s);
     break;
     case 1://"square":
     
       square(x-s/2,y-s/2,s);
     break;
     case 2://triangle:
       triangle(x-s/2,y+s/2,x,y-s/2,x+s/2,y+s/2);
     break;
     case 3://rtriangleBL
      triangle(x-s/2,y+s/2,x-s/2,y-s/2,x+s/2,y+s/2);
      break;  
     case 4:
       quad(x-s/2,y ,x,y-s/2 ,x+s/2,y,x,y+s/2);
      break; 
      default:
     
     break;
  }
 }
 
}
