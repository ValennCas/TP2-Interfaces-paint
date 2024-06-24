class FiltroBinarizacion extends Filtro{
    constructor(context,width,height){
        super(context,width,height);
    }

    //Se convierte la imagen a una escala de grises ya el filtro de binarización funciona mejor y más fácil en una imagen
    //en blanco y negro (porque si el valor del R (rojo) supera los 128 (un numero más que de la mitad de 255) su valor completo
    //(todo el RGB) se van a declarar en 255 creando el blanco y sino los declara en 0 creando el color negro).
    doAplicarFiltro(imageData){
    let filtroEscalaDeGrises=new FiltroEscalaDeGrises(ctx, canvaswidth, canvasheigth);
    filtroEscalaDeGrises.doAplicarFiltro(imageData);
    let umbral=128;
            for (let pixel=0;pixel<imageData.data.length;pixel+=4){
                let intensidad=imageData.data[pixel+0];
                let valorBinario;
                if(intensidad>umbral){
                    valorBinario=255
                }
                else{
                    valorBinario=0;
                }
                imageData.data[pixel+0]=valorBinario;
                imageData.data[pixel+1]=valorBinario;
                imageData.data[pixel+2]=valorBinario;
            }
            this.context.putImageData(imageData,0,0);
    }
}