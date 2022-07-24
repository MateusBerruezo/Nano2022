// Hipérbole Discretizada - Discretiza a hipérbole e já devolve os índices que ela irá ocupar em um espaço 2D PRE-DEFINIDO:
// a, b   -> Parâmetros da Hipérbole;
// t      -> Passo da equação paramétrica (t = theta (0 a TAU)). Quanto menor, melhor;
// w, h   -> Limites do espaço que a hipérbole será discretizado (0 a w, 0 a h). O espaço válido para que a hiérbole irá ocupar é (-w/2 a w/2, -h/2 a h/2);
// dw, dh -> Divisões discretas do espaço definido. Ideal escolher dw e dh de tal forma que w/dw e h/dh sejam ambos números inteiros;
// Exemplo: (100, 250, 0.01, 500, 500, 20, 20, "full", "if-compare")

class DHyperbola {
    
    constructor(a, b, d, w, h, dw, dh, type, dtype) {
        this.a = a;
        this.b = b;
        this.d = d;
        this.w = w;
        this.h = h;
        this.dw = dw;
        this.dh = dh;

        // Necessário declarar os vetores para estarem disponíveis na classe:
        this.hip = [];

        switch (type) {
            case "halfRight":
                this.aMin = -PI/2;
                this.aMax =  PI/2;
                break;

            case "halfLeft":
                this.aMin = PI/2;
                this.aMax = 3*PI/2;                
                break;

            case "quarterTopLeft":
                this.aMin = PI/2;
                this.aMax = PI;
                break;

            default:
                this.aMin = 0;
                this.aMax = TAU;
                break;
        }

        // Constrói a hipérbole discretizada:
        if(dtype == "if-compare") {
            this.hyperbola2pointsManh();
        }
        else{
            this.hyperbola2pointsEuclid(min(dw,dh));
        } 
        
    }

    hyperbola2pointsManh() {

        // Pontos que representam a hipérbole em seu espaço. 
        // Não são pontos (x,y) no espaço (w,h) e sím índices (i,j) da matriz discretizada de tamanho N x M onde:
        // N = floor(w/dw)
        // M = floor(h/dh)
        this.hip = [];
      
        // Pontos anteriores: Para evitar pontos que ocupem o mesmo espaço discretizado
        var xant = 10000000, yant = 10000000;
        
        // Tamanho das divisões:
        var divx = this.w/this.dw;
        var divy = this.h/this.dh;
      
        for (let t = this.aMin; t < this.aMax; t += this.d) {
          // Eq. paramétrica da hipérbole:
          let x  = this.a/cos(t);
          let y1 = this.b*tan(t);
          let y2 = -this.b*tan(t);

          // Trata os limites do espaço e 
          if(abs(x - xant) >= divx || abs(y1 - yant) >= divy) {
            if(x > -this.w/2 && x < this.w/2) {
              if(y1 > -this.h/2 && y1 < this.h/2) {
                this.hip.push(createVector(x + this.w/2, y1 + this.h/2));
                xant = x;
                yant = y1;
              }
            }
          }
      
        } // end for
    }


    hyperbola2pointsEuclid(threshold) {

        // Pontos que representam a hipérbole em seu espaço. 
        // Não são pontos (x,y) no espaço (w,h) e sím índices (i,j) da matriz discretizada de tamanho N x M onde:
        // N = floor(w/dw)
        // M = floor(h/dh)
        this.hip = [];
      
        // Pontos anteriores: Para evitar pontos que ocupem o mesmo espaço discretizado
        var xant = 10000000, yant = 10000000;
        
        for (let t = this.aMin; t < this.aMax; t += this.d) {
          // Eq. paramétrica da hipérbole:
          let x  = this.a/cos(t);
          let y1 = this.b*tan(t);
          let y2 = -this.b*tan(t);

        // Trata os limites do espaço e centraliza a saída:
        if(dist(x, y1, xant, yant) > threshold) {
            this.hip.push(createVector(x + this.w/2, y1 + this.h/2));
            xant = x;
            yant = y1;
        }

      
        } // end for
    }



    returnPoints() {
        return this.hip;
    }


    display(verbose) {

        strokeWeight(2);
        stroke(255);

        translate(width/2, height/2);
        for (let t = this.aMin; t < this.aMax; t += this.d) {
            
            let x  = this.a/cos(t);
            let y1 = this.b*tan(t);
            let y2 = -this.b*tan(t);
    
            point(x,y1);

            if(verbose) {
                console.log(x,y1);
            }
        }
        translate(-width/2, -height/2);
    }


    displayPoints(verbose) {

        strokeWeight(5);
        stroke(255,0,0);

        for (let i = 0; i < this.hip.length; i++) {
            point(this.hip[i].x, this.hip[i].y);
            if(verbose) {
                console.log(this.hip[i].x, this.hip[i].y);
            }
        }
    }

}