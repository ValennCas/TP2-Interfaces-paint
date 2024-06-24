class FiltroBrillo extends Filtro{
    constructor(context, width, height){
        super(context, width,height);
    }
    //Se le suma a cada valor RGB del pixel +50 para lograr el efecto de brillo en la imagen (vuelve los colores más 
    //claros(llegando al blanco)) y luego sube la imagen.
    doAplicarFiltro(imageData){
        for(let pixel=0; pixel<imageData.data.length; pixel+=4){
            imageData.data[pixel+0]=imageData.data[pixel+0]+50;
            imageData.data[pixel+1]=imageData.data[pixel+1]+50;
            imageData.data[pixel+2]=imageData.data[pixel+2]+50;
        }
        this.context.putImageData(imageData,0,0);
    }
}