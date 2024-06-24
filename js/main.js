/**
 * @type{HTMLCanvasElement}
 */

let botonClickSobreLapiz=document.getElementById("botonClickSobreLapiz");
let divMostrarColor=document.querySelector(".divNoVisible");
let canvas=document.getElementById("miCanvas");
let ctx=canvas.getContext("2d");
let botonEnviarColor=document.getElementById("botonEnviarColor");
let colorSeleccionadoLapiz=document.getElementById("colorSeleccionado");
let confirmarGoma=document.getElementById("botonClickSobreGoma");
let divBotonGoma=document.querySelector("#botonClickSobreGoma");
let cargarCanvasVacio=document.getElementById("cargarCanvasVacio");
let cargarCanvasConImagen=document.getElementById("cargarCanvasConImagen");
let file_input=document.querySelector('#imagenCargada');

let dialogo=document.getElementById("miDialogo");
let botonFiltros=document.getElementById("botonFiltros");
let canvaswidth = canvas.width;
let canvasheigth = canvas.height;
let miImagen= new Imagen(ctx, canvaswidth,canvasheigth);

let mouseUp = true; // opuesto de mouseDown, si uno es false el otro es true
let mouseDown = false; //
let penClick = false; // si hicimos click en el boton
let miPen = null;
let colorLapizElegido="black";

//los dos controladores se encargan de controlar si el menu de cada elemento se encuentra abierto o no
let controladorAbrirMenuColor=false;
let controladorMenuGomaBorrar=false;
let miGoma=null;
let moverGoma=false;
let detenerGoma=true;
let gomaClick=false;
let grosorLapiz=2;
let grosorGoma=2;
//Le asigna al boton que se encuentre al pendiente del click, en caso de hacerlo, compureba si la goma
//se encuentra seleccionada o el menu de la goma esta abierto, donde el codigo hace que se "deseleccione" volviendo su valor falso, removiendo la 
//clase que le da estilo al boton (esta clase tiene el objetivo de cuando se seleccione un elemento para usarlo su boton
//que con un fondo más oscuro para saber que se esta usando este elemento) y su controlador en false.
botonClickSobreLapiz.addEventListener("click", function(e){
    if(gomaClick==true || controladorMenuGomaBorrar==true){
        gomaClick=false;
        botonClickSobreGoma.classList.remove('botonSeleccionado');
        document.querySelector(".divGrosorGoma").classList.remove('divVisible');
        document.querySelector(".divGrosorGoma").classList.add('divNoVisible');
        controladorMenuGomaBorrar=false;
    }
    //ControladorAbrirMenuColor comprueba de que el menú no se encuentre abierto (que su valor sea false),
    //agrega la clase divVisible que permite visualizar el div que contiene la opción de elegir un color y un grosor para el 
    //lapiz, se remueve la clase que "ocultaba" este div y se le agrega al boton la clase que le da estilo al boton
    //cuando es usado y cambia el valor de controladorAbrirMenuColor.
    if(controladorAbrirMenuColor==false){
        divMostrarColor.classList.add('divVisible');
        divMostrarColor.classList.remove('divNoVisible');
        botonClickSobreLapiz.classList.add('botonSeleccionado');
        controladorAbrirMenuColor=true;
    }
    //En caso contrario, de que controladorAbrirMenuColor sea true, su función seria cerrar el div donde se encuentra las
    //opciones de color y grosor del lapiz, se remueve la clase que le da visibilidad al div y se vuelve a ocultar con la 
    //clase divNoVisible y se remueve el estilo al boton donde quedaria como si el boton ya no estuviera seleccionado o en 
    //función, el penClick se vuelve false para que no permita dibujar y el controlador se vuelve a false para que se pueda 
    //volver a abrir el menú después
    else{
        divMostrarColor.classList.remove('divVisible');
        divMostrarColor.classList.add('divNoVisible');
        botonClickSobreLapiz.classList.remove('botonSeleccionado');
        penClick=false;
        controladorAbrirMenuColor=false;
    }
});


