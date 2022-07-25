class Particle {

    constructor(x, y) {
        this.pos  = createVector(x, y);
        this.posa = createVector(x, y);
        this.vel  = createVector(0, 0);
        this.acc  = createVector(0, 0);
        this.c = color(255,0,0);
        this.pal = ["#F0EBE3"];
        this.pali = 0;
        this.cf = 4;
        this.cd = 0;
        this.sz = 1;
        this.m  = 1;
        this.nloci = 0;
        this.ndet = 0.01;
        this.ai = 0;
        this.nrad = 0;
    }

    init(data) {
        let r = 5;
        let a = random(TAU);
        this.pos.x += random(r)*cos(a);
        this.pos.y += random(r)*sin(a);
        this.setMass(10 + random(-10,10) + 0*random(-data.mass, data.mass));
        this.setSize(random(data.size));
        this.setLife(data.life);
        this.setPalette(data.pal);
        this.setColorFreq(data.colorFreq);
        this.setNoiseOctave(data.index);
        this.setInitialAngle(data.initialAngle);
        this.setNoiseRadius(data.noiseRadius);
    }


    interact(x, y) {
        var p = createVector(x,y);
        p.sub(this.pos);
        p.normalize();
        p.mult(5);
        this.vel.add(p);
    }

 
    updateVel() {
        this.posa = createVector(this.pos.x, this.pos.y);
        this.pos.add(this.vel);
        this.vel.mult(0);

        this.l--;
    }

    distort() {
        let a = this.ai + TAU*noise(this.ndet*this.pos.x, this.ndet*this.pos.y, this.nloci);
        this.vel.x -= this.nrad*cos(a);
        this.vel.y -= this.nrad*sin(a);
    }

    outBound() {
        if(this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
            return true;
        }
        return false;
    }


    displayColorLine() {
        this.pali = int(mfc/this.cf)%this.cd;
        o1.stroke(this.pal[this.pali]);
        o1.strokeWeight(this.sz);
        o1.line(this.posa.x, this.posa.y, this.pos.x, this.pos.y);
    }

    displayColorLineMirror() {
        this.pali = int(mfc/this.cf)%this.cd;
        o1.stroke(this.pal[this.pali]);
        o1.strokeWeight(this.sz);
        o1.line(width - this.posa.x, this.posa.y, width - this.pos.x, this.pos.y);
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
        this.cd = pal.length;
    }

    setColorFreq(cf) {
        this.cf = cf;
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




    setInitialAngle(ai) { this.ai = ai; }

    setNoiseOctave(idx) { this.nloci = idx; }

    setNoiseDetail(ndet) { this.ndet = ndet; }

    setNoiseRadius(nrad) { this.nrad = nrad; }



    mitosis() {
        let r = 5;
        let nf = 0.01;
        let a = TAU*noise(nf*this.pos.x, nf*this.pos.y, 1);
        var p = new Particle(this.pos.x + r*cos(a), this.pos.y + r*sin(a));
        
        p.setMass(this.m);
        p.setSize(this.sz);
        p.setLife(this.l);
        p.setPalette(this.pal);

        return p;
    }




}


