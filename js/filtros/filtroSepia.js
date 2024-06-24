class FiltroSepia extends Filtro{
    constructor(context,width,height){
        super(context,width,height);
    }

    //Se calcula la media entre los tres colores (R(imageData.data[pixel+0]) G (imageData.data[pixel+1])B(imageData.data[pixel+3]))
    //y al R se le suma 100, G se le suma 50 y al azul (B) no se le suma nada para que la imagen se mantenga en una rama
    //de colores mas calidos (siendo el rojo el mas fuerte por eso se le suma mas y el verde se le suma la mitad).
    //Luego se sube la imagen al contexto.
    doAplicarFiltro(imageData){
            for (let pixel=0;pixel<imageData.data.length;pixel+=4){
                let media=(imageData.data[pixel+0]+imageData.data[pixel+1]+imageData.data[pixel+2])/3;
                imageData.data[pixel+0]=media+100;
                imageData.data[pixel+1]=media+50;
                imageData.data[pixel+2]=media;
            }
            this.context.putImageData(imageData,0,0);
    }
}