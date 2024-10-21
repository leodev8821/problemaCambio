let caja = [
    [500, 200, 100, 50, 20, 10,  5, 2, 1, 0.50, 0.20, 0.10, 0.05, 0.02, 0.01 ],// Denominación
    [ 0,   0,   0 , 1 ,  4,  8 , 2, 5 ,4 ,  0 ,  0 ,   1 ,    2 ,  3 ,   1],  //cantidades de billetes
];

let pago = [
    [500, 200, 100, 50, 20, 10, 5, 2, 1, 0.50, 0.20, 0.10, 0.05, 0.02, 0.01 ],// Denominación
    [ 0,   0,   0,  1,  0,   0, 0, 0, 0,   0,    0,    0,   0,     0,    0],  //cantidades de billetes
];

let devolver = [
    [500, 200, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

let importe = 5; //precio del articulo

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

function hayCambio(efectivo, cambio){
    let posCaja = buscar(caja, cambio);
    let nBilletes = 0;

    while (cambio > 0 && posCaja < efectivo[1].length) {
        console.log("cambio: " + cambio);
        console.log("pos: " + posCaja);
        nBilletes = Math.trunc((cambio / efectivo[0][posCaja]));
        console.log('nBilletes: '+nBilletes)
        if (nBilletes <= efectivo[1][posCaja] && nBilletes>=1) {
            cambio -= efectivo[0][posCaja] * nBilletes;
            posCaja = buscar(efectivo, cambio);
        }else{
            posCaja++;
        }   
    }
    return cambio == 0;
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
        }else{
            if(hayCambio(caja, 45)){
                alert('Hay cambio')
            }else{
                alert('No hay cambio')
            }
        }
    }
}
