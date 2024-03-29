// Constructores

function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year =  year;
    this.tipo = tipo;
}
// realiza cotización
Seguro.prototype.cotizarSeguro =  function(){
    /*
    1 = MOTO 1
    2 = AUTO 2
    3= SCOOTER 3
    */
   let cantidad;
   const base = 2000;

   switch(this.marca){
    case '1':
            cantidad = base * 1;
            break;
    case '2':
            cantidad = base * 2;
            break;
    case '3':
            cantidad = base * 3;
            break;
    default:
        break;
   }
    // leer año
    const diferencia = new Date().getFullYear() - this.year;
    // cada año que pasó, se reduce el costo del seguro
    cantidad -= ((diferencia * 3) * cantidad)/100;
    /*
    Si el seguro es básico se multiplica por un 20% mas.
    Si el seguro es completo se multiplica por un 40% mas.
    */
   if(this.tipo === 'basico'){
       cantidad *= 1.20;
   }else{
        cantidad *= 1.40;
   }

   return cantidad;
}

function UI(){  }

UI.prototype.llenarOpciones = () =>{
    const max = new Date().getFullYear(),
          min = max -20;
    
    const selectYear = document.querySelector('#year');

    for(let i = max; i>min; i--){
        let option =  document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

// mueatra alertas

UI.prototype.mostrarMensaje = (mensaje,tipo) => {
    const div = document.createElement('div');
    if(tipo === 'error'){
        div.classList.add('mensaje','error');
    }else{
        div.classList.add('mensaje','correcto');
    }
    
    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;
    // insertar en html
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 2000);
}

UI.prototype.mostrarResultado = (total,seguro) =>{

    const {marca, year, tipo} = seguro;
    let txtMarca;
    switch(marca){
        case '1':
            txtMarca = 'MOTO';
            break;
        case '2':
            txtMarca = 'AUTO';
            break;   
        case '3':
            txtMarca = 'SCOOTER';
            break;
        default:
            break;
    }

    // crear el resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
    <p class='header'> Tu Resumen </p>
    <p class='font-bold'> Marca: <span class='font-normal'> ${txtMarca}</span> </p>
    <p class='font-bold'> Año: <span class='font-normal'> ${year}</span> </p>
    <p class='font-bold'> Tipo: <span class='font-normal capitalize'> ${tipo}</span> </p>
    <p class='font-bold'> Total: <span class='font-normal'> $${total}</span> </p>

        `;
    const resultadoDiv = document.querySelector('#resultado');
    

    // mostrar spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';
    setTimeout(() => {
        spinner.style.display = 'none';
        // se borra el spinner y se muestra el resultado
        resultadoDiv.appendChild(div);
    }, 2000);

}
// Instanciar UI
const ui = new UI();


document.addEventListener('DOMContentLoaded', ()=>{
    ui.llenarOpciones();
});

eventListeners();

function eventListeners(){
    
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();

    // leer marca seleccionada
    const marca = document.querySelector('#marca').value;
    // leer año seleccionado
    const year = document.querySelector('#year').value;
    // leer tipo cobertura
    const tipo = document.querySelector('input[name=tipo]:checked').value;

    if(marca === '' || year === '' || tipo === ''){
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }
    ui.mostrarMensaje('Cotizando...', 'exito');
    // ocultar cotizaciones previas
    const resultados = document.querySelector('#resultado div');
    if(resultados != null){
        resultados.remove();
    }
    // instanciar seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();
    // use prototype que va a cotizar
    ui.mostrarResultado(total, seguro);


}

