/*Ésta es la primera instrucción que se ejecutará cuando el documento esté cargado.
Se hará una llamada a la función iniciar().De esta manera nos aseguramos que las 
asignaciones de eventos no fallarán ya que todos los objetos están disponibles.*/
window.onload = iniciar;

//Variables globales
var formulario;
var camposInput;
var inputfocused; //Variable que guarda el input que tiene el foco
var contador = 0; //Variable para contar el número de intentos de inicio de sesión

/**
 * Esta función asignará todos los eventos para que no fallen 
 * por no estar cargados en el documento
 */
function iniciar() {
    /*Inicialización de eventos de los botones del menú de la página
      El evento de click lo programamos en la fase de burbujeo (false)*/
    document.getElementById("login").addEventListener('click', function () {
        window.location.href = "formulario.html"
    }, false);
    document.getElementById("productos").addEventListener('click', function () {
        window.location.href = "formulario5.html"
    }, false);
    
    /*Al hacer click en el botón de enviar se llamará a la función validar que se encargará
    de validar el formulario.El evento de click lo programamos en la fase de burbujeo (false).*/
    document.getElementById("enviar").addEventListener('click', validar, false);
    document.getElementById("limpiarcampo").addEventListener('click', limpiarCampo, false);
    document.getElementById("reiniciar").addEventListener('click', reiniciarCampos, false);

    formulario = document.getElementById("formulario");
    camposInput = formulario.getElementsByTagName("input");
    /*Se recorren todos los campos inputs para asignarles a cada uno la función inputAmarillo cuando
    cogen el foco (focus), y la función quitarinputAmarillo cuando lo pierden(blur)*/
    for (var i = 0; i < camposInput.length; i++) {
        if (camposInput[i].type == "text" || camposInput[i].type == "password") {
            camposInput[i].addEventListener("focus", inputAmarillo, false);
            camposInput[i].addEventListener("blur", quitarInputAmarillo, false);
        }
    }
    inputfocused = "";
    //Seleccionamos todos los inputs de tipo text y tipo password
    var elements = document.querySelectorAll("input[type='text'],input[type='password']");
    //Recorremos los inputs seleccionados y les asignamos el evento blur(perder el foco)
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("blur", function () {
            // Guardamos la ID del elemento al que hacemos 'focus'
            inputfocused = this;
        });

    }
    /*Borramos la clase resultado del div resultado para que no se muestre el contenedor, ya que, 
    cuando se carga el documento aún no hay ningún dato que mostrar*/
    document.getElementById("resultado").className = "";

    //Cargamos y mostramos el número de intentos que haya guardados
    document.getElementById("intentos").innerHTML = "Número de intentos de creación de usuario: " + recuperarDatos();
}

/**
 * Función que valida los datos introducidos en el formulario
 * @param eventopordefecto Evento por defecto del botón enviar
 * 
 * -Expresión regular nombre:
 * /^[a-zñçA-ZÑáéíóúÁÉÍÓÚ\s]{3,40}$/ Letras de la "a" a la "z", incluyendo "ñ" y "ç", en minúsculas (a-zñç),
 * letras de la "A" a la "Z", incluyendo la "Ñ", en mayúsculas(A-ZÑ), vocales tildadas tanto en mayúsculas 
 * como en minúsculas (áéíóúÁÉÍÓÚ) y espacios en blanco (\s), y entre 3 y 40 caracteres entre todos los citados
 * anteriormente, incluyendo también los espacios en blanco ({3,40})
 *  
 * -Expresión regular apellido:
 * Exactamente igual que nombre, sólo cambia que debe tener entre 4 y 60 caracteres({4,60})
 *  
 * -Expresión regular contraseña:
 *  (?=.*[A-ZÑ]) Al menos una letra mayúscula, incluida la Ñ
 *  (?=.*[áéíóúÁÉÍÓÚ]) Al menos una vocal tildada, mayúscula o minúscula
 *  (?=.*[./$]) Al menos uno de los caracteres ".", "/" o "$"
 *  (?=(?:\D*\d){2,4}$) Entre 2 y 4 números y terminar obligatoriamente en un número
 *  [a-zA-ZáéíóúÁÉÍÓÚñÑç./$\d]{8,16} Todo lo indicado anteriormente entre 8 y 16 caracteres
 *  El requisito de al menos 2 caracteres alfabéticos no lo incluyo específicamente, ya que, 
 *  como obliga a tener al menos una letra mayúscula y una vocal tildada, con eso ya se cumpliría ese requisito
 */
