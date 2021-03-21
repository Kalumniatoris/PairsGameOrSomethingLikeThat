class Shape {
  //shape 1-n: circle,square,triangle?
  //fill/border - colors
  constructor(shape, fill, border) {
    this.shape = shape;
    this.fill = fill;
    this.border = border;
    this.disabled = false;
  }

  compareTo(target) {
    /*try {
      var thd = this.disabled;
      var tad = target.disabled;


      if (thd || tad) { return false; }
      return (this.shape == target.shape || this.fill == target.fill || this.border == target.border);
    }
    catch (e) {
      console.log(this);
      console.log(target);
      return false;
    }*/
    
    return this.compareTo2(target,1,3);
  }

  compareTo2(target, s,mx) {
    let tofix=0; //1 to ignore 1
    try {
      if (this.disabled || target.disabled) { return false; }
      var t=0;
      if(game.colors.length>tofix && (this.fill == target.fill)){t+=1;}
      if(game.shapesCount>tofix && (this.shape == target.shape)){t+=1;}
      if(game.bcolors.length>tofix && (this.border == target.border)){t+=1;}
      //t = (this.shape == target.shape) + (this.fill == target.fill) + (this.border == target.border);
      
      console.log("targets: "+t+" "+s+" "+mx);
      console.log((t >= s) && (t<=mx));
      return (t >= s) && (t<=mx);
    }
    catch (e) {
      return false;
    }
  }


  Sdraw(x, y, s,cins,forceShow=false) {
    if(isWon){game.bcolors[this.border][3]=12
      game.colors[this.fill][3]=50
    }
    cins.fill(game.colors[this.fill]);
     cins.stroke(game.bcolors[this.border]);
     
   

    if(game.colors.length==1){
  
    cins.fill(game.bcolors[this.border]);
  
}
    if(game.bcolors.length==1){
    
    let tmpcol=game.colors[this.fill];
    tmpcol=[(128+tmpcol[0])/2,(128+tmpcol[1])/2,(128+tmpcol[2])/2];
    cins.stroke(tmpcol);
    
    //cins.stroke(game.colors[this.fill]);
  }
    
    if (this.disabled && !forceShow) {
   cins.fill([10,10,10]);
      cins.stroke([10,10,10]);
    }
     cins.strokeWeight(s / 4);
  

    //x,y = center
    //s = size
    //s/2 from center
    switch (this.shape) {
      case 0://"circle":
         cins.circle(x, y, s);
        break;
      case 1://"square":

         cins.square(x - s / 2, y - s / 2, s);
        break;
      case 2://triangle:
         cins.triangle(x - s / 2, y + s / 2, x, y - s / 2, x + s / 2, y + s / 2);
        break;
      case 3://rtriangleBL
         cins.triangle(x - s / 2, y + s / 2, x - s / 2, y - s / 2, x + s / 2, y + s / 2);
        break;
      case 4:
         cins.quad(x - s / 2, y, x, y - s / 2, x + s / 2, y, x, y + s / 2);
        break;
      case 5:
          cins.beginShape();        
          cins.vertex(x - s / 2, y - s / 2);
          cins.vertex(x - s / 2,y+s/2);
          cins.vertex(x+s/2, y+s/2);
          cins.vertex(x+s/2, y);
          cins.vertex(x,y);
          cins.vertex(x,y-s/2);         // cins.vertex(x+s/2,y-s/2);
               
        cins.endShape(cins.CLOSE);
        break;
        
      case 6:
             cins.beginShape();        
          cins.curveVertex(x - s / 2, y - s / 2);
          cins.curveVertex(x + s / 2,y);
          cins.curveVertex(x-s/2, y+s/2);    
        cins.endShape(cins.CLOSE);
        break;
      
      
      default:
          cins.textStyle(cins.BOLD);
          cins.textSize(30);
          cins.text(this.shape,x,y);




        break;
    }
  }

}
