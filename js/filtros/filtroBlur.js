class FiltroBlur extends Filtro{
    constructor(context,width,height){
        super(context,width,height);
    }

    doAplicarFiltro(imageData){
        const weights = [
            1, 2, 1,
            2, 4, 2,
            1, 2, 1
        ];
        const factor = 1 / 16;

        //Se itera por los pixeles de la imagen
        for (let i = 0; i < imageData.data.length; i += 4) {
            let r = 0, g = 0, b = 0;
            //Se recorren los 9 píxeles alrededor del píxel actual (3x3),
            //calculando sus coordenadas en base al índice actual y el desplazamiento.
            for (let j = 0; j < 9; j++) {
                // Calcular las coordenadas x e y del píxel en el vecindario
                const x = i + (j % 3) * 4 - 4;  // Coordenada x del píxel en el vecindario
                const y = (Math.floor(j / 3) - 1) * this.width * 4;  // Coordenada y del píxel en el vecindario

                 // Asegura de no acceder a píxeles fuera de los límites de la imagen
                let pixelIndex =i;
                if(x + y >= 0){
                    pixelIndex=x+y;
                }
                 // Acumular los componentes RGB multiplicados por un valor de la matriz weights
                r += imageData.data[pixelIndex] * weights[j];
                g += imageData.data[pixelIndex + 1] * weights[j];
                b += imageData.data[pixelIndex + 2] * weights[j];
            }
            // Aplicar el factor de normalización y sesgo(sirve para ajustar los nuevos valores de RGB
            // para mantenerlos dentro de un rango válido), y asignar los nuevos valores al píxel actual
            imageData.data[i] = r * factor;
            imageData.data[i + 1] = g * factor;
            imageData.data[i + 2] = b * factor;
        }
        this.context.putImageData(imageData,0,0);
    }
}