//El boton que contiene la goma estará escuchando un click
divBotonGoma.addEventListener("click", function(e){
    //Se controla que en caso de que el lapiz se encuentre seleccionado o su menu abierto, se quite la opción de poder dibujar
    //volviendo false a penClick, se remueve la clase donde se da estilo al boton para que este seleccionada y su controlador
    //se vuelve false.
    if(penClick==true || controladorAbrirMenuColor==true){
        penClick=false;
        divMostrarColor.classList.remove('divVisible');
        divMostrarColor.classList.add('divNoVisible');
        botonClickSobreLapiz.classList.remove('botonSeleccionado');
        controladorAbrirMenuColor=false;
    }
    //Se controla que controladorMenuGomaBorrar sea identico a false, en caso de serlo
    // se agrega la clase que le da estilo al boton seleccionado y su controlador se vuelve true
    //para que el próximo click sea para cerrar el menu
    if(controladorMenuGomaBorrar==false){
        document.querySelector(".divGrosorGoma").classList.remove('divNoVisible');
        document.querySelector(".divGrosorGoma").classList.add('divVisible');
        divBotonGoma.classList.add('botonSeleccionado');
        controladorMenuGomaBorrar=true;
    }
    //En caso de que controladorMenuGomaBorrar sea true
    //se quitará la clase que le da estilo al boton seleccionado y su controlador se vuelve false para que la próxima 
    //vez que se haga click sea para seleccionar la goma y usarla (el if de arriba)
    else{
        gomaClick=false;
        divBotonGoma.classList.remove('botonSeleccionado');
        controladorMenuGomaBorrar=false;
        document.querySelector(".divGrosorGoma").classList.remove('divVisible');
        document.querySelector(".divGrosorGoma").classList.add('divNoVisible');
    }
});

//Cuando se confirme el uso de la goma, se obtiene el grosor que se seleccionó, se quita la opción de ver el menú de la 
//goma y gomaClick se vuelve true para poder borrar
document.getElementById("botonEnviarGrosorGoma").addEventListener("click", function(){
    grosorGoma=document.getElementById("grosorSeleccionadoGoma").value;
    document.querySelector(".divGrosorGoma").classList.remove('divVisible');
        document.querySelector(".divGrosorGoma").classList.add('divNoVisible');
        gomaClick=true;
});

//Cuando se confirme el color (se encuentra un boton que especifica que se confirme el color que estará pendiente a 
//escuchar un click) se remueve la clase que le da visibilidad a este div y se le agrega la clase que lo vuelve "invisible"
//ademas que penClick se vuelve true para poder empezar a dibujar
botonEnviarColor.addEventListener("click", function(e){
    grosorLapiz=document.getElementById("grosorSeleccionado").value;
    divMostrarColor.classList.remove('divVisible');
    divMostrarColor.classList.add('divNoVisible');
    penClick=true;
});

//Cuanddo se cambie el color del input que maneja el color del lapiz se guardará en una variable
colorSeleccionadoLapiz.addEventListener("change", function(e){
    colorLapizElegido=colorSeleccionadoLapiz.value;
});

//Cuando se desee subir una imagen (que se haga click sobre el boton subir imagen) se desplegará el dialogo 
//que permitirá que se pueda seleccionar la imagen a subir
cargarCanvasConImagen.addEventListener("click", function(){
    dialogo.showModal();
});

//Cuando cambie el valor del input donde se carga la imagen, se cargará la imagen, se cambiará su valor 
//a null y se cerrará el dialogo
file_input.addEventListener("change", (e)=>{
    miImagen.cargarImagen(e.target.files[0]);
    e.target.files.value=null;
    dialogo.close();
    file_input.value="";
});

//Se le asigna al canvas que este escuchando "mousedown"
canvas.addEventListener('mousedown', (e) => {
    //en caso de que penClick sea true, volverá las variables mouseDown true para poder mover el mouse y se dibuje 
    //se guardan las coordenadas de X e Y del mouse y se inicializa un Pen con las coordenadas, el color y el contexto
    if(penClick == true){
        mouseDown = true;
        mouseUp = false;
        let posX=e.offsetX;
        let posY=e.offsetY;
        miPen = new Pen(posX, posY, colorLapizElegido, ctx,grosorLapiz);
    }
    //En caso de que gomaClick sea true, moverGoma se volverá true para que permita que cuando se mueva el mouse borre
    //lo que se encuentra en el canvas, se toman las posiciones del mouse en el eje X e Y y se crea una goma
    if(gomaClick==true){
        moverGoma=true;
        detenerGoma=false;
        let posX=e.offsetX;
        let posY=e.offsetY;
        miGoma = new Rubber(posX, posY, ctx, grosorGoma);
    }
});

//Cuando se mueva el mouse, en caso de estar seleccionado el pen, se llamará a la función moveTo qaue actualizará los 
//valores de X e Y (que son tomados en este caso) y se dibujará
//En caso de estar seleccionada la goma se tomaran las coordenadas del eje X e Y del mouse, se actualizarán los valores
//con el moveTo y se dibujará la goma
canvas.addEventListener('mousemove', (e) => {
    if(mouseDown && miPen != null){
        miPen.moveTo(e.offsetX, e.offsetY);
        miPen.draw();
    }
    if(moverGoma && miGoma !=null){
        let posX=e.offsetX;
        let posY=e.offsetY;
        miGoma.moveTo(posX, posY);
        miGoma.draw();
    }
});

