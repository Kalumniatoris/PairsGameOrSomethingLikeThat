/** copied from https://stackoverflow.com/questions/6s274339/how-can-i-shuffle-an-array
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}


function compareShapes(a,b){
  if(!a.disabled && !b.disabled){return a.shape-b.shape;}
  else{
  return a.disabled - b.disabled;
  }
  
}

function updateColors(){
game.colors.forEach((x,n)=>{game.colors[n]=[Math.floor(boardCan.random(255)), Math.floor(boardCan.random(255)), Math.floor(boardCan.random(255))];});

game.bcolors.forEach((x,n)=>{game.bcolors[n]=[Math.floor(boardCan.random(255)), Math.floor(boardCan.random(255)), Math.floor(boardCan.random(255))];});
}

function countDisabled(){return game.lSymbols.reduce(function(pr,cr,ins,ar){return pr+ar[ins].disabled;},0);}

function countLeft(){return game.lSymbols.reduce(function(pr,cr,ins,ar){return pr+!ar[ins].disabled;},0);}

function reduceBoard(toSize){
  let size2=toSize*toSize;
   game.lSymbols.sort(compareShapes);
   game.lSymbols=game.lSymbols.slice(0,size2);
   game.size=toSize;
   updateTileSize(size2);
   shuffleA();
}