function validar(eventopordefecto) {
    //Flags de control para nombre, apellido y password
    var validoNombre = false;
    var validoApellido = false;
    var validoPassword = false;
    //Esta variable almacenará en una cadena cada mensaje de error encontrado separado cada uno por un salto de línea 
    var errores = "";
    var nombre, apellido, password1, password2;

    nombre = document.getElementById("nombre").value;
    apellido = document.getElementById("apellido").value;
    password1 = document.getElementById("password1").value;
    password2 = document.getElementById("password2").value;

    var regexNombre = /^[a-zñçA-ZÑáéíóúÁÉÍÓÚ\s]{3,40}$/;
    var regexApellido = /^[a-zñçA-ZÑáéíóúÁÉÍÓÚ\s]{4,60}$/;
    var regexPassword = /^(?=.*[áéíóúÁÉÍÓÚ])(?=.*[A-ZÑ])(?=.*[./$])(?=(?:\D*\d){2,4}$)[a-zA-ZáéíóúÁÉÍÓÚñÑç$/.\d]{8,16}$/;
    /*Esta sentencia es para evitar que se envíe el formulario al pulsar en Enviar, 
    ya que es su acción por defecto al ser un botón de tipo submit*/
    eventopordefecto.preventDefault();
    /*Aumentamos en uno el contador de intentos (se almacenará el global de intentos, 
    tanto fallidos como exitosos), si no existiera aún ninguno, se inicializa el contador a 1*/
    contadorIntentos();
    //Guardamos el valor de contador
    localStorage.contador = contador;
    /*Esto es para limpiar el div "intentos", por si se estuviera mostrando alguno anterior, que no aparezca dos veces
    cuando haya un nuevo intento*/
    document.getElementById("intentos").innerHTML = "";
    //Recuperamos los intentos guardados y lo mostramos en el div intentos que se encuentra en formulario.html
    document.getElementById("intentos").innerHTML = "Número de intentos de creación de usuario: " + recuperarDatos();

    //Como hemos inicializado los 3 flags de control a false, entra en este if para comenzar las validaciones
    if (validoNombre === false && validoApellido === false && validoPassword === false) {
        //Si el campo nombre se encuentra vacío
        if (nombre == "") {
            //Guardamos el mensaje de error
            errores += "*El campo nombre no puede estar vacío<br>";
            //Ponemos el campo nombre de color rojo
            document.getElementById("nombre").style.background = "red";

            //Si el nombre no coincide con el patrón
        } else if (!regexNombre.test(nombre)) {
            errores += "*El nombre debe tener entre 3 y 40 caracteres y sólo caracteres alfabéticos y espacios en blanco<br>";
            document.getElementById("nombre").style.background = "red";

            //Si el nombre es correcto, ponemos el campo nombre en verde y ponemos a true el flag de control validoNombre
        } else {
            document.getElementById("nombre").style.background = "green";
            validoNombre = true;
        }

        //Si el campo apellido se encuentra vacío
        if (apellido == "") {
            errores += "*El campo apellido no puede estar vacío<br>";
            document.getElementById("apellido").style.background = "red";

            //Si el apellido no coincide con el patrón
        } else if (!regexApellido.test(apellido)) {
            errores += "*El apellido debe tener entre 4 y 60 caracteres y sólo caracteres alfabéticos y espacios en blanco<br>";
            document.getElementById("apellido").style.background = "red";

            //Si el apellido es correcto, ponemos el campo en verde y pasamos a true el flag de control
        } else {
            document.getElementById("apellido").style.background = "green";
            validoApellido = true;
        }

        //Si alguno de los campos de la contraseña está vacío
        if (password1 == "" || password2 == "") {
            errores += "*La contraseña es obligatoria por duplicado<br>";
            document.getElementById("password1").style.background = "red";
            document.getElementById("password2").style.background = "red";

            //Si la contraseña no coincide con el patrón
        } else if (!regexPassword.test(password1) || !regexPassword.test(password2)) {
            errores += "*La contraseña no es correcta<br>";
            document.getElementById("password1").style.background = "red";
            document.getElementById("password2").style.background = "red";

            //Si las contraseñas no son iguales (la función localCompare devuelve 0 si dos cadenas son iguales)
        } else if (password1.localeCompare(password2) != 0) {
            errores += "*Las contraseñas no coinciden<br>";
            document.getElementById("password1").style.background = "red";
            document.getElementById("password2").style.background = "red";

            //Si la contraseña es correcta, ponemos en verde los campos de la contraseña y pasamos a true el flag de control
        } else {
            document.getElementById("password1").style.background = "green";
            document.getElementById("password2").style.background = "green";
            validoPassword = true;
        }
    }

    /*Borramos del div "errores" cualquier error que se estuviera mostrando previamente, para que no se muestren errores
    de anteriores validaciones que ya se han corregido*/
    document.getElementById("errores").innerHTML = "";
    /*Borramos lo que haya en el div resultado, por si se vuelve a mandar algún dato modificando el formulario y hay
    algún dato incorrecto, que no se muestren los datos que ya se estaban mostrando de la anterior validación del formulario*/
    document.getElementById("resultado").innerHTML = "";
    //Eliminamos la clase resultado para que no se visualice el div resultado
    document.getElementById("resultado").className = "";



    //Si todos los campos del formulario son válidos
    if (validoNombre === true && validoApellido === true && validoPassword === true) {
        //Eliminamos la clase errores del div errores para que no se visualice el div
        document.getElementById("errores").className = "";
        //Le asignamos la clase "resultado", para que se visualice el div que contiene los datos
        document.getElementById("resultado").className = "resultado";

        /*Mostramos los datos introducidos en el formulario*/
        document.getElementById("resultado").innerHTML = "Nombre: " + nombre + "<br>Apellido: " + apellido + "<br>Password: " + password1 + "<br>";
        return true;
        //Si alguno o todos los campos son incorrectos 
    } else {
        //Le asignamos la clase errores al div errores para que se muestre el contenedor de los errores
        document.getElementById("errores").className = "errores";
        //Mostramos los errores en el div con id "errores" que se encuentra en formulario.html
        document.getElementById("errores").innerHTML = errores;
    }
}

