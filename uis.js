//aka buttons and stuffs that are not part of canvas

function generate() {
    //console.log("generating");  
    var cshapes = document.getElementById("numshapes").value;
    var csize = document.getElementById("numsize").value;
    var ccolors = document.getElementById("numcolors").value;
    var bcolors = document.getElementById("numBcolors").value;
    generateBoard(cshapes, ccolors,bcolors, csize);

}

function shuffleA(){
  shuffle(game.lSymbols);
}

function toggleAnnoyingMode(){
  game.annoyingMode=!game.annoyingMode;

}
