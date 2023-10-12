// Juego para elegir una mascota y pelear contra la computadora

let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

function iniciarJuego(){
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
    sectionSeleccionarAtaque.style.display = 'none'

    let sectionReiniciar = document.getElementById('reiniciar');
    sectionReiniciar.style.display = 'none';

    let botonMascotaJugador = document.getElementById('boton-mascota');
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);

    let btnFuego = document.getElementById('boton-fuego');
    btnFuego.addEventListener('click', ataqueFuego);

    let btnAgua = document.getElementById('boton-agua');
    btnAgua.addEventListener('click', ataqueAgua);

    let btnTierra = document.getElementById('boton-tierra');
    btnTierra.addEventListener('click', ataqueTierra);

    let  botonReiniciar = document.getElementById('boton-reiniciar')
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador(){
    let inputLeviathan = document.getElementById('leviathan');
    let inputMinotaur = document.getElementById('minotaur');
    let inputIfrit = document.getElementById('ifrit');
    let spanMascotaJugador = document.getElementById('mascota-jugador');

    // Hace aparecer la sección de ataque
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
    sectionSeleccionarAtaque.style.display = 'flex'

    // Hace desaparecer la sección de seleccionar mascota
    let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');
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
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo');


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
    
    let mensaje = document.getElementById('resultado');
    let ataqueDelJugador = document.getElementById('ataques-del-jugador');
    let ataqueDelEnemigo = document.getElementById('ataques-del-enemigo');
 
    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    mensaje.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;
   
    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal){
    let mensaje = document.getElementById('resultado');
    mensaje.innerHTML = resultadoFinal;
    
    let btnFuego = document.getElementById('boton-fuego');
    btnFuego.disabled = true;

    let btnAgua = document.getElementById('boton-agua');
    btnAgua.disabled = true;

    let btnTierra = document.getElementById('boton-tierra');
    btnTierra.disabled = true;

    let sectionReiniciar = document.getElementById('reiniciar');
    sectionReiniciar.style.display = 'block';
   
}

//agua 1 tierra 2 fuego 3
function batalla(){
   
    let spanVidasJugador = document.getElementById('vidas-jugador');
    let spanVidasEnemigo = document.getElementById('vidas-enemigo');

    if(ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO' || ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA' || 
    ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA' ){
        crearMensaje( "GANASTE 👍");
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
        
    } else if(ataqueJugador == ataqueEnemigo){
        crearMensaje( "EMPATE 😑");
   
    } else {
        crearMensaje("PERDISTE 😞");
        vidasJugador --;
        spanVidasJugador.innerHTML = vidasJugador;
      
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


