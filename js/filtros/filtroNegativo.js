class FiltroNegativo extends Filtro{
    constructor(context,width,height){
        super(context,width,height);
    }
    // Se itera al imageData.data donde se accede a los valores RGB y se les resta 255 a su valor original
    //y se asigna este nuevo color en la posición correspondiente y se sube la imagen
    doAplicarFiltro(imageData){
            for (let pixel=0;pixel<imageData.data.length;pixel+=4){
                imageData.data[pixel+0]=255-imageData.data[pixel+0];
                imageData.data[pixel+1]=255-imageData.data[pixel+1];
                imageData.data[pixel+2]=255-imageData.data[pixel+2];
            }
            this.context.putImageData(imageData,0,0);
    }
}