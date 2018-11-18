/*Ésta es la primera instrucción que se ejecutará cuando el documento esté cargado.
Se hará una llamada a la función iniciar().De esta manera nos aseguramos que las 
asignaciones de eventos no fallarán ya que todos los objetos están disponibles.*/
window.onload = iniciar;

//Variabe global para llevar la cuenta total del número de intentos de creación de productos, tanto válidos como fallidos
var contador2 = 0;

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
    //Al iniciarse la página, recuperamos el número de intentos guardados y lo mostramos
    document.getElementById("resultado").innerHTML = "Número de intentos de creación de producto: " + recuperarDatos();
}

/**
 * Función que valida los campos del formulario de creación de productos. Aunque en este ejercicio
 * he usado validaciones de html5, he incluido también algunas validaciones con javascript,
 * por si el navegador no mostrara bien algún error con html5 o, como en el caso del textarea,
 * porque no acepta el atributo pattern para verificar el formato. 
 
 * La categoría no se valida porque no existe la posibilidad de no seleccionar ninguna opción, ya que,
 * Por defecto, si el usuario no selecciona ninguna opción, estará seleccionada la categoría "Informática"
 *
 * Expresión regular Descripción:
 * /^[a-zA-ZáéíóúÁÉÍÓÚñÑç0-9\.\-;,:?¿!¡\s]{1,1024}$/ Letra minúscula(a-z), letra mayúscula (A-Z), letra ñ(ñ), letra Ñ mayúscula(Ñ), 
 * números entre 0 y 9(0-9), punto(\.), guion(\-), punto y coma(;), coma(,), dos puntos(:), signos de interrogación(?¿), signos de
 * exclamación (¡!), espacio en blanco(\s), entre 1 y 1024 caracteres ({1024})
 */
function validar(eventopordefecto) {

    var nombre, descripcion;
    var errores = "";
    var regexDescripcion = /^[a-zA-ZáéíóúÁÉÍÓÚñÑç0-9\.\-;,:?¿!¡\s]{1,1024}$/;
    var formulario = document.getElementById("formulario");
    nombre = document.getElementById("nombre").value;
    descripcion = document.getElementById("descripcion").value;

    //Aumentamos el contador de intentos en uno si existe contador, y si no, se inicializa a 1 al ser el primer intento
    contadorIntentos();
    //Guardamos el valor de contador
    localStorage.contador2 = contador2;
    //Mostramos el número de intentos que haya guardados
    document.getElementById("resultado").innerHTML = "Número de intentos de creación de producto: " + recuperarDatos();
    //Limpiamos el div errores para que no se muestren errores que estén mostrándose de alguna validación anterior que ya se haya corregido
    document.getElementById("errores").innerHTML = "";

    /*Si el formulario tiene algún dato erróneo(que esté validado con html5), se sale de la función. Esto lo he añadido 
    porque no encontraba la forma de que no se enviara el formulario cuando había algún dato 
    erróneo validado con html5, y así, a priori, parece que funciona*/
    if (!formulario.checkValidity()) {
        return false;
        //Si no, introducimos algunas validaciones con javascript por si acaso
    } else {
        //Si el nombre está vacío
        if (nombre === "") {
            errores += "*El campo nombre no puede estar vacío<br>";
            //Le asignamos la clase errores al div "errores" para que se muestre el contenedor de los errores
            document.getElementById("errores").className = "errores";
            //Mostramos los errores en el div "errores" que se encuentra en formulario5.html
            document.getElementById("errores").innerHTML = errores;

            //Si el campo descripción está vacío
        } else if (descripcion === "") {
            errores += "*El campo descripción no puede estar vacío<br>";
            document.getElementById("errores").className = "errores";
            document.getElementById("errores").innerHTML = errores;

            //Si la descripción no coincide con el patrón
        } else if (!regexDescripcion.test(descripcion)) {
            errores += "*El campo descrición debe tener caracteres alfanuméricos, números, signos de puntuación y un máximo de 1024 caracteres<br>";
            document.getElementById("errores").className = "errores";
            document.getElementById("errores").innerHTML = errores;

            //Si todo es correcto, eliminamos la clase "errores" del div errores para que no se muestre el div
        } else {
            alert("¡Datos correctos!");
            document.getElementById("errores").className = "";

        }

    }

    eventopordefecto.preventDefault();
}

/**
 * Función que incrementa el número de intentos de creación de producto en uno
 * o bien lo inicializa a 1 si es el primer intento
 */
function contadorIntentos() {
    // Si existe contador se incrementa y sino se inicializa
    if (localStorage.contador2) {
        // Se convierte el contador a entero porque por defecto es una cadena
        localStorage.contador2 = parseInt(localStorage.contador2) + 1;
    } else {
        localStorage.contador2 = 1;
    }
    contador2 = localStorage.contador2;
}

/**
 * Función que recupera el números de intentos de creación de productos que haya guardados
 * @return Devuelve el número de intentos que haya guardados o 0 en caso de que no exista nada guardado
 */
function recuperarDatos() {
    if (localStorage.contador2 != undefined) {
        return localStorage.contador2;
    } else {
        return 0;
    }
}
