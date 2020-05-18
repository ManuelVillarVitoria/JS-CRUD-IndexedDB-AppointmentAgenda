let DB;

//Selectores de la Interfaz
const form = document.querySelector('#form'),
      nombreMascota = document.querySelector('#mascota'),
      nombreCliente = document.querySelector('#cliente'),
      telefono = document.querySelector('#telefono'),
      fecha = document.querySelector('#fecha'),
      hora = document.querySelector('#hora'),
      sintomas = document.querySelector('#sintomas'),
      citas = document.querySelector('#citas'),
      headingAdministra = document.querySelector('#administra');


//Esperar por le DOM Ready
document.addEventListener('DOMContentLoaded',() => {
    //Crear la base de datos
    //Los parámetros son el nombre de la base de datos y el 
    //número es la versión(siempre ha de ser un número entero)
    let crearDB = window.indexedDB.open('citas', 1); 

    //Si hay un error enviarlo a la consola
    crearDB.onerror = function() {
        console.log ('Hubo un error');
    }
    //Si todo está bien muestra en consola, y asignar la base de datos
    crearDB.onsuccess = function() {
        console.log ('Todo listo');

        //Asignar a la base de Datos
        DB = crearDB.result;
        console.log(DB);
    }
    
})