//constructor para seguros
function Seguro(marca, año, tipo){
    this.marca = marca;
    this.año = año;
    this.tipo = tipo;
    this.cotizarSeguro = function(){
        const base = 2000;
        let cantidad;

        if(this.marca === '1'){
            cantidad = base * 1.15;
        }else if(this.marca === '2'){
            cantidad = base * 1.05;
        }else if(this.marca === '3'){
            cantidad = base * 1.35;
        }

        //cada año de diferencia hay que reducir 3% el precio del seguro
        const diferencia = new Date().getFullYear() - this.año;
        cantidad -= ((diferencia * 3) * cantidad) / 100;

        //si el seguro es basico se multiplica * 30%
        //si el seguro es completo se multiplica * 50%
        if(this.tipo === 'basico'){
            cantidad *= 1.30;
        }else{
            cantidad *= 1.50;
        }

        return cantidad.toFixed(2);

    }
    
}

//todo lo que se muestra
function Interfaz(){
    this.mostrarMensaje = function(mensaje, tipo){
        const div = document.createElement('div');
        
        if(tipo === 'error'){
            div.classList.add('mensaje', 'error');
        }else{
            div.classList.add('mensaje', 'correcto');
        }

        div.innerHTML = `${mensaje}`;
        //insertamos el div en el formulario
        formulario.insertBefore(div, document.querySelector('.form-group'));

        setTimeout(function(){
            document.querySelector('.mensaje').remove();
        }, 2000);
    }

    this.mostrarResultado = function(seguro, total){
        const resultado = document.getElementById('resultado');
        let marca;
        if(seguro.marca === '1'){
            marca = 'Americano';
        }else if(seguro.marca === '2'){
            marca = 'Asiatico';
        }else if(seguro.marca === '3'){
            marca = 'Europeo';
        }

        const resultados = document.querySelector('#resultado div');
        if(resultados != null){
            resultados.remove();
        }
        
        const div = document.createElement('div');
        div.innerHTML = `
            <p class='header'>Tu resumen</p>
            <p>Marca: ${marca}</p>
            <pAño: ${seguro.año}</p>
            <p>Tipo: ${seguro.tipo}</p>
            <p>Total: $ ${total}</p>
        `;

        const spinner = document.querySelector('#cargando img');
        spinner.style.display = 'block';
        setTimeout(function(){
            resultado.appendChild(div);
            spinner.style.display = 'none';
        }, 2000);
    }
}

//event listeners
const formulario = document.getElementById('cotizar-seguro');
formulario.addEventListener('submit', function(e){
    e.preventDefault();
    //lee la marca seleccionada
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

    //lee el año seleccionado
    const año = document.getElementById('anio');
    const añoSeleccionado = año.options[año.selectedIndex].value;

    //lee el valor del radio button
    const tipo = document.querySelector('.form-check-label input[name="tipo"]');
    const tipoSeleccionado = tipo.value;

    //crear instancia de interfaz
    const interfaz = new Interfaz();

    //revisamos que los campos no esten vacios
    if(marcaSeleccionada === '' || añoSeleccionado === '' || tipoSeleccionado === ''){
        //interfaz imprimiendo un error
        interfaz.mostrarMensaje('faltan datos, revisar el formulario e intenta de nuevo', 'error')
    }else{
        //instanciando la clase seguro
        const seguro = new Seguro(marcaSeleccionada, añoSeleccionado, tipoSeleccionado);
        
        //cotizar el seguro
        const cantidad = seguro.cotizarSeguro();

        //mostrar el resultado
        interfaz.mostrarResultado(seguro, cantidad);

        interfaz.mostrarMensaje('Calculando...', 'correcto')
    }

})

//muestro todos los años en el select
const max = new Date().getFullYear(), 
      min = max - 24;

const selectAños = document.getElementById('anio');
for(let i = max; i > min; i--){
    let option = document.createElement('option');
    selectAños.appendChild(option);
    option.value = i;
    option.innerHTML = i;
}
