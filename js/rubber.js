class Rubber extends Pen{
    //Goma cumple la misma funcion que el lápiz pero siempre con el mismo color del fondo del canvas
    constructor(posX, posY, context,grosor){
        super(posX, posY, 'white', context,grosor);
    }
}