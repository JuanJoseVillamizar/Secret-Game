//Manera de cambiar texto pero es mejor crear una funcion cuando se repite mucho

/*
const titulo = document.querySelector('h1');
titulo.textContent = 'Juego del numero secreto';

const parrafo = document.querySelector('p');
parrafo.textContent = 'Indica un número';

*/

let numeroSecreto;
let valorInput = document.querySelector('#numUsuario');
const intentarNuevamente = document.querySelector('#reiniciar');
const intentar = document.querySelector('.container__boton');
let contador = 7;
let intentos = 1;
let juegoTerminado = false;
let listaNumerosAleatorios = [];
const numeroMaximo = 100;

//Agrega texto a un elemento segun su selector y texto
function asignarTextoElemento (elemento, texto) {
    const titulo = document.querySelector(elemento);
    titulo.textContent = texto;
    return;
} 

// Genera un numero aleatorio entre 0 y 100
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;

    if(listaNumerosAleatorios.length == numeroMaximo){
        asignarTextoElemento('p','Ya se sortearon todos los numeros posibles')
    }
    else {
        if (listaNumerosAleatorios.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        }else{
            listaNumerosAleatorios.push(numeroGenerado);
            return numeroGenerado;
        }
    }

}
// Maneja el los intentos del usurio al tratar de adivinar un numero
function intentoUsuario(){
    if (juegoTerminado){
        return;
    }
    contador--;
    numeroIniciales();

    let numeroDeUsuario = parseInt(valorInput.value);
    if (numeroDeUsuario === numeroSecreto){
        asignarTextoElemento('p', `Felicidades el numero era ${numeroSecreto} lo adivinaste en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}`)
        juegoTerminado = true;
        DeshabilitarBotones('disabled','disabled')
        return;
    }
    if (contador === 0){
        asignarTextoElemento('p', `Haz fallado el numero era ${numeroSecreto} y tuviste ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}`)
        DeshabilitarBotones('disabled','disabled')
        juegoTerminado = true;
        return;
    }
    else if (numeroDeUsuario > numeroSecreto){ 
        asignarTextoElemento('p', 'El numero es menor')
    }
    else{
        asignarTextoElemento('p', 'El numero es mayor')
    }

    intentos++;
    limpiarInput()


}
// Limpia el input
function limpiarInput(){
    valorInput.value = '';
    return;
}

// Agrega el evento para cuando se pulsa enter
function eventoEnter() {
    valorInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            intentoUsuario();
        }
    })
}

// Deshabilita el boton intentar y habilita el boton para reiniciar el juego
function DeshabilitarBotones(nuevoJuego, intentar1) {
    intentarNuevamente.removeAttribute(nuevoJuego);
    intentar.setAttribute(intentar1, '');
}
// Deshabilita el boton para reiniciar el juego y habilita el boton para intentar
function habilitarBotones(nuevoJuego, intentar1) {
    intentarNuevamente.setAttribute(nuevoJuego, '');
    intentar.removeAttribute(intentar1);
}

// Establece las condiciones iniciales para el juego
function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto')
    asignarTextoElemento('p', `Debes adivinar un número de 1 a ${numeroMaximo}`)    //Generar numero aleatorio
    numeroSecreto= generarNumeroSecreto();
    console.log(numeroSecreto);
    // Desabilitar boton nuevo juego
    habilitarBotones('disabled','disabled');
    // Reiniciar numero de intentos
    intentos = 1;
    // Reiniciar contador
    contador = 7;
    numeroIniciales();
    // Reiniciar juego terminado
    juegoTerminado = false;
}
// Actualiza el conador de intentos restantes
function numeroIniciales() {
    asignarTextoElemento('h2', `intentos restantes : ${contador}`)
}

// Reinicia el juego a las condiciones iniciales
function reiniciarJuego() {
    // Limpiar caja
    limpiarInput();
    // Mensajes de bienvenida
    condicionesIniciales();

}
numeroIniciales();
condicionesIniciales()
eventoEnter();
