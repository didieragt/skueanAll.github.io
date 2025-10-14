let input_sku = document.getElementById('sku');
let btn_buscar = document.getElementById('btn-buscar');
let arrTallas = [];
let card = document.querySelector('.card');
let url_Img = 'https://www.pre.desigual.com/dw/image/v2/BCVV_PRD/on/demandware.static/-/Sites-desigual-m-catalog/default/dw97ce96ee/images/B2C/';
let tbody = document.querySelector('.tabla');
let arrNoencontrado = [];

async function data(sku) {
    try {
        const response = await fetch('./json/all_Master.json');

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        sku.forEach(e => {
            const productoEncontrado = data.filter(item => item.Sku === e);
            if(productoEncontrado.length !== 0){
                let concaUrl = e.slice(0,8)+'_'+e.slice(8,12)+'_X.jpg';
                let img = document.createElement('img');
                img.setAttribute('src', url_Img+concaUrl);
                img.classList.add('imgSku');
                const nuevaFila = document.createElement('tr');
                const celda1 = document.createElement('td');
                const celda2 = document.createElement('td');
                const celda3 = document.createElement('td');
                const celda4 = document.createElement('td');
                const celda5 = document.createElement('td');
                const celda6 = document.createElement('td');
                celda1.textContent = productoEncontrado[0].Sku;
                celda2.textContent = productoEncontrado[0].Cat;
                celda3.textContent = productoEncontrado[0].Temp;
                celda4.textContent = productoEncontrado[0].Gen;
                nuevaFila.appendChild(celda1);
                nuevaFila.appendChild(celda2);
                nuevaFila.appendChild(celda3);
                nuevaFila.appendChild(celda4);
                tbody.appendChild(nuevaFila);
                for (let i = 0; i < productoEncontrado.length; i++) {
                    const tablaTallas = document.createElement('table');
                    const tablaFila = document.createElement('tr');
                    tablaFila.classList.add('tablaEan');
                    const tablaCelda1 = document.createElement('td');
                    const tablaCelda2 = document.createElement('td');
                    tablaCelda1.textContent = productoEncontrado[i].Talla;
                    tablaCelda2.textContent = productoEncontrado[i].EAN;
                    tablaFila.appendChild(tablaCelda1);
                    tablaFila.appendChild(tablaCelda2);
                    tablaTallas.appendChild(tablaFila);
                    celda5.appendChild(tablaTallas)
                    nuevaFila.appendChild(celda5);
                    tbody.appendChild(nuevaFila);
                }
                celda6.appendChild(img);
                nuevaFila.appendChild(celda6);
                tbody.appendChild(nuevaFila);
            } else {
                const nuevaFila = document.createElement('tr');
                const celda1 = document.createElement('td');
                const celda2 = document.createElement('td');
                celda1.textContent = e;
                celda2.textContent = 'Sku No Encontrado';
                nuevaFila.appendChild(celda1);
                nuevaFila.appendChild(celda2);
                nuevaFila.style.color = "red";
                tbody.appendChild(nuevaFila);
            }
        });

    }   catch (error) {
            console.error('Error al leer el archivo JSON:', error);
        }
}

btn_buscar.addEventListener('click', () => {
    tbody.innerHTML='';
    let sku = input_sku.value;
    let p = document.createElement('p');
    sku = sku.toUpperCase();
    if(sku == ''){
        const existeP = card.querySelector('p.listado-vacio');
        if (!existeP) {
            const p = document.createElement('p');
            p.textContent = 'Listado Vacio';
            p.classList.add('listado-vacio');
            tbody.appendChild(p);
        }
    } else{
        formatData(sku);
        }
    p.value = '';
    input_sku.value='';
});

function formatData(skus){
    const array = skus.split("\n");
    let arrSkucolor = array.map(e => e.slice(0,12));
    arrSkucolor = [...new Set(arrSkucolor)];
    arrSkucolor = arrSkucolor.filter(item => item && item.trim());
    data(arrSkucolor);
}