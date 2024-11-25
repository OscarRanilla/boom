//PRIMERO CAPTURAR LOS IDS QUE TENEMOS EN EL HTML (ELEMENTOS DEL DOM)
//HACEMOS LAS RESPECTIVAS VARIABLES PARA PODER TRAERLAS 
const userInput = document.getElementById("userInput");
const countdownElemento = document.getElementById("countdown");
const resultElemento = document.getElementById("result");
const restartButton = document.getElementById("restart");

//SEGUNDO HACEMOS LA FUNCION PARA GENERAR UN NUMERO ALEATORIO ENTRE 1 Y 3 
function generarNumeroAleatorio() {
    return Math.floor(Math.random() * 3) + 1;
}

//TERCERO HACEMOS LA FUNCION PARA INICIAR LA CUENTA ATRAS
function iniciarCuentaAtras() {
    return new Promise((resolve) => {
        let contador = 5;
        countdownElemento.textContent = `Cuenta atrás: ${contador} segundos`;

        //USAMOS EL setInterval(() para generar el contador de 5 segundos
        const interval = setInterval(() => {
            contador--;
            countdownElemento.textContent = `Cuenta atrás: ${contador} segundos`;
            countdownElemento.className = "contador-color";
            if (contador === 0) {
                clearInterval(interval);
                resolve();
            }
        }, 1000);
    });
}

//CUARTO HACEMOS LA FUNCION PARA EVALUAR EL RESULTADO
function evaluarResultado() { 
    const numeroUsuario = parseInt(userInput.value); 
    const numeroAleatorio = generarNumeroAleatorio(); 
    // Limpiar el contenido previo 
    resultElemento.innerHTML = ""; 
    // Crear elementos div para los mensajes 
    const mensajePrincipal = document.createElement("div"); 
    const mensajeNumeros = document.createElement("div"); 
    if (numeroUsuario === numeroAleatorio) { 
        mensajePrincipal.textContent = `Enhorabuena, has salvado el mundo 👑`; 
        mensajePrincipal.className = "success-message"; 
        
        mensajeNumeros.textContent = `Tu número: ${numeroUsuario} es el mismo que el número: ${numeroAleatorio}`; 
        mensajeNumeros.className = "same-number"; 
    } else { 
        mensajePrincipal.textContent = `La bomba ha estallado.`; 
        mensajePrincipal.className = "wrong-message"; 
        
        mensajeNumeros.textContent = `Tu número: ${numeroUsuario} no es el mismo que el número: ${numeroAleatorio}`; 
        mensajeNumeros.className = "result-message"; } 
        // Añadir los mensajes al contenedor principal 
        resultElemento.appendChild(mensajePrincipal); 
        resultElemento.appendChild(mensajeNumeros); 
}

//QUINTO FUNCION PRINCIPAL PARA INICAR EL JUEGO
function iniciarJuego() {
    resultElemento.textContent = "";
    iniciarCuentaAtras().then(() => {
        evaluarResultado();
    });
}

//SEXTO HACEMOS EL EVENTO PARA INICIAR EL JUEGO CUANDO EL USUAURIO INTRODUCE UN NUMERO
userInput.addEventListener("change", iniciarJuego);
//COLOCAMOS EL "CHANGE" CADA VEZ QUE CLIKEMOS PARA CAMBIAR EL RESULTADO AL INICIAR EL JUEGO

//SEPTIMO HACEMOS EL EVENTO PARA REINICIAR EL JUEGO
restartButton.addEventListener("click", () => {
    location.reload();
});

