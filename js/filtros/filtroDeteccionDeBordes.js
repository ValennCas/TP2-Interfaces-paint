class FiltroDeteccionDeBordes extends Filtro {
    constructor(context, width, height) {
        super(context, width, height);
    }
    // Aplicar el filtro Sobel
    doAplicarFiltro(imageData) {
        let filtroEscalaDeGrises=new FiltroEscalaDeGrises(ctx, canvaswidth, canvasheigth);
        filtroEscalaDeGrises.doAplicarFiltro(imageData);
        //Define las matrices sobelX y sobelY que representan los núcleos para la detección 
        //de bordes en las direcciones X e Y, respectivamente.
        let sobelX = [
            [-1, 0, 1],
            [-2, 0, 2],
            [-1, 0, 1]
        ];
        let sobelY = [
            [-1, -2, -1],
            [0, 0, 0],
            [1, 2, 1]
        ];

        //Se declara un for (bucle) anidado para iterar sobre los píxeles de la imagen (excepto los bordes por eso se empieza con el valor 
          //de x e y en uno) y calcula el gradiente en cada punto utilizando la convolución con las matrices Sobel.
        for (let y = 1; y < this.height - 1; y++) {
            for (let x = 1; x < this.width - 1; x++) {

              // Se calcula el gradiente en las direcciones X e Y
              const gradientX = this.applyConvolution(sobelX, x, y,imageData);
              const gradientY = this.applyConvolution(sobelY, x, y,imageData);

              // Se calcula la magnitud del gradiente
              const magnitude = Math.sqrt(gradientX ** 2 + gradientY ** 2)/ Math.sqrt(2);

              // Se determina el color del píxel según la magnitud del gradiente
              //Si la magnitud supera los 60 se le asigna un valor negro, de lo contrario, si no
              //supera los 60, quedará el color en blanco
              const index = (y * this.width + x) * 4;
              let color=255;
              if(magnitude>60){
                color=0;
              }
              // Se actualizan los valores RGB de los píxeles de la imagen 
              imageData.data[index] = color;
              imageData.data[index + 1] = color;
              imageData.data[index + 2] = color;
              imageData.data[index + 3] = 255; // Alpha
            }
          }
        this.context.putImageData(imageData, 0, 0);
    }

    applyConvolution(kernel, x, y,imageData) {
        let value = 0;
      //La función utiliza dos bucles anidados (for) para recorrer cada elemento de la matriz kernel.
      // La matriz kernel que se declararon tienen dimensiones de 3x3, 
      //por lo que se empieza desde i=0 hasta i=2 y desde j=0 hasta j=2.
        for (let i = 0; i <= 2; i++) {
          for (let j = 0; j <= 2; j++) {
            //Se calcula el índice del píxel en la imagen (pixelIndex) que corresponde a la posición en la convolución.
            //Esto se hace sumando las coordenadas x e y, y los desplazamientos en i y j,
            //multiplicandose por 4 ya que los pixeles de la imagen están en el formato RGBA.
            const pixelIndex = ((y + i) * this.width + (x + j)) * 4;
            const kernelValue = kernel[i][j];
            //Se van sumando los valores obtenidos segun la multiplicación entre el 
            //kernelValue (obtenidos por la posición de i y j) y los valores de imageData.data
            // según la posición de pixelIndex.
            value += imageData.data[pixelIndex] * kernelValue;
          }
        }
        //Se retorna el valor obtenido por los bucles anidados.
        return value;
      }
}
