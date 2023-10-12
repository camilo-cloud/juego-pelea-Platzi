// Juego para elegir una mascota y pelear contra la computadora

const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const sectionReiniciar = document.getElementById('reiniciar');
const botonMascotaJugador = document.getElementById('boton-mascota');
const btnFuego = document.getElementById('boton-fuego');
const btnAgua = document.getElementById('boton-agua');
const btnTierra = document.getElementById('boton-tierra');
const botonReiniciar = document.getElementById('boton-reiniciar')

const inputLeviathan = document.getElementById('leviathan');
const inputMinotaur = document.getElementById('minotaur');
const inputIfrit = document.getElementById('ifrit');
const spanMascotaJugador = document.getElementById('mascota-jugador');
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');

const spanMascotaEnemigo = document.getElementById('mascota-enemigo');

const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');

const mensaje = document.getElementById('resultado');
const ataqueDelJugador = document.getElementById('ataques-del-jugador');
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo');

let mokepones = [];
let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

//Construyendo clases de Mokepones

class Mokepon {
    constructor(nombre, foto, vida){
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
    }
}

let leviathan = new Mokepon('Leviathan', 'images/leviathan.png', 5);
let minotaur = new Mokepon('Minotauro','images/minotaur.png', 5);
let ifrit = new Mokepon('Ifrit', 'images/ifrit.png', 5);

// Ataques
leviathan.ataques.push(
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌾', id: 'boton-tierra'},
);

minotaur.ataques.push(
    {nombre: '🌾', id: 'boton-tierra'},
    {nombre: '🌾', id: 'boton-tierra'},
    {nombre: '🌾', id: 'boton-tierra'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'}
);    

ifrit.ataques.push(
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌾', id: 'boton-tierra'},
);

// mokepones.push(leviathan,minotaur,ifrit)

// Funciones

function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none';

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);

    btnFuego.addEventListener('click', ataqueFuego);
    btnAgua.addEventListener('click', ataqueAgua);
    btnTierra.addEventListener('click', ataqueTierra);

    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador(){  
    // Hace aparecer la sección de ataque
    sectionSeleccionarAtaque.style.display = 'flex'

    // Hace desaparecer la sección de seleccionar mascota
    sectionSeleccionarMascota.style.display = 'none'

    if(inputLeviathan.checked){
        spanMascotaJugador.innerHTML = "Leviathan";
    }else if (inputMinotaur.checked){
        spanMascotaJugador.innerHTML = "Minotaur";
    } else if (inputIfrit.checked){
        spanMascotaJugador.innerHTML = "Ifrit";
    }else{
        alert("Selecciona una mascota");
        reiniciarJuego();       
    }

    seleccionarMascotaEnemigo();
}

function seleccionarMascotaEnemigo(){
    let mascotaAleatorio =  aleatorio(1,3);

    if(mascotaAleatorio == 1){
        spanMascotaEnemigo.innerHTML = "Leviathan";
    } else if(mascotaAleatorio == 2){
        spanMascotaEnemigo.innerHTML = "Minotaur";
    } else{
        spanMascotaEnemigo.innerHTML = "Ifrit";
    }
}

function ataqueFuego(){  
    ataqueJugador = 'FUEGO'
    // alert(`Elegiste el ataque ${ataqueJugador}`);
    ataqueDelEnemigo();
}

function ataqueTierra(){
    ataqueJugador = 'TIERRA';
    // alert(`Elegiste el ataque ${ataqueJugador}`);
    ataqueDelEnemigo();
}

function ataqueAgua(){
    ataqueJugador = 'AGUA';
    // alert(`Elegiste el ataque ${ataqueJugador}`);
    ataqueDelEnemigo();
}

function ataqueDelEnemigo(){
    let ataqueAleatorio =  aleatorio(1,3);
    if(ataqueAleatorio == 1){
        ataqueEnemigo = 'FUEGO'
        // alert(`El enemigo eligió el ataque ${ataqueEnemigo}`);
    } else if(ataqueAleatorio == 2){
        ataqueEnemigo = 'TIERRA'
        // alert(`El enemigo eligió el ataque ${ataqueEnemigo}`);
    } else{
        ataqueEnemigo = 'AGUA'
        // alert(`El enemigo eligió el ataque ${ataqueEnemigo}`);
    }

    batalla();
}

function crearMensaje(resultado){
     
    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    mensaje.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;
   
    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal){
    mensaje.innerHTML = resultadoFinal;
    
    btnFuego.disabled = true;

    btnAgua.disabled = true;

    btnTierra.disabled = true;

    sectionReiniciar.style.display = 'block';
   
}

//agua 1 tierra 2 fuego 3
function batalla(){
   
    if(ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO' || ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA' || 
    ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA' ){
        crearMensaje( "GANASTE 👍");
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo + " Vidas";
        
    } else if(ataqueJugador == ataqueEnemigo){
        crearMensaje( "EMPATE 😑");
   
    } else {
        crearMensaje("PERDISTE 😞");
        vidasJugador --;
        spanVidasJugador.innerHTML = vidasJugador + " Vidas";
    }

    revisarVidas();
}

function revisarVidas(){
    if(vidasEnemigo == 0){
        crearMensajeFinal("Felicitaciones, GANASTE EL JUEGO COMPLETO");
    } else if (vidasJugador == 0){
        crearMensajeFinal("Lo sentimos, PERDISTE EL JUEGO COMPLETO");
    }
}

function reiniciarJuego(){
    location.reload();
}

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Todo comienza cuando se halla cargado todo el HTML. Es para colocar el script en el head
window.addEventListener('load', iniciarJuego);


