

const sh = (p) => {
    let shape;
    let sc=0;
    p.setup = function () {
      p.createCanvas(200, 600);
      p.background([210, 121, 60]);
      shape=new Shape();
    };
  
    p.draw = function () {
        let d=50;
        p.background(0);
        gameHistory.forEach((x,i)=>{

            let t0=x[0];
            let t1=x[1];
            shape.Sdraw(d,i*2*d+d+sc,d,p,t0[2],t0[1],t0[0]);
            shape.Sdraw(3*d,i*2*d+d+sc,d,p,t1[2],t1[1],t1[0]);
        })
    
    };

    p.mouseWheel= function(e){
        console.log(e);
        if(p.mouseX<p.width&&p.mouseX>0&&p.mouseY<p.height&&p.mouseY>0)
        sc+=e.delta
    
    }
  
  };
  
  let historyCan = new p5(sh, 'history');
  