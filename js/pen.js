class Pen{
    constructor(posX, posY, color, context,grosor){
        this.antX = posX;
        this.antY = posY;
        this.posX = posX;
        this.posY = posY;
        this.ctx = context;
        this.color = color;
        this.grosor=grosor;
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.color;
        this.ctx.moveTo(this.antX, this.antY); //muevo coordenada originales
        this.ctx.lineTo(this.posX, this.posY);//muevo a coordenada nuevas
        this.ctx.stroke(); //espacio entre las coordenadas llenadas por el espacio
        ctx.lineWidth=this.grosor;//Defino el grosor del elemento
        this.ctx.closePath();
    }

    //Actualiza la posicion de X e Y segun los parametros que lleguen
    moveTo(posX, posY){
        this.antX = this.posX;
        this.antY = this.posY;
        this.posX = posX;
        this.posY = posY;
    }
}