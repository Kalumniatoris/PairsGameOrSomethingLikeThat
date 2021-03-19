function generateSymbols2(count, shapes = 4) {
    
    let lSymbols = [];

    let isOdd=count%2==1?1:0;

    if((game.colors.length==1||game.bcolors.length==1||game.shapesCount==1)
        &&
        (
        game.targetMin!=3
        ||
        game.targetMax!=3
        )){
        alert("Please do not set shapes or any of colors to 1 when gamemode isn't set to 3-3 in current version, I mean you can set it but it will not work correctly anyway")
        mode=3;

    }
  //  for (n = 0; n < count-isOdd; n += 1) {
    while(lSymbols.length+isOdd<count){

       
     let forMode= getRandomInt(game.targetMin,game.targetMax+1);
    
        let pairSymbols=generateSymbolsPair(forMode);
        lSymbols.push(pairSymbols[0]);
        lSymbols.push(pairSymbols[1]);
        //lSymbols.push(new Shape(Math.floor(boardCan.random(shapes)), Math.floor(boardCan.random(game.colors.length)), Math.floor(boardCan.random(game.bcolors.length))));
    
    
    
    }

        //todo FIX, remove boardCan
    if(isOdd){    lSymbols.push(new Shape(Math.floor(boardCan.random()*shapes), Math.floor(boardCan.random()*game.colors.length), Math.floor(boardCan.random()*game.bcolors.length)));}
    game.lSymbols = lSymbols;

   shuffleA();

  }

  function generateSymbolsPair(mode){

    if(game.colors.length==1||game.bcolors.length==1||game.shapesCount==1){
        mode=3;

    }
    //  console.log("generating pair for: "+mode);
      let shap, col,bcol;
      let shap2, col2,bcol2;
      var pair=[];

      var which;
    switch (mode){ //ToDo Make it better, faster, lessbruteforcerly
        case 0:  //all different
    //        console.log(0);
        shap=rindShape();
        col=rindColor();
        bcol=rindBcolor();

        do{
            shap2=rindShape();
        }while(shap2==shap);

        do{
            col2=rindColor();
        }while(col2==col);
        do{
            bcol2=rindBcolor();
        }while(bcol2==bcol);
        
        
        pair.push( new Shape(shap,col,bcol));
        pair.push( new Shape(shap2,col2,bcol2));

        break;
        case 1: //exactly one same
      //  console.log(1);
        shap=rindShape();
        col=rindColor();
        bcol=rindBcolor();

        do{
            shap2=rindShape();
        }while(shap2==shap);

        do{
            col2=rindColor();
        }while(col2==col);
        do{
            bcol2=rindBcolor();
        }while(bcol2==bcol);
        pair.push( new Shape(shap,col,bcol));

        which=Math.floor(Math.random()*3);
            switch(which){
                case 0:
                    pair.push( new Shape(shap,col2,bcol2));
                break;
                case 1:
                    pair.push( new Shape(shap2,col,bcol2));
                break;
                case 2:
                    pair.push( new Shape(shap2,col2,bcol));
                break;
                default:
                alert("Something went wrong, you shouldn't be able to see this alert");
                break;

            }




        break;
        case 2: //two similiarities 
      //  console.log(2);
        shap=rindShape();
        col=rindColor();
        bcol=rindBcolor();

        do{
            shap2=rindShape();
        }while(shap2==shap);

        do{
            col2=rindColor();
        }while(col2==col);
        do{
            bcol2=rindBcolor();
        }while(bcol2==bcol);
        pair.push( new Shape(shap,col,bcol));

        which=Math.floor(Math.random()*3);
            switch(which){
                case 0:
                    pair.push( new Shape(shap,col,bcol2));
                break;
                case 1:
                    pair.push( new Shape(shap2,col,bcol));
                break;
                case 2:
                    pair.push( new Shape(shap,col2,bcol));
                break;
                default:
                alert("Something went wrong, you shouldn't be able to see this alert");
                break;

            }
        break;

        case 3:
        //    console.log(3);
        shap=rindShape();
        col=rindColor();
        bcol=rindBcolor();
        pair.push( new Shape(shap,col,bcol));
        pair.push( new Shape(shap,col,bcol));
        break;

    }
  //  console.log("generated");
  //  console.log(pair); 
    return pair;
  }

  function rindColor(){
   return Math.floor(Math.random()*game.colors.length)

  }
  
  function rindShape(){
    return Math.floor(Math.random()*game.shapesCount);
 
   }

     
  function rindBcolor(){
    return Math.floor(Math.random()*game.bcolors.length);
 
   }