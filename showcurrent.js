

const cc = (p) => {

  p.setup = function () {
    p.createCanvas(100, 100);
    p.background([210, 121, 60]);
  };

  p.draw = function () {
    p.background(0);
    if(game.currentSymbol >= 0) {
      game.lSymbols[game.currentSymbol].Sdraw(50, 50, 50, currentCan);
    }
    else {
      p.background(0);

    }
  };

};

let currentCan = new p5(cc, 'current');
