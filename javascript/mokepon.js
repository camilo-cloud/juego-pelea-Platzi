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
let ataqueJugador = [];
let ataqueEnemigo = [];
let ataquesMokepon;
let ataquesMokeponEnemigo;
let btnFuego;
let btnAgua;
let btnTierra;
let botones = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;
let victoriasJugador = 0;
let victoriasEnemigo = 0;

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
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-ataque BAtaque">${ataque.nombre}</button>
        
        `
        contenedorAtaques.innerHTML += ataquesMokepon;
    })

     // Seleccionar botones luego de crearlos
    btnFuego = document.getElementById('boton-fuego');
    btnAgua = document.getElementById('boton-agua');
    btnTierra = document.getElementById('boton-tierra');

    //En este caso está seleccionando una clase no un id, por eso va así. (Los id no se pueden repetir, por eso se usa una clase en este caso)
    botones = document.querySelectorAll('.BAtaque');

   
}

function secuenciaAtaque(){
    botones.forEach((boton)=>{
        boton.addEventListener('click', (e) => {
            console.log(e.target.textContent);
            if(e.target.textContent==='🔥'){
                ataqueJugador.push('FUEGO');
                console.log(ataqueJugador);
                boton.style.background = '#112f58'
            } else if (e.target.textContent === '💧' ){
                ataqueJugador.push('AGUA');
                console.log(ataqueJugador);
                boton.style.background = '#112f58'
            } else {
                ataqueJugador.push('TIERRA');
                console.log(ataqueJugador);
                boton.style.background = '#112f58'
            }
            ataqueDelEnemigo(); 
        })
    })
    
}

function seleccionarMascotaEnemigo(){
    let mascotaAleatorio =  aleatorio(0, mokepones.length - 1);
  
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatorio].ataques

    secuenciaAtaque();
}

function ataqueDelEnemigo(){
    let ataqueAleatorio =  aleatorio(0, ataquesMokeponEnemigo.length - 1);
    
    if(ataqueAleatorio == 0 || ataqueAleatorio == 1){
        ataqueEnemigo.push('FUEGO');
        // alert(`El enemigo eligió el ataque ${ataqueEnemigo}`);
    } else if(ataqueAleatorio == 3 || ataqueAleatorio == 4){
        ataqueEnemigo.push('TIERRA');
        // alert(`El enemigo eligió el ataque ${ataqueEnemigo}`);
    } else{
        ataqueEnemigo.push('AGUA');
        // alert(`El enemigo eligió el ataque ${ataqueEnemigo}`);
    }
    console.log(ataqueEnemigo);
    iniciarPelea();
}

function iniciarPelea(){
    if(ataqueJugador.length === 5){
        batalla();
    }
}


function crearMensaje(resultado){
     
    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    mensaje.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;
   
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

function indexAmbosOponentes(jugador, enemigo, emojiJugador,emojiEnemigo){
    indexAtaqueJugador = ataqueJugador[jugador] + emojiJugador;
    indexAtaqueEnemigo = ataqueEnemigo[enemigo] + emojiEnemigo;
}

//agua 1 tierra 2 fuego 3

function batalla(){

    for (let i = 0; i < ataqueJugador.length; i++) {
        if(ataqueJugador[i] === ataqueEnemigo[i]){
            indexAmbosOponentes(i, i, "🟡","🟡" )
            crearMensaje( "EMPATE 😑");
        }else if(ataqueJugador[i] == 'AGUA' && ataqueEnemigo[i] == 'FUEGO' || ataqueJugador[i] == 'TIERRA' && ataqueEnemigo[i] == 'AGUA' || 
         ataqueJugador[i] == 'FUEGO' && ataqueEnemigo[i] == 'TIERRA' ){
            indexAmbosOponentes(i, i, "✅", "❌")
            crearMensaje( "GANASTE 👍");
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador + " Victorias";
        }else{
            indexAmbosOponentes(i, i, "❌", "✅")
            crearMensaje("PERDISTE 😞"); 
            victoriasEnemigo++;
            spanVidasEnemigo.innerHTML = victoriasEnemigo + " Victorias";;
        }
    }
    revisarVidas();
}

function revisarVidas(){
    if(victoriasJugador === victoriasEnemigo){
        crearMensajeFinal("Esto fue un EMPATE");
    } else if (victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("Felicitaciones, GANASTE. Marcador: " + victoriasJugador + " a " + victoriasEnemigo);
    } else {
        crearMensajeFinal("Lo sentimos, PERDISTE. Marcador: " + victoriasEnemigo + " a " + victoriasJugador );
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


