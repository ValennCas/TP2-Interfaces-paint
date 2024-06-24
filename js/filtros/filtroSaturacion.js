class FiltroSaturacion extends Filtro{
    constructor(context,width,height, saturacion){
        super(context,width,height);
        this.saturacion=saturacion;
        console.log(saturacion);
    }
    doAplicarFiltro(imageData){
        //Se itera sobre los datos de píxeles 
        //(suma a pixel 4 ya que cada pixel tiene 4 elementos: rojo(r), verde(g), azul(b) y alfa(no es modificado en 
        //este filtro por eso no se guarda en una variable)).
        for (let pixel = 0; pixel < imageData.data.length; pixel += 4) {
            // Se convierten los valores RGB a HSL (Matiz, Saturación, Luminosidad) para poder ajustar la saturación.
            //se divide cada color por 255 para obtener valores en el rango de 0 a 1.
            const r = imageData.data[pixel+0] / 255;
            const g = imageData.data[pixel + 1] / 255;
            const b = imageData.data[pixel + 2] / 255;
            
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            
            //Se calcula la luminosidad (l) como el promedio entre max y min.
            let h, s, l = (max + min) / 2;
            
            if (max === min) {
                h = s = 0;
            } 
            else {
                const d = max - min;
                if(l > 0.5){
                    s=d / (2 - max - min);
                }
                else{
                    s=d / (max + min);
                }
                //Se calcula el matiz (h) dependiendo del valor máximo entre r, g y b.
                switch (max) {
                    case r:
                        let suma=0;
                        if(g<b){
                            suma=6;
                        }
                        h = (g - b) / d + suma;
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                }
                h /= 6;
            }
            
            // Se ajusta la saturación multiplicando el valor de s por el factor de saturación
            s *= this.saturacion;
            
            // Se convierte de HSL a RGB
            let rNew, gNew, bNew;
            if (s === 0) {
                rNew = gNew = bNew = l;
            } 
            else {
                let q;
                if(l < 0.5){
                    q=l * (1 + s);
                }
                else{
                    q=l + s - l * s;
                }
                let p = 2 * l - q;
                rNew = this.convertirRGB(p, q, h + 1 / 3);
                gNew = this.convertirRGB(p, q, h);
                bNew = this.convertirRGB(p, q, h - 1 / 3);
            }
            //Se actualizan los datos de píxeles con los nuevos valores RGB
            //multiplicados por 255 para volver al rango de 0 a 255
            imageData.data[pixel+0] = rNew * 255;
            imageData.data[pixel + 1] = gNew * 255;
            imageData.data[pixel + 2] = bNew * 255;
        }
        this.context.putImageData(imageData,0,0);
    }
            
    // Función auxiliar para convertir HSL a RGB
    convertirRGB(p, q, h) {
        if (h < 0){
            h += 1;
        };
        if (h > 1){
            h -= 1;
        };
        if (h < 1 / 6) {
            return p + (q - p) * 6 * h;
        }
        if (h < 1 / 2){
            return q;
        }
        if (h < 2 / 3){
         return p + (q - p) * (2 / 3 - h) * 6;
        }
        return p;
    }
}