/**
 * Función que incrementa el número de intentos de login en uno
 * o bien lo inicializa a 1 si es el primer intento
 */
function contadorIntentos() {
    //Si existe contador se incrementa y si no, se inicializa
    if (localStorage.contador) {
        //Se convierte el contador a entero porque por defecto es una cadena
        localStorage.contador = parseInt(localStorage.contador) + 1;
    } else {
        localStorage.contador = 1;
    }
    contador = localStorage.contador;
}

/**
 * Función que recupera el números de intentos de login que haya guardados
 * @return Devuelve el número de intentos que haya guardados o 0 en caso de que no exista nada guardado
 */
function recuperarDatos() {
    if (localStorage.contador != undefined) {
        return localStorage.contador;
    } else {
        return 0;
    }
}

/**
 * Función que borra el contenido del input que tenga el foco. Se llamará cuando se clique en
 * el botón Limpiar campo
 */
function limpiarCampo() {
    inputfocused.value = "";
}

/**
 * Función que reinicia todos los campos de tipo texto y tipo password del formulario,
 * borrando su contenido y poniéndolos en color blanco, que es su color por defecto.
 * También elimina cualquier error o dato que se esté mostrando en ese momento, menos el número
 * de intentos, que siempre se mostrará
 */
function reiniciarCampos() {
    formulario.reset();
    var inputs = formulario.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "text" || inputs[i].type == "password") {
            inputs[i].style.background = "white";
        }
    }
    document.getElementById("errores").innerHTML = "";
    document.getElementById("errores").className = "";
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("resultado").className = "";
}


/**
 * Función que establece el color de un input a amarillo
 */
function inputAmarillo() {
    this.style.background = "yellow";

}

/**
 * Función que establece el color de un input a blanco
 */
function quitarInputAmarillo() {
    this.style.background = "white";
}
