class Data {

    constructor(index) {

        this.params = [];

        // Parâmetros das Partículas:
        // Mass:
        this.mass = dados[index][19][1];
        
        // Size:
        this.size = random(1,3);

        // Life:
        this.life = random(100);


        // Color:
        this.pal = ["#F0EBE3", "#E4DCCF", "#7D9D9C", "#576F72"];


        // Parâmetros da Hipérbole:
        this.a = 450;
        this.b = 0;
        this.den = 10;

    }


    // População Estimada [1]    | 
    // Densidade Demográfica [3] | 0    a   450
    // IDH [19]                  | 0.5  a   0.8

}