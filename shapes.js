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


      if(thd || tad) { return false; }
      return (this.shape == target.shape || this.fill == target.fill || this.border == target.border);
    }
    catch (e) {
      console.log(this);
      console.log(target);
      return false;
    }*/

    return this.compareTo2(target, 1, 3);
  }

  compareTo2(target, s, mx) {
    let tofix = 0; //1 to ignore 1
    try {
      if(this.disabled || target.disabled) {
        return false;
      }
      var t = 0;
      if(game.colors.length > tofix && this.fill == target.fill) {
        t += 1;
      }
      if(game.shapesCount > tofix && this.shape == target.shape) {
        t += 1;
      }
      if(game.bcolors.length > tofix && this.border == target.border) {
        t += 1;
      }
      //t = (this.shape == target.shape) + (this.fill == target.fill) + (this.border == target.border);

      console.log("targets: " + t + " " + s + " " + mx);
      console.log(t >= s && t <= mx);
      return t >= s && t <= mx;
    } catch (e) {
      return false;
    }
  }

  Sdraw(x, y, s, canvas,border=this.border,fill=this.fill,shape=this.shape) {
    if(isWon) {
      game.bcolors[border][3] = 12;
      game.colors[fill][3] = 50;
    }
    canvas.fill(game.colors[fill]);
    canvas.stroke(game.bcolors[border]);

    if(game.colors.length == 1) {
      canvas.fill(game.bcolors[border]);
    }
    if(game.bcolors.length == 1) {
      let tmpcol = game.colors[fill];
      tmpcol = [
        (128 + tmpcol[0]) / 2,
        (128 + tmpcol[1]) / 2,
        (128 + tmpcol[2]) / 2,
      ];
      canvas.stroke(tmpcol);

      //canvas.stroke(game.colors[this.fill]);
    }

    if(this.disabled) {
      canvas.fill([10, 10, 10]);
      canvas.stroke([10, 10, 10]);
    }
    canvas.strokeWeight(s / 4);

    //x,y = center
    //s = size
    //s/2 from center
    switch (shape) {
      case 0: //"circle":
        canvas.circle(x, y, s);
        break;
      case 1: //"square":
        canvas.square(x - s / 2, y - s / 2, s);
        break;
      case 2: //triangle:
        canvas.triangle(x - s / 2, y + s / 2, x, y - s / 2, x + s / 2, y + s / 2);
        break;
      case 3: //rtriangleBL
        canvas.triangle(
          x - s / 2,
          y + s / 2,
          x - s / 2,
          y - s / 2,
          x + s / 2,
          y + s / 2
        );
        break;
      case 4:
        canvas.quad(x - s / 2, y, x, y - s / 2, x + s / 2, y, x, y + s / 2);
        break;
      case 5:
        canvas.beginShape();
        canvas.vertex(x - s / 2, y - s / 2);
        canvas.vertex(x - s / 2, y + s / 2);
        canvas.vertex(x + s / 2, y + s / 2);
        canvas.vertex(x + s / 2, y);
        canvas.vertex(x, y);
        canvas.vertex(x, y - s / 2); // canvas.vertex(x+s/2,y-s/2);

        canvas.endShape(canvas.CLOSE);
        break;

      case 6:
        canvas.beginShape();
        canvas.curveVertex(x - s / 2, y - s / 2);
        canvas.curveVertex(x + s / 2, y);
        canvas.curveVertex(x - s / 2, y + s / 2);
        canvas.endShape(canvas.CLOSE);
        break;

      default:
        canvas.textStyle(canvas.BOLD);
        canvas.textSize(30);
        canvas.text(shape, x, y);

        break;
    }
  }
}
