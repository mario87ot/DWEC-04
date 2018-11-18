# DWEC-04
Tarea 4 Desarrollo Web en Entorno Cliente

Tienda Buy More (Compra Más).

trebory6. Buy More Logo Vector. (Todos los derechos reservados)
En esta tarea vamos a realizar un par de páginas de una web de compra de productos llamada Buy More inspirada en la serie Chuck. Si no la habéis visto no la veáis por si os viciáis en Febrero en medio de los exámenes.
Desde un índice van a colgar de la aplicación web va a tener las siguientes páginas:
    1. Sección de creación de usuario.
    2. Sección de ingreso de categorías.
Cada una de las secciones tendrá una sola página y un archivo JavaScript. Las veremos a continuación en detalle

1. Sección de login de usuario. (6 puntos)
Este ejercicio se va a realizar con la forma anterior a HTML5 de validación de formularios. Esta sección debe disponer de los siguientes campos:
- Nombre. Debe verificarse que el nombre solo dispone de caracteres alfabéticos y espacios para cuando el nombre es compuesto. Al menos tres caracteres de mínimo y 40 de máximo.Es obligatorio y no se puede dejar en blanco.
- Apellido: Debe verificarse que el nombre solo dispone de caracteres alfabéticos y espacios. No puede tener más de 60 caracteres alfabéticos y no menos de 4.
    * Contraseña
        1 - Al menos 8 caracteres. 16 máximo.
        2 - Caracteres alfabéticos(al menos dos).
        3 - Al menos una mayúscula.
        4 - Debe contener un carácter alfabético que sea con acento.
        5 - Sólo puede contener un máximo de 4 dígitos decimales y un mínimo de 2.
        6 - Debe terminar en dígito decimal.
        7 - Obligatoriamente al menos uno de estos caracteres .(punto) /(la barra encima del 7) o $(dólar). 
    * Contraseña de verificación. Debe comprobar que los valores son iguales.
    * Una etiqueta antes de cada campo a rellenar. O sea, nombre antes del campo para rellenar el nombre.
    * Botón Reiniciar. Borra todos los contenidos.
    * Botón Limpiar Campo. Borra el contenido del campo que tenga el foco.
    * Botón Enviar. Al pulsar este botón muestra los datos pedidos o lo errores cometidos. Los datos se van a mostrar en una capa div tal y como se explica al final de este apartado (abajo del todo). Si se ha producido un envío correcto debemos poner en verde el fondo de todos los campo, y en rojo los que tengan un error.
- Al coger el foco en una de las ventanas hay que cambiar el color de fondo a amarillo oscuro. Cuando se pierda el foco debe mantener el anterior.
- Además debe aparecer un contador por cada intento (exitoso o infructuoso) de crear un usuario. Este contador no se hará con cookies, sino que se hará con localStorage.
2. Sección de creación de productos. (3 puntos)
Este ejercicio se va a realizar con la forma de validación de formularios HTML5. Se van a crear items para la venta. No se usa la versión la tarea anterior. Además debe haber un contador de productos
- El nombre del item. Son caracteres alfabéticos, numéricos, espacios y signos de puntuación. Nada más. La longitud será de 6 a 120.
- Descripción será un texto de varias líneas con tamaño limitado hasta 1024 caracteres con las mismas restricciones de características.
- Crear un desplegable que indique la provincia a elegir entre "informática", "alimentación" y "desconocido"
- Botón Enviar. Este botón lo que hace es mostrar los números abajo en una capa div junto con el contador.
- Botón Borrar. Borra todos los contenidos.
Notas:
- No olvidéis añadir las ñ, las ç y los acentos castellanos. No hace falta los acentos abiertos del tipo à. Los tipo ó si se piden.
- Se comentarán las partes de las expresiones regulares utilizadas mediante comentarios.
- Se prohíbe el uso de eventos BOM (tipo onclick). Se utilizarán solo los sistemas aprobados por w3c (Modelo de registro avanzado de eventos según W3C). O sea, con AddEventListener.
- Se prohíbe el uso de jQuery para la realización de la tarea.
- Va a hacerte falta el uso event.preventDefault() para evitar que se envíe la página y se pueda utilizar lo siguiente.
- Para poder actualizar el contenido de un contenedor o div, la propiedad que tenemos que modificar para ese objeto es “innerHTML”.
      <div id="resultado>
       Al actualizar este contenido se borra.</div>
      
<script>
       document.getElementById("resultado").innerHTML="Aquí pones el código que quieres que aparezca en la capa resultado";
      </script>
