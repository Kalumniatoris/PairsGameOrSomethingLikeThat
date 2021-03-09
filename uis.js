//aka buttons and stuffs that are not part of canvas

function generate() {
    //console.log("generating");  
    var cshapes = document.getElementById("numshapes").value;
    var csize = document.getElementById("numsize").value;
    var ccolors = document.getElementById("numcolors").value;
    generateBoard(cshapes, ccolors, csize);

}
