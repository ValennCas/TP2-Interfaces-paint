class FiltroEscalaDeGrises extends Filtro{
    constructor(context,width,height){
        super(context,width,height);
    }
    //Se itera los pixeles de imageData.data, donde se suman los valores RGB y se dividen por tres para obtener
    //un gris promedio de los tres colores y este color (la variable media) se le asigna a los pixeles
    doAplicarFiltro(imageData){
        for (let pixel=0;pixel<imageData.data.length;pixel+=4){
            let media=(imageData.data[pixel+0]+imageData.data[pixel+1]+imageData.data[pixel+2])/3;
            imageData.data[pixel+0]=media;
            imageData.data[pixel+1]=media;
            imageData.data[pixel+2]=media;
        }
        this.context.putImageData(imageData,0,0);
    }
}