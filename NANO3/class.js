class Particle {

    constructor(x, y) {

        this.pos  = createVector(x, y);
        this.posa = createVector(x, y);
        this.vel  = createVector(0, 0);
        this.acc  = createVector(0, 0);

        this.c = color(255,0,0);
        this.pal = ["#F0EBE3"];
        this.pali = 0;

        this.sz = 1;
        this.m  = 1;
    }

    init(data) {
        
        // Parâmetros de movimento:
        let r = 5;
        let a = random(TAU);
        this.pos.x += random(r)*cos(a);
        this.pos.y += random(r)*sin(a);

        // parâmetros estéticos:
        this.setMass(1 + random(-data.mass, data.mass));
        this.setSize(data.size);
        this.setLife(data.life);
        this.setPalette(data.pal);
    }


    // Interação atuando na velocidade:
    // Utilizar quando usa o updateVel()
    interact(x, y) {
        var d = dist(this.pos.x, this.pos.y, x, y);
        
        var p = createVector(x,y);
        p.sub(this.pos);
        p.normalize();
        // p.div(this.m);
        // p.mult(0.1*d);
        p.mult(1);
        this.vel.add(p);

        // var r = 1;
        // var a = random(-0.25*PI, 0.25*PI);
        // var xd = r*cos(a);
        // var yd = r*sin(a);
        // this.vel.add(createVector(xd, yd));
    }

    // // Interação atuando na aceleração:
    // // Utilizar quando usa o update()
    // interact(x, y) {
    //     var p = createVector(x,y);
    //     p.sub(this.pos);
    //     p.normalize();
    //     p.mult(1);
    //     this.acc.add(p);
    // }



 
    updateVel() {
        this.pos.add(this.vel);
        this.vel.mult(0);

        this.l--;
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);

        this.l--;
    }

    distort() {
        // Parâmetros de movimento:
        let r = 1;
        let nf = 0.01;
        let a = TAU*noise(nf*this.pos.x, nf*this.pos.y, 1);
        this.vel.x += random(r)*cos(a);
        this.vel.y += random(r)*sin(a);
    }




    display() {
        stroke(this.c);
        strokeWeight(this.sz);
        point(this.pos.x, this.pos.y);
    }

    displayColor() {
        this.pali = int(frameCount/100)%4;
        stroke(this.pal[this.pali]);
        strokeWeight(this.sz);
        point(this.pos.x, this.pos.y);
    }

    displayColorMirror() {
        this.pali = int(frameCount/100)%4;
        stroke(this.pal[this.pali]);
        strokeWeight(this.sz);
        point(width - this.pos.x, this.pos.y);
    }









    getLife() {
        return this.l;
    }







    setVel(vx, vy) {
        this.vel = createVector(vx, vy);
    }

    setAcc(ax, ay) {
        this.vel = createVector(ax, ay);
    }

    setColor(c) {
        this.c = c;
    }

    setPalette(pal){
        this.pal = pal;
    }

    setSize(sz) {
        this.sz = sz;
    }

    setMass(m) {
        this.m = m;
    }

    setLife(l) {
        this.l = l;
    }

}


