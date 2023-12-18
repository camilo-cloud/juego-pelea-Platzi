// Juego para elegir una mascota y pelear contra la computadora
// AGUA > FUEGO ....  FUEGO > TIERRA ... TIERRA > AGUA

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

const sectionVerMapa = document.getElementById('ver-mapa');
const mapa = document.getElementById('mapa'); 

let mokepones = [];
let opcionDeMokepones;
let inputLeviathan 
let inputMinotaur
let inputIfrit 
let mascotaJugador;
let mascotaJugadorObjeto;
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
let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = './images/mokemap.webp'
let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth - 20;
const anchoMaximoDelMapa = 350;

if(anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20;
}

alturaQueBuscamos = anchoDelMapa * 600 / 800;

mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos


//Construyendo clases de Mokepones

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa){
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
        this.ancho = 40;
        this.alto = 40;
        this.x = aleatorio(0, mapa.width - this.ancho);
        this.y = aleatorio(0, mapa.height - this.alto);
        this.mapaFoto = new Image();
        this.mapaFoto.src = fotoMapa;
        this.velocidadX = 0;
        this.velocidadY = 0;
    }
    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho, 
            this.alto, 
        );
    }
}

let leviathan = new Mokepon('Leviathan', 'images/leviathan.png', 5, 'images/leviathanFace.png');
let minotaur = new Mokepon('Minotauro','images/minotaur.png', 5,'images/minotaurFace.png');
let ifrit = new Mokepon('Ifrit', 'images/ifrit.png', 5,'images/ifritFace.png');

let leviathanEnemigo = new Mokepon('Leviathan', 'images/leviathan.png', 5, 'images/leviathanFace.png');
let minotaurEnemigo = new Mokepon('Minotauro','images/minotaur.png', 5,'images/minotaurFace.png');
let ifritEnemigo = new Mokepon('Ifrit', 'images/ifrit.png', 5,'images/ifritFace.png');

// Ataques
leviathan.ataques.push(
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌾', id: 'boton-tierra'},
);

leviathanEnemigo.ataques.push(
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
minotaurEnemigo.ataques.push(
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
ifritEnemigo.ataques.push(
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
    sectionVerMapa.style.display = 'none'

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
     // Sección encargada del mapa
    sectionVerMapa.style.display = 'flex';
    iniciarMapa();
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
            if(e.target.textContent==='🔥'){
                ataqueJugador.push('FUEGO');
                console.log(ataqueJugador);
                boton.style.background = '#112f58';
                boton.disabled = true;
            } else if (e.target.textContent === '💧' ){
                ataqueJugador.push('AGUA');
                console.log(ataqueJugador);
                boton.style.background = '#112f58'
                boton.disabled = true;
            } else {
                ataqueJugador.push('TIERRA');
                console.log(ataqueJugador);
                boton.style.background = '#112f58'
                boton.disabled = true;
            }
            ataqueDelEnemigo(); 
        })
    })
}

function seleccionarMascotaEnemigo(enemigo){
    // let mascotaAleatorio =  aleatorio(0, mokepones.length - 1);
  
    spanMascotaEnemigo.innerHTML = enemigo.nombre;
    ataquesMokeponEnemigo = enemigo.ataques;
    secuenciaAtaque();
}

function ataqueDelEnemigo(){
    let ataqueAleatorio =  aleatorio(0, ataquesMokeponEnemigo.length - 1);
    
    // Esto es para que el ataque del enemigo se elija del array de ataques de enemigo 
    // y no que se le asigne cualquiera al azar

    let ataque = ataquesMokeponEnemigo[ataqueAleatorio].nombre;
    ataquesMokeponEnemigo.splice(ataqueAleatorio, 1);
    
    if (ataque == "🔥") {
    ataqueEnemigo.push("FUEGO");
    } else if (ataque == "💧") {
        ataqueEnemigo.push("AGUA");
    } else {
        ataqueEnemigo.push("TIERRA");
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

    sectionReiniciar.style.display = 'block';
}

function indexAmbosOponentes(jugador, enemigo, emojiJugador,emojiEnemigo){
    indexAtaqueJugador = ataqueJugador[jugador] + emojiJugador;
    indexAtaqueEnemigo = ataqueEnemigo[enemigo] + emojiEnemigo;
}

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

function pintarCanvas(){

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;
    
    lienzo.clearRect(0,0, mapa.width, mapa.height);

    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    );
    mascotaJugadorObjeto.pintarMokepon();
    leviathanEnemigo.pintarMokepon();
    minotaurEnemigo.pintarMokepon();
    ifritEnemigo.pintarMokepon();
    
    if(mascotaJugadorObjeto.velocidadX !==0 || mascotaJugadorObjeto.velocidadY !== 0){
        revisarColision(minotaurEnemigo);
        revisarColision(leviathanEnemigo);
        revisarColision(ifritEnemigo);
    }
}

function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5;
}

function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5;
}

function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = 5;
}

function moverArriba(){
    mascotaJugadorObjeto.velocidadY = -5;
}

function detenerMovimiento(){
    
    mascotaJugadorObjeto.velocidadX = 0;
    mascotaJugadorObjeto.velocidadY = 0;
}

function sePresionoUnaTecla(event){
    switch (event.key) {
        case 'ArrowUp':
            moverArriba();
            break;
        case 'ArrowDown':
            moverAbajo();
            break;
        case 'ArrowLeft':
            moverIzquierda();
            break;          
        case 'ArrowRight':
            moverDerecha();
            break;   
        default:
            break;
    }
}

function iniciarMapa(){
    
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50);

    // Para mover el pokemon con las teclas
    window.addEventListener('keydown', sePresionoUnaTecla);
    window.addEventListener('keyup', detenerMovimiento);
}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre){
            return mokepones[i];
        }  
    }
}
function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y;
    const abajoEnemigo = enemigo.y + enemigo.alto;
    const izquierdaEnemigo = enemigo.x;
    const derechaEnemigo = enemigo.x + enemigo.ancho;

    const arribaMascota = mascotaJugadorObjeto.y;
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
    const izquierdaMascota = mascotaJugadorObjeto.x;
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
    if(
        abajoMascota < arribaEnemigo || 
        arribaMascota > abajoEnemigo || 
        derechaMascota < izquierdaEnemigo||
        izquierdaMascota > derechaEnemigo
        ){
            return
    }
    detenerMovimiento();
    clearInterval(intervalo);
    sectionSeleccionarAtaque.style.display = 'flex';
    sectionVerMapa.style.display = 'none';
    seleccionarMascotaEnemigo(enemigo);
}
// Todo comienza cuando se halla cargado todo el HTML. Es para colocar el script en el head
window.addEventListener('load', iniciarJuego);