//Cuando se levante el mouse (mouseup) los valores de mouseDown y moverGoma se volveran false para que no pueda seguir 
//dibujando o borrando dependiendo a que elemento se este utilizando y los valores de mouseUp y detenerGoma se volverán true
//para que no permita dibujar o borrar
canvas.addEventListener('mouseup', (e) => {
    mouseDown = false;
    mouseUp = true;   
    moverGoma=false;
    detenerGoma=true;
});


//Limpia todo el canvas.
cargarCanvasVacio.addEventListener("click", function(e){
    ctx.clearRect(0,0,canvaswidth,canvasheigth);
});


document.getElementById("guardarImagen").addEventListener('click', (e)=>{
    let link= document.createElement('a'); //Se crea un enlace
    //Esto indica al navegador que cuando se haga clic
    //en este enlace, se debe descargar el recurso en lugar de abrirlo en una nueva ventana o pestaña.
    link.download= "paint.jpg";
    link.href=canvas.toDataURL(); //define el href del link
    link.click(); //esto logra que se inicie la descarga de la imagen
})

//Despliega el div que contiene todos los filtros
let booleanoMenuFiltros=false;

//Funciona igual que la goma y el lapiz, en caso de ser false, mostrará el div ue contiene los filtros
//en caso de ser true, "ocultará" el div.
botonFiltros.addEventListener("click", function(){
    if(booleanoMenuFiltros==false){
        document.querySelector(".divFiltros").classList.add('divVisible');
        document.querySelector(".divFiltros").classList.remove('divNoVisible');
        booleanoMenuFiltros=true;
        botonFiltros.classList.add('botonSeleccionado');
    }
    else{
        document.querySelector(".divFiltros").classList.remove('divVisible');
        document.querySelector(".divFiltros").classList.add('divNoVisible');
        booleanoMenuFiltros=false;
        botonFiltros.classList.remove('botonSeleccionado');
    }
});

//Cada boton que corresponde a cierto filtro, espera que sea clickeado para declarar el filtro que le corresponde 
//de ahi aplicarlo en el lienzo y se "esconde" el div que contiene todos los botones de los filtros.

document.getElementById("filtroNegativo").addEventListener("click", function(e){
    let filtroNegativo=new FiltroNegativo(ctx, canvaswidth, canvasheigth);
    filtroNegativo.aplicarFiltro();
    sacarEstilo();
});

document.getElementById("filtroBrillo").addEventListener("click", function(){
    canvasCopia=canvas;
    let filtroBrillo=new FiltroBrillo(ctx, canvaswidth, canvasheigth);
    filtroBrillo.aplicarFiltro();
    sacarEstilo();
});

document.getElementById("filtroBinarizacion").addEventListener("click", function(){
    let filtroBinarizacion= new FiltroBinarizacion(ctx, canvaswidth, canvasheigth);
    filtroBinarizacion.aplicarFiltro();
    sacarEstilo();
});

document.getElementById("filtroSepia").addEventListener("click", function(){
    let filtroSepia= new FiltroSepia(ctx, canvaswidth, canvasheigth);
    filtroSepia.aplicarFiltro();
    sacarEstilo();
});

document.getElementById("filtroSaturacion").addEventListener("click", function(){
    let saturacionElegida=document.getElementById("saturacionElegida").value;
    let filtroSaturacion= new FiltroSaturacion(ctx, canvaswidth, canvasheigth, saturacionElegida);
    filtroSaturacion.aplicarFiltro();
    sacarEstilo();
});

document.getElementById("filtroDeteccionDeBordes").addEventListener("click", function(){
    let filtroDeteccionDeBordes= new FiltroDeteccionDeBordes(ctx, canvaswidth, canvasheigth);
    filtroDeteccionDeBordes.aplicarFiltro();
    sacarEstilo();
});

document.getElementById("filtroBlur").addEventListener("click", function(){
    let filtroBlur= new FiltroBlur(ctx, canvaswidth, canvasheigth);
    filtroBlur.aplicarFiltro();
    sacarEstilo();
});

document.getElementById("filtroEscalaDeGrises").addEventListener("click", function(){
    let filtroEscalaDeGrises= new FiltroEscalaDeGrises(ctx, canvaswidth, canvasheigth);
    filtroEscalaDeGrises.aplicarFiltro();
    sacarEstilo();
});

//Se encarga de ocultar el div que contiene todos los filtros
function sacarEstilo(){
    booleanoMenuFiltros=false;
    document.querySelector(".divFiltros").classList.add('divNoVisible');
    document.querySelector(".divFiltros").classList.remove('divVisible');
    botonFiltros.classList.remove('botonSeleccionado');
}