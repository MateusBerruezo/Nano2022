class Data {

    constructor(index) {

        this.index = index;
        this.estado = dados[index][0][1];
        this.mass = dados[index][19][1];
        this.size = 3;
        this.life = random(100);
        this.pal = gpal[index];
        this.colorFreq = 4;
        this.a = 450;
        this.b = 0;
        this.bFreq = dados[index][3][1];
        this.den = 10;
        this.regen1 = dados[index][5][1];
        this.regen2 = dados[index][6][1];
        this.noiseFactor = 0;
        this.noiseRadius = map(dados[index][22][1], 0, 5000, 1, 8);
        this.initialAngle = map(dados[index][13][1], 0, 2500, -PI/2, PI/2);
    }
}