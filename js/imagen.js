
class Imagen{
    constructor(context, width, height){
        this.context=context;
        this.width=width;
        this.height=height;
        this.cargada=false;
    }

    cargarImagen(fileName){
        let orgWidth=this.width;
        let orgHeight=this.height;

        let miImg=new Image();//Crea una nueva instancia de la clase Image, que se utilizará para cargar la imagen.
        miImg.src=URL.createObjectURL(fileName); //: Asigna la URL del fileName al atributo src de la variable miImg 
        let context=this.context;

        miImg.onload = function(){ //Se usa el evento onload para que todo lo que se encuentra adentro se ejecute cuando la imagen este completamente cargada
            const aspectRatio= this.naturalWidth/ this.naturalHeight; //Se calcula el aspecto de la imagen dividiendo su ancho entre su altura.
            let targetWidth=orgWidth;
            let targetHeight= targetWidth / aspectRatio; //Se calcula la altura de destino basándose en el aspecto de la imagen y el ancho de destino.
            //En caso de que la altura del destino sea mas grande que el ancho original,establece la altura de destino en la altura original.
            if(targetHeight> orgHeight){
                targetHeight=orgHeight;
                targetWidth=targetHeight * aspectRatio;
            }
            //Dibuja la imagen en el contexto
            context.drawImage(this, 0,0, targetWidth,targetHeight);
        }
    }
}