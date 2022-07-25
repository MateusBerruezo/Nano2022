class DHyperbola {
    
    constructor(a, b, d, w, h, dw, dh, type, dtype) {
        this.a = a;
        this.b = b;
        this.d = d;
        this.w = w;
        this.h = h;
        this.dw = dw;
        this.dh = dh;
        this.hip = [];
        this.aMin = PI/2;
        this.aMax = 3*PI/2;                
        if(dtype == "if-compare") {
            this.hyperbola2pointsManh();
        }
        else{
            this.hyperbola2pointsEuclid(min(dw, dh));
        } 
        
    }

    hyperbola2pointsManh() {
        this.hip = [];
        var xant = 10000000, yant = 10000000;
        var divx = this.w/this.dw;
        var divy = this.h/this.dh;
        for (let t = this.aMin; t < this.aMax; t += this.d) {
          let x  = this.a/cos(t);
          let y1 = this.b*tan(t);
          let y2 = -this.b*tan(t);
          if(abs(x - xant) >= divx || abs(y1 - yant) >= divy) {
            if(x > -this.w/2 && x < this.w/2) {
              if(y1 > -this.h/2 && y1 < this.h/2) {
                this.hip.push(createVector(x + this.w/2, y1 + this.h/2));
                xant = x;
                yant = y1;
              }
            }
          }
        } 
    }


    hyperbola2pointsEuclid(threshold) {
        this.hip = [];
        var xant = 10000000, yant = 10000000;
        for (let t = this.aMin; t < this.aMax; t += this.d) {
          let x  = this.a/cos(t);
          let y1 = this.b*tan(t);
          let y2 = -this.b*tan(t);
        if(x > -this.w/2 && x < this.w/2) {
            if(y1 > -this.h/2 && y1 < this.h/2) {
                if(dist(x, y1, xant, yant) > threshold) {
                    this.hip.push(createVector(x + this.w/2, y1 + this.h/2));
                    xant = x;
                    yant = y1;
                }
            }
        }
        } 
    }



    returnPoints() {
        return this.hip;
    }

}