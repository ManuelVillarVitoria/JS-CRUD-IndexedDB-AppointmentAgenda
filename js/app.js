let DB;

//Selectores de la Interfaz
const form = document.querySelector('form'),
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
        //console.log ('Hubo un error');
    }
    //Si todo está bien muestra en consola, y asignar la base de datos
    crearDB.onsuccess = function() {
        //console.log ('Todo listo');

        //Asignar a la base de Datos
        DB = crearDB.result;
        //console.log(DB);
    }

    //Este método solo se corre una vez, y es ideal para crear el Schema.
    crearDB.onupgradeneeded = function(e) {
        //console.log ('Solo una vez');
        //El evento(e) es la misma base de datos
        let db = e.target.result;

        //Definir el ObjectStore, el cual toma 2 parámetros(el nombre de 
        //la base datosy las opciones)
        //keyPath es el índice de la base de datos
        let objectStore = db.createObjectStore('citas', {keyPath: 'key', autoIncrement: true});

        //Crear los índices y campos de la base de datos con 'createIndex', que tiene
        // 3 parámetros(nombre,keyPath y opciones)
        objectStore.createIndex('mascota','mascota',{unique: false});
        objectStore.createIndex('cliente','cliente',{unique: false});
        objectStore.createIndex('telefono','telefono',{unique: false});
        objectStore.createIndex('fecha','fecha',{unique: false});
        objectStore.createIndex('hora','hora',{unique: false});
        objectStore.createIndex('sintomas','sintomas',{unique: false});
    }

    //Leer e insertar los datos del formulario cuando se envía
    form.addEventListener('submit',agregarDatos);

    function agregarDatos(e) {
        e.preventDefault();

        //crear un objeto para insertar los registros
        const nuevaCita = {
            mascota : nombreMascota.value,
            cliente : nombreCliente.value,
            telefono : telefono.value,
            fecha : fecha.value,
            hora : hora.value,
            sintomas : sintomas.value
        }
        //console.log(nuevaCita)

        //Insertar la información en IndexedDB mediante transacciones
        let transaction = DB.transaction(['citas'],'readwrite');
        let objectStore = transaction.objectStore('citas');
        //console.log(objectStore);
        let peticion = objectStore.add(nuevaCita);

        console.log(peticion);

        peticion.onsuccess = () => {
            form.reset();
        }

        transaction.oncomplete = () => {
            console.log('Cita agregada');
        }

        transaction.onerror = () => {
            console.log('Hubo un error');
        }
    
    }
})