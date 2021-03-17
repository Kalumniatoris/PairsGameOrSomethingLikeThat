//aka buttons and stuffs that are not part of canvas

function generate() {
    //console.log("generating");  
    var cshapes = document.getElementById("numshapes").value;
    var csize = document.getElementById("numsize").value;
    var ccolors = document.getElementById("numcolors").value;
    var bcolors = document.getElementById("numBcolors").value;
    isWon=false;
    generateBoard(cshapes, ccolors,bcolors, csize);

}

function shuffleA(){
  shuffle(game.lSymbols);
}

function toggleAnnoyingMode(){
  game.annoyingMode=!game.annoyingMode;

}



var rangeMin;
var rangeMax;

function onl(){
console.log("onload");
/*rangeMin=document.getElementById("targetMin");
rangeMax=document.getElementById("targetMax");

rangeMin.oninput=function(){
game.targetMin=this.value;
};

rangeMax.oninput=function(){
game.targetMax=this.value;
};
*/
var gml=document.getElementById("gml");

var targetSlider = document.getElementById('targetSlider');

noUiSlider.create(targetSlider, {
    start: [1, 3],
    connect: true,
    step:1,
    range: {
        'min': 0,
        'max': 3
    },
    pips:{
    mode: 'steps'
    },
    tooltips:[wNumb({decimals: 0}),wNumb({decimals: 0})]
});


targetSlider.noUiSlider.on('set', function(value){
game.targetMin=parseInt(value[0]);
game.targetMax=parseInt(value[1]);
gml.innerHTML="Game mode: "+game.targetMin+" - " + game.targetMax;

}
);

}
