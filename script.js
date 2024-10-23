let caja = [
    /*    0     1    2   3   4   5   6  7  8    9     10    11    12   13     14*/
        [500, 200, 100, 50, 20, 10,  5, 2, 1, 0.50, 0.20, 0.10, 0.05, 0.02, 0.01 ],// Denominación
        [ 0,   0,   0 , 1 ,  4,  8 , 2, 5 ,4 ,  0 ,  0 ,   1 ,    2 ,  3 ,   1],  //cantidades de billetes
];

let pago = [
    [500, 200, 100, 50, 20, 10, 5, 2, 1, 0.50, 0.20, 0.10, 0.05, 0.02, 0.01 ],// Denominación
    [ 0,   0,   0,  1,  0,   0, 0, 0, 0,   0,    0,    0,   0,     0,    0],  //cantidades de billetes
];

let devolver = [
    [500, 200, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01],
    [  0,  0,   0,   0,  0,  0, 0, 0, 0,  0,   0,   0,    0,   0,    0]
];

let importe = 2.85; //precio del articulo
let valorPago = 0; // Entregado por el cliente
let cambioADevolver = 0; //El cambio que entregamos al cliente


function calculaTotal(efectivo){
    let total = 0.0;
    for(let i = 0; i < efectivo[0].length; i++){
        total += efectivo[0][i]* efectivo[1][i];
    }
    total = parseFloat(total.toFixed(2));
    efectivo[0].push(total);

    return efectivo;
}

function buscar(efectivo, cambio) {
    let pos = 0;
    while (efectivo[0][pos] >= cambio) {
        pos++;
    }
    if(efectivo[0][pos-1] == cambio)
        return pos-1;
    else
        return pos;
}

function hayCambio(efectivo, cambio, posEfectivo){
    let nBilletes = 0;

    while (cambio > 0 && posEfectivo < efectivo[1].length) {
        cambio = parseFloat(cambio.toFixed(2));
        console.log("cambio: " + cambio);
        console.log("pos: " + posEfectivo);
        nBilletes = Math.trunc((cambio / efectivo[0][posEfectivo]));
        console.log('nBilletes: '+nBilletes)
        if (nBilletes <= efectivo[1][posEfectivo] && nBilletes>=1) {
            cambio -= efectivo[0][posEfectivo] * nBilletes;
            devolver[1][posEfectivo] = nBilletes;
            caja[1][posEfectivo] -= nBilletes
            billletesADisposicion(devolver);           
            console.log('devolver: '+devolver[1]);
            posEfectivo = buscar(efectivo, cambio);
        }else{
            posEfectivo++;
        }   
    }
    return cambio == 0;
}

function billletesADisposicion(array){
    let cambio = '';
    for(let i = 0; i < array[1].length; i++){
        if(array[1][i] > 0 && array[0][i] >= 5){
            cambio += '\nBillete de: '+array[0][i]+'€';
            cambio += ' -----> '+array[1][i];
        }else{
            if(array[1][i] > 0 && array[0][i] < 5){
                cambio += '\nMoneda de: '+array[0][i]+'€';
                cambio += ' -----> '+array[1][i];
            }
        }
    }
    return cambio;
}

pago = calculaTotal(pago);
caja = calculaTotal(caja);

if(pago[0][pago[0].length - 1] - importe == 0){ //Pago justo
    alert('importe justo');
}else{
    if((pago[0][pago[0].length - 1] - importe) > caja[0][caja[0].length - 1]){  //Pago mayor a lo que hay a la caja
        alert('No hay cambio disponible');
    }else{
        if(pago[0][pago[0].length - 1] < importe){  //Pago menor al precio del artículo
            alert('Falta dinero para poder comprar');
        }else{                                         // Hay cambio y se devuelve dinero
            // Para sacar del array la cantidad pagada
            for(let i = 0; i < pago[1].length; i++){
                if(pago[1][i] > 0){
                    valorPago += pago[0][i];
                    caja[1][i] += pago[1][i];
                    console.log('Valor de pago: '+valorPago)
                }
            }

            cambioADevolver = valorPago - importe;

            let posCaja = buscar(caja, cambioADevolver);

            if(hayCambio(caja, cambioADevolver, posCaja)){
                let cantidadCaja = '';
                alert('Hay cambio');
                alert('Billetes a devolver: '+billletesADisposicion(devolver));
                caja[0][15] = caja[0][15] + importe;

                cantidadCaja += billletesADisposicion(caja);
                alert('Nuevo valor de caja es: '+caja[0][15]);
                alert('Caja despues de cambio: '+cantidadCaja);
            }else{
                alert('No hay cambio')
            }
        }
    }
}
