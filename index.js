const express = require("express"); // Importamos expressjs para poder usarlo
const cors = require("cors");

const app = express();  // Creamos una aplicación

app.use(cors());  // Deshabilitar errores relacionados con cor
app.use(express.json()) // recibir peticiones POST en formato JSON

const jugadores = [];

class Jugador {
    constructor(id){
        this.id = id;
    }
    asignarMokepon(mokepon){
        this.mokepon = mokepon;
    }
    actualizarPosición(x, y){
        this.x = x;
        this.y = y;
    }
}
class Mokepon {
    constructor(nombre){
        this.nombre = nombre
    }
}


// 
app.get("/unirse", (req, res)=>{
    const id = `${Math.random()}` // id como cadena de texto

    const jugador = new Jugador(id);
    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(id); // responder
})

app.post("/mokepon/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.mokepon || ""
    const mokepon = new Mokepon(nombre)
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    
    if(jugadorIndex >= 0){
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }
    
    console.log(jugadores)
    console.log(jugadorId)
    res.end()
})

app.post("/mokepon/:jugadorId/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    
    if(jugadorIndex >= 0){
        jugadores[jugadorIndex].actualizarPosición(x, y);
    }

    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)

    res.send({
        enemigos
    });
    
})



// que escuche las peticiones de los clientes todo el tiempo en el puerto 8080
app.listen(8080, ()=>{
    console.log("Servidor funcionando");
});

