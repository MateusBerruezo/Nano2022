var p = [];
var s = [];
var data = [];

var hyp;

var pal = ["#F0EBE3", "#E4DCCF", "#7D9D9C", "#576F72"];

function setup() {
  createCanvas(960, 540);

  frameRate(30);
  background(0);


  // Carrega os dados do IBGE:
  data = new Data(int(random(dados.length - 1)));
  data.a = 0.45*width; 
  data.b = 0.9*height;
  data.den = 2;

  dta = 0.45*width; 
  dtb = 0.9*height;
  dtd = 1;

  // Hipérbole:
  hyp = new DHyperbola(dta,dtb, 0.01, width, height, width/dtd, height/dtd, "distance", "if-compare");
  // hyp.display(false);
  // hyp.displayPoints(false);
  var pts = hyp.returnPoints();

  for(let i = 0; i < pts.length; i++) {
    p.push(new Particle(pts[i].x, pts[i].y));
    p[i].init(data);
  }

  console.log(
    "Num. particulas onda: " + p.length + "\n" + 
    ""

  );





  // var n = height/2;
  // for (let i = 0; i < n; i++) {
  //   var t = random(TAU);
  //   var r = random(100);
  //   // p.push(new Particle(r*cos(t), r*sin(t)));
  //   p.push(new Particle(0, i*width/n));

  //   p[i].init(data.params);
  // }






  // noLoop();

}



var hg;
function draw() {

  var itr = 1;
  for(let k = 0; k < itr; k++) {

    // background(0);

    strokeWeight(1);
    stroke(255,0,0);
    line(width/2, 0, width/2, height);

    // Hiperbole "guia":
    var mx = map(mouseX, 0, width, 0, width);
    var my = map(mouseY, 0, height, 0, height);
    // hyp = new DHyperbola(mx, my, 0.01, width, height, width/data.den, height/data.den, "halfLeft", "if-compare");
    

    
    data.a -= 1;
    hyp = new DHyperbola(data.a, data.b, 0.01, width, height, width/data.den, height/data.den, "halfLeft", "if-compare");
    hg = hyp.returnPoints();
    // hyp.displayPoints();


    // Controla a aceleração da hipérbole guia:
    var distCenter = width/2 - (hg[0].x + hg[int(hg.length - 1)].x + hg[hg.length - 1].x)/3;
    // console.log(hg[0].x, hg[int(hg.length - 1)].x, hg[hg.length - 1].x, distCenter);
    data.a -= 0.02*distCenter;



    // Shock - Principal:
    for (let i = 0; i < p.length; i++) {
      
      // Segue a hipérbole guia:
      var d = -1;
      var idx = 0;
      for(let j = 0; j < hg.length; j++) {
        var vd = dist(p[i].pos.x, p[i].pos.y, hg[j].x, hg[j].y);
        if(vd < d || d == -1) {
          d = vd;
          idx = j;
        }
        else {
          break;
        }
      }


      stroke(255);
      strokeWeight(2);
      // line(p[i].pos.x, p[i].pos.y, hg[idx].x, hg[idx].y);
      // line(p[i].pos.x, p[i].pos.y, hg[i].x, hg[i].y);

      p[i].distort();
      // p[i].interact(hg[idx].x, hg[idx].y);
      p[i].updateVel();
      // p[i].update();
      p[i].displayColor();
      p[i].displayColorMirror();



      // Curva principal gera as secundárias:
      // if(frameCount%50 == 0) {
      //   s.push(clone(p[i]));
      // }
    }


    // // Wave - Filhos:
    // for (let i = s.length - 1; i >= 0; i--) {
    //   // s[i].setVel(3,0);
    //   s[i].updateVel();
    //   s[i].display();
    //   if(s[i].getLife() < 0) {
    //     s.splice(i,1);
    //   } 
    // }


    // stroke(255);
    // var r = 10;
    // for(var i = 0; i < 10; i++) {
    //   for(var j = 0; j < 10; j++) {
    //     var t = TAU*noise(i,j,1);
    //     line(i*50, j*50, i*50 + r*cos(t), j*50 + r*sin(t));
    //   }
    // }


    fill(255);
    stroke(255);
    textSize(105);
    let frase = "ALAGOAS";
    text(frase, width/2 - textWidth(frase)/2, height/2)




    fill(255);
    stroke(255);
    strokeWeight(1);
    textSize(23);
    text(int(frameRate()), width-50, 25);
    text(int(frameCount), width-50, 50);
    text("(0,0)", 5, 20);

    text(int(mx) + " " + int(my), width-100, 200);

    if(frameCount > 600 || key == ' ') {
      noLoop();
    }




  } // End of Iterations.

}



function clone(pInst) {

  var temp = new Particle(pInst.pos.x, pInst.pos.y);
  temp.setColor(pInst.c);
  temp.setSize(2);
  temp.setLife(random(100));

  return temp;

}