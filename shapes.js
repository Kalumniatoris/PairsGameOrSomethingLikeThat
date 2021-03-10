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
    
    return this.compareTo2(target,1);
  }

  compareTo2(target, s) {
    try {
      if (this.disabled || target.disabled) { return false; }
      var t=0;
      if(game.colors.length>1 && (this.fill == target.fill)){t+=1;}
      if(game.shapesCount>1 && (this.shape == target.shape)){t+=1;}
      if(game.bcolors.length>1 && (this.border == target.border)){t+=1;}
      //t = (this.shape == target.shape) + (this.fill == target.fill) + (this.border == target.border);

      return t >= s;
    }
    catch (e) {
      return false;
    }
  }


  Sdraw(x, y, s,cins) {
    cins.fill(game.colors[this.fill]);
     cins.stroke(game.bcolors[this.border]);

    if (this.disabled) {
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
      default:

        break;
    }
  }

}
