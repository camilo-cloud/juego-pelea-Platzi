// Juego para elegir una mascota y pelear contra la computadora

const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const sectionReiniciar = document.getElementById('reiniciar');
const botonMascotaJugador = document.getElementById('boton-mascota');
const botonReiniciar = document.getElementById('boton-reiniciar')


const spanMascotaJugador = document.getElementById('mascota-jugador');
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');

const spanMascotaEnemigo = document.getElementById('mascota-enemigo');

const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');

const mensaje = document.getElementById('resultado');
const ataqueDelJugador = document.getElementById('ataques-del-jugador');
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo');

const contenedorTarjetas = document.getElementById('contenedor-tarjetas')

const contenedorAtaques = document.getElementById('contenedor-ataques');

let mokepones = [];
let opcionDeMokepones;
let inputLeviathan 
let inputMinotaur
let inputIfrit 
let mascotaJugador;
let ataqueJugador;
let ataqueEnemigo;
let ataquesMoquepon;
let btnFuego;
let btnAgua;
let btnTierra;
let botones = [];
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

mokepones.push(leviathan,minotaur,ifrit)


// Funciones

function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = 'none'

    // Recorrer el array e inyectar los Mokepones al html

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
            <label for=${mokepon.nombre} class="tarjeta-de-mokepon">
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones;

        inputLeviathan = document.getElementById('Leviathan');
        inputMinotaur = document.getElementById('Minotauro');
        inputIfrit = document.getElementById('Ifrit');
    });
    
    sectionReiniciar.style.display = 'none';

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);

    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador(){  
    // Hace aparecer la sección de ataque
    sectionSeleccionarAtaque.style.display = 'flex'

    // Hace desaparecer la sección de seleccionar mascota
    sectionSeleccionarMascota.style.display = 'none'

    if(inputLeviathan.checked){
        spanMascotaJugador.innerHTML = inputLeviathan.id;
        mascotaJugador = inputLeviathan.id
    }else if (inputMinotaur.checked){
        spanMascotaJugador.innerHTML = inputMinotaur.id;
        mascotaJugador = inputMinotaur.id
    } else if (inputIfrit.checked){
        spanMascotaJugador.innerHTML = inputIfrit.id;
        mascotaJugador = inputIfrit.id
    }else{
        alert("Selecciona una mascota");
        reiniciarJuego();       
    }

    extraerAtaques(mascotaJugador);
    seleccionarMascotaEnemigo();
}

function extraerAtaques(mascotaJugador){
    let ataques;
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }  
    }
    
    mostrarAtaques(ataques);   
}

function mostrarAtaques(ataques){  
    ataques.forEach((ataque) => {
        ataquesMoquepon = `
        <button id=${ataque.id} class="boton-ataque BAtaque">${ataque.nombre} </button>
        
        `
        contenedorAtaques.innerHTML += ataquesMoquepon;
    })

     // Seleccionar botones luego de crearlos
    btnFuego = document.getElementById('boton-fuego');
    btnAgua = document.getElementById('boton-agua');
    btnTierra = document.getElementById('boton-tierra');

    //En este caso está seleccionando una clase no un id, por eso va así. (Los id no se pueden repetir, por eso se usa una clase en este caso)
    botones = document.querySelectorAll('.BAtaque');

    // Agregar evento a los botones
    btnFuego.addEventListener('click', ataqueFuego);
    btnAgua.addEventListener('click', ataqueAgua);
    btnTierra.addEventListener('click', ataqueTierra);
}

function secuenciaAtaque(){
    
}

function seleccionarMascotaEnemigo(){
    let mascotaAleatorio =  aleatorio(0, mokepones.length - 1);
  
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre
    
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


