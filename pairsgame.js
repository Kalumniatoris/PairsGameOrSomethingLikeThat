
var game = {
  shapesCount: 5,
  size: 5,
  colors: [],
  bcolors: [],
  lSymbols: [],
  currentSymbol: -1,
  annoyingMode: false,
  tileSize: 100,
  targetMin: 1,
  targetMax: 2,
};
var isWon = false;
var startingShapes;
var startingSize;
var startingTileSize;
var gameHistory = [];

const can = 600;
var showHints = false;
var buffer;
var cs=true;
const bc = (p) => {
  p.setup = function () {
    p.createCanvas(can, can);
    buffer=p.createGraphics(can,can);
    //buffer.background(0);
   p.background([123, 55, 0]);
    generateBoard(game.shapesCount, 6, 6, game.size);
  };

  p.draw = function () {
    p.image(buffer,0,0);
   // buffer.background(0);
    if (isWon) {
      if(cs){
        game.colors.forEach((x)=>{x[3]=50});
        game.bcolors.forEach((x)=>{x[3]=20});
        cs=false;
      }
      p.victory();
    } else {
      buffer.background(0);
      p.drawSymbols();
      cursorFrame(p);
    }
  };

  p.mouseClicked = function () {
    //clicked outside of board or after victory
    if (
      p.mouseX > p.width ||
      p.mouseX < 0 ||
      p.mouseY > p.height ||
      p.mouseY < 0 ||
      isWon
    ) {
      return;
    }

    let qx = Math.floor(p.mouseX / (game.tileSize * 2));
    let qy = Math.floor(p.mouseY / (game.tileSize * 2));

    qx = p.min(qx, game.size);
    qx = p.max(0, qx);

    qy = p.min(qy, game.size - 1);
    qy = p.max(0, qy);

    var t = qy * game.size + qx;
    t = p.min(game.size * game.size - 1, t);
    t = p.max(0, t);

    if (!game.lSymbols[t].disabled) {
      if (game.currentSymbol == -1) {
        game.currentSymbol = t;
      } else if (game.currentSymbol == t) {
        game.currentSymbol = -1;
      } else {
        if (
          game.lSymbols[t].compareTo(
            game.lSymbols[game.currentSymbol],
            game.targetMin,
            game.targetMax
          )
        ) {
          let t1 = game.lSymbols[t];
          let t2 = game.lSymbols[game.currentSymbol];
          gameHistory.push([
            [t1.shape, t1.fill, t1.border],
            [t2.shape, t2.fill, t2.border],
          ]);

          game.lSymbols[t].disabled = true;
          game.lSymbols[game.currentSymbol].disabled = true;

          game.currentSymbol = -1;

          if (Math.ceil(Math.sqrt(countLeft())) < game.size) {
            reduceBoard(game.size - 1);
          }

          if (game.annoyingMode) {
            shuffleA();
            updateColors();
          }

          if (countLeft() <= 1) {
            isWon = true;
            cs=true;
          }
        }
      }
    }
  };

  p.drawSymbols = function () {
    game.lSymbols.forEach((x, n) => {
      var posX = (n % game.size) * game.tileSize * 2 + game.tileSize;
      var posY = Math.floor(n / game.size) * game.tileSize * 2 + game.tileSize;
      x.Sdraw(posX, posY, game.tileSize, this);
      if (game.currentSymbol == n) {
        boardCan.noFill();
        boardCan.rect(
          posX - game.tileSize,
          posY - game.tileSize,
          2 * game.tileSize,
          2 * game.tileSize
        );
      }
    });
  };

 //var a = 0.1;
  var a=p.PI/30;
  p.victory = function () {
    game.size = startingSize;
    game.tileSize = startingTileSize;

    buffer.translate(buffer.width / 2, buffer.height / 2);
    buffer.rotate(a);
    buffer.translate(-buffer.width / 2, -buffer.height / 2);
    startingShapes.forEach((x, n) => {
      x.disabled = false;

      var posX = (n % game.size) * game.tileSize * 2 + game.tileSize;
      var posY = Math.floor(n / game.size) * game.tileSize * 2 + game.tileSize;
      x.Sdraw(posX, posY, game.tileSize, buffer);
      if (game.currentSymbol == n) {
        buffer.noFill();
        buffer.rect(
          posX - game.tileSize,
          posY - game.tileSize,
          2 * game.tileSize,
          2 * game.tileSize
        );
      }
    });

   // a += da;
  };
};

let boardCan = new p5(bc, "gameBoard");

//////

function cursorFrame(cv) {
  if (
    cv.mouseX > cv.width ||
    cv.mouseX < 0 ||
    cv.mouseY > cv.height ||
    cv.mouseY < 0
  ) {
    return;
  }
  buffer.strokeWeight(1);
  buffer.noStroke();
  buffer.fill(255);
  let vcount = game.size * game.size;
  var svc = Math.sqrt(vcount);
  let qx = Math.floor(cv.mouseX / (game.tileSize * 2));
  let qy = Math.floor(cv.mouseY / (game.tileSize * 2));

  qx = cv.min(qx, svc);
  qx = cv.max(0, qx);

  qy = cv.min(qy, svc - 1);
  qy = cv.max(0, qy);
  buffer.noFill();
  buffer.stroke(255, 255, 255);
  buffer.square(qx * game.tileSize * 2, qy * game.tileSize * 2, game.tileSize * 2);
}
