var p = [];
var s = [];
var data = [];
var hyp;
var itr = 2, mfc;
var o1, o2, o3;
var fsz = 0;
var hg = [];
var distCenter = 10000;
var prefx = 0;



function setup() {
  if(windowWidth <= windowHeight) {
    createCanvas(windowHeight, windowWidth);
  }
  else {
    createCanvas(windowWidth, windowHeight);
  }

  noiseSeed(09092022);

  frameRate(30);
  background(0);

  o1 = []; o2 = []; o3 = [];
  o1 = createGraphics(width, height);
  o2 = createGraphics(width, height);
  o3 = createGraphics(width, height);
  p = []; s = []; data = []; hyp = []; data = []; hg = []; 
  mfc = 0; distCenter = 10000; prefx = 0; mfc = 0; fsz = 0;

  data = new Data(int(random(dados.length)));
  data.a = 0.45*width; 
  data.b = 0.9*height;
  data.den = 1;

  let minDim;
  minDim = height;
  if(windowWidth <= windowHeight) {
    minDim = width;
    fsz = 0.12*minDim;
  }
  else {
    fsz = max(80, 0.12*minDim);
  }
  
  let dta = 0.45*width; 
  let dtb = 0.9*height;
  let dtd = 500;
  let ddd = map(width, 640, 1920, 0.01, 0.0005);
  hyp = new DHyperbola(dta,dtb, ddd, width, height, width/dtd, height/dtd, "halfLeft", "distance");
  var pts = hyp.returnPoints();

  for(let i = 0; i < pts.length; i++) {
    p.push(new Particle(pts[i].x, pts[i].y));
    p[i].init(data);
  }


}





function draw() {

  background(0);

  for(let k = 0; k < itr; k++) {

    var mx = map(mouseX, 0, width, 0, width);
    var my = map(mouseY, 0, height, 0, height);
    var fs = 0.005;     
    var fd = 0.5*width; 
    var fe = 1.1;         
    if(fd - prefx > fs*width) {
      data.b = 0.9*height - height*sin(mfc/data.bFreq);
      hyp = new DHyperbola(data.a, data.b, 0.01, width, height, width/data.den, height/data.den, "halfLeft", "if-compare");
      hg = hyp.returnPoints();
      prefx = hg[int((hg.length - 1)/2)].x;
      distCenter = fe*fd - prefx;
      data.a -= 0.01*distCenter;
        
    }
    else {
      var hg = [];
    }


    for (let i = p.length - 1; i >= 0; i--) {
      var d = -1;
      var idx = 0;
      for(let j = 0; j < hg.length; j++) {
        var vd = dist(p[i].pos.x, p[i].pos.y, hg[j].x, hg[j].y);
        if(vd < d || d == -1) {
          d = vd;
          idx = j;
        }
        else {
          p[i].interact(hg[idx].x, hg[idx].y);
          break;
        }
      }
      o1.stroke(255);
      o1.strokeWeight(2);
      p[i].distort();
      p[i].updateVel();
      p[i].displayColorLine();
      p[i].displayColorLineMirror();
      if(p[i].outBound()) {
        p.splice(i,1);
      } 

    }
    o1.strokeWeight(1);
    o1.stroke(255,0,0);
    o1.line(width/2, 0, width/2, height);
    image(o1, 0, 0);
    o2 = createGraphics(width, height);
    o2.textAlign(CENTER);
    let frase = data.estado;
    o2.fill(125,100);
    o2.noStroke();
    textSize(1.02*fsz);
    o2.textSize(1.02*fsz);
    o2.text(frase, width/2 - 0.0*textWidth(frase.split("\n")[0]), height/2 + 5);
    textSize(fsz);
    o2.textSize(fsz);
    o2.fill(255);
    o2.stroke(255);
    o2.text(frase, width/2 - 0.0*textWidth(frase.split("\n")[0]), height/2);
    image(o2,0,0);
  } // End of Iterations.

  mfc++;

}


function windowResized() {
  setup();
  // noLoop();
}

function mousePressed() {
  setup();
  // noLoop();
}
