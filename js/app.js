//Especificaciones
/* El usuario podrá crear/ eliminar/ ver sus tweets en un listado 
Los tweets se almacenarán en Local storage 
El usuario podrá agregar una cantidad ilimitada de tweets 
Al cargar la página los tweets deben cargarse de Local Storage 
Al eliminarse cualquiera de los tweets deben quitarse de Local Storage */

const listaTweets = document.getElementById("lista-tweets");
const formulario = document.querySelector("#formulario");
const txtTweet = document.getElementById("tweet");

// Arreglo de tweets
let arregloTweets = [];

// Cuando se hace clic en AGREGAR
formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    const tweet = txtTweet.value;
    agregarElemento(tweet);
    agregarTweetLocalStorage(tweet);
});

// Para eliminar tweets
listaTweets.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.className === "borrar-tweet") {
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
        console.log(e.target.parentElement.innerText);
    }
});

// Agregar tweet a localstorage
function agregarTweetLocalStorage(tweet) {
    arregloTweets = obtenerTweetsLocalStorage()
    arregloTweets.push(tweet);
    // Agrego al localstorage
    localStorage.setItem("tweets", JSON.stringify(arregloTweets));
}

function obtenerTweetsLocalStorage() {
    let tweetsTemporal;
    // Vamos a revisar los valores del localstorage
    if (localStorage.getItem("tweets") === null) {
        tweetsTemporal = []
    }
    else {
        tweetsTemporal = JSON.parse(localStorage.getItem("tweets"));
    }
    return tweetsTemporal;
}

// Este evento se llama cuando la página se carga
document.addEventListener("DOMContentLoaded", function (e) {
    e.preventDefault();
    arregloTweets = obtenerTweetsLocalStorage();
    arregloTweets.forEach(function (tweet) {
        agregarElemento(tweet);
    });
})

function agregarElemento(mensaje) {
        // Crear botón de eliminar
        const botonBorrar = document.createElement("a");
        botonBorrar.classList = "borrar-tweet";
        botonBorrar.innerText = "X"
    
        // Crear un elemento de lista y lo voy a añadir a listaTweets
        const elemento = document.createElement("li");
        elemento.innerHTML = mensaje;
        elemento.appendChild(botonBorrar);
        listaTweets.appendChild(elemento);
}


function borrarTweetLocalStorage(mensaje) {
    let tweetBorrar = mensaje.substring(0, mensaje.length - 1);
    arregloTweets = obtenerTweetsLocalStorage();
    arregloTweets.forEach(function (mensaje, index) {
        if (tweetBorrar === mensaje) {
            arregloTweets.splice(index, 1);
        }
    });
    localStorage.setItem("tweets", JSON.stringify(arregloTweets));
}


