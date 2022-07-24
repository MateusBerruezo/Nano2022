class CBlock {
    
    constructor(px, py, w, h) {
        this.px = px;
        this.py = py;
        this.w = w;
        this.h = h;


        // Cria os pontos do blocko (Anti-Horário):
        //
        //     P4 ---------- P3
        //     /             /
        //    /             /
        //   /             /
        //  P1 ---------- P2
        //
        // Conjunto de 4 pontos, sempre do piso inferior para o superior


        this.pts = [];

        // // Tradicional:
        // // Nível 0 (base):
        // this.pts.push(createVector(px-w/2, py+w/2, 0));
        // this.pts.push(createVector(px+w/2, py+w/2, 0));
        // this.pts.push(createVector(px+w/2, py-w/2, 0));
        // this.pts.push(createVector(px-w/2, py-w/2, 0));
        // // Nivel 1 (teto):
        // this.pts.push(createVector(px-w/2, py+w/2, h));
        // this.pts.push(createVector(px+w/2, py+w/2, h));
        // this.pts.push(createVector(px+w/2, py-w/2, h));
        // this.pts.push(createVector(px-w/2, py-w/2, h));

        // Distribuíndo polarmente (quadrado circunscrito):
        this.addLevel(0, 0);
        this.addLevel(h, 0);





    }

    honk() {
        console.log(this.pts[0].x + " " + this.pts[0].y);
    }

    addLevel(h, t) {
        var r = sqrt(2*(this.w/2)*(this.w/2));
        this.pts.push(createVector(this.px + r*cos(t + PI - 0.25*PI), this.py + r*sin(t + PI - 0.25*PI), h));
        this.pts.push(createVector(this.px + r*cos(t + 0  + 0.25*PI), this.py + r*sin(t + 0  + 0.25*PI), h));
        this.pts.push(createVector(this.px + r*cos(t + 0  - 0.25*PI), this.py + r*sin(t + 0  - 0.25*PI), h));
        this.pts.push(createVector(this.px + r*cos(t - PI + 0.25*PI), this.py + r*sin(t - PI + 0.25*PI), h));
    }

    rotateLevel(n, t) {
        var r = sqrt(2*(this.w/2)*(this.w/2));
        this.pts[0 + 4*n] = createVector(this.px + r*cos(t + PI - 0.25*PI), this.py + r*sin(t + PI - 0.25*PI), this.pts[0 + 4*n].z);
        this.pts[1 + 4*n] = createVector(this.px + r*cos(t + 0  + 0.25*PI), this.py + r*sin(t + 0  + 0.25*PI), this.pts[0 + 4*n].z);
        this.pts[2 + 4*n] = createVector(this.px + r*cos(t + 0  - 0.25*PI), this.py + r*sin(t + 0  - 0.25*PI), this.pts[0 + 4*n].z);
        this.pts[3 + 4*n] = createVector(this.px + r*cos(t - PI + 0.25*PI), this.py + r*sin(t - PI + 0.25*PI), this.pts[0 + 4*n].z);
    }






























    ///////////////////////
    //////  DISPLAYS  /////
    ///////////////////////

    display() {
        fill(255,0,0);

        // translate(this.px, this.py);
        
        this.displayBase(0);
        this.displayFrente(0);
        this.displayFrenteDir(0);
        this.displayFrenteEsq(0);
        this.displayTras(0);
        this.displayTopo(0);

        fill(255,255,255);
    }   

    displayBase(n) {
        beginShape();
            vertex(this.pts[0 + 4*n].x, this.pts[0 + 4*n].y, this.pts[0 + 4*n].z);
            vertex(this.pts[1 + 4*n].x, this.pts[1 + 4*n].y, this.pts[1 + 4*n].z);
            vertex(this.pts[2 + 4*n].x, this.pts[2 + 4*n].y, this.pts[2 + 4*n].z);
            vertex(this.pts[3 + 4*n].x, this.pts[3 + 4*n].y, this.pts[3 + 4*n].z);
        endShape();
    }

    displayFrente(n) {
        beginShape();
            vertex(this.pts[0 + 4*n].x, this.pts[0 + 4*n].y, this.pts[0 + 4*n].z);
            vertex(this.pts[1 + 4*n].x, this.pts[1 + 4*n].y, this.pts[1 + 4*n].z);
            vertex(this.pts[5 + 4*n].x, this.pts[5 + 4*n].y, this.pts[5 + 4*n].z);
            vertex(this.pts[4 + 4*n].x, this.pts[4 + 4*n].y, this.pts[4 + 4*n].z);
        endShape();
    }

    displayFrenteDir(n) {
        beginShape();
            vertex(this.pts[1 + 4*n].x, this.pts[1 + 4*n].y, this.pts[1 + 4*n].z);
            vertex(this.pts[2 + 4*n].x, this.pts[2 + 4*n].y, this.pts[2 + 4*n].z);
            vertex(this.pts[6 + 4*n].x, this.pts[6 + 4*n].y, this.pts[6 + 4*n].z);
            vertex(this.pts[5 + 4*n].x, this.pts[5 + 4*n].y, this.pts[5 + 4*n].z);
        endShape();
    }

    displayFrenteEsq(n) {
        beginShape();
            vertex(this.pts[0 + 4*n].x, this.pts[0 + 4*n].y, this.pts[0 + 4*n].z);
            vertex(this.pts[3 + 4*n].x, this.pts[3 + 4*n].y, this.pts[3 + 4*n].z);
            vertex(this.pts[7 + 4*n].x, this.pts[7 + 4*n].y, this.pts[7 + 4*n].z);
            vertex(this.pts[4 + 4*n].x, this.pts[4 + 4*n].y, this.pts[4 + 4*n].z);
        endShape();
    }

    displayTras(n) {
        beginShape();
            vertex(this.pts[2 + 4*n].x, this.pts[2 + 4*n].y, this.pts[2 + 4*n].z);
            vertex(this.pts[4 + 4*n].x, this.pts[3 + 4*n].y, this.pts[3 + 4*n].z);
            vertex(this.pts[7 + 4*n].x, this.pts[7 + 4*n].y, this.pts[7 + 4*n].z);
            vertex(this.pts[6 + 4*n].x, this.pts[6 + 4*n].y, this.pts[6 + 4*n].z);
        endShape();
    }

    displayTopo(n) {
        beginShape();
            vertex(this.pts[4 + 4*n].x, this.pts[4 + 4*n].y, this.pts[4 + 4*n].z);
            vertex(this.pts[5 + 4*n].x, this.pts[5 + 4*n].y, this.pts[5 + 4*n].z);
            vertex(this.pts[6 + 4*n].x, this.pts[6 + 4*n].y, this.pts[6 + 4*n].z);
            vertex(this.pts[7 + 4*n].x, this.pts[7 + 4*n].y, this.pts[7 + 4*n].z);
        endShape();
    }

    displayLevel(n) {
        strokeWeight(10);
        stroke(0,0,255);
        point(this.pts[0 + 4*n].x, this.pts[0 + 4*n].y, this.pts[0 + 4*n].z);
        stroke(0,255,0);
        point(this.pts[1 + 4*n].x, this.pts[1 + 4*n].y, this.pts[1 + 4*n].z);
        stroke(255,0,0);
        point(this.pts[2 + 4*n].x, this.pts[2 + 4*n].y, this.pts[2 + 4*n].z);
        stroke(0,0,0);
        point(this.pts[3 + 4*n].x, this.pts[3 + 4*n].y, this.pts[3 + 4*n].z);
        stroke(0);
        strokeWeight(1);
    }

}