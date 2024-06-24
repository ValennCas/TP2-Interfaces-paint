class Filtro{
    constructor(context,width,height){
        this.context=context;
        this.width=width;
        this.height=height;
    }
    doAplicarFiltro(imageData){
        //acá las subclases implementarian el comportamiento 
        //para hacer el filtro sobre el imageData
    }

    //obtiene los datos de la imagen y llama a la función para poder aplicar cierto filtro
    aplicarFiltro(){
        let imageData=this.context.getImageData(0,0,this.width,this.height);
        this.doAplicarFiltro(imageData);
    }
}