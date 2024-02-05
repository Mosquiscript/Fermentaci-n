  // Import the functions you need from the SDKs you need
  /* import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js"; */
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBNHTW8vnwUDIG9f_P0GQWPgAJP8g_lIU0",
    authDomain: "fermentacion-5c78c.firebaseapp.com",
    projectId: "fermentacion-5c78c",
    storageBucket: "fermentacion-5c78c.appspot.com",
    messagingSenderId: "585347927450",
    appId: "1:585347927450:web:986ffb8e7468c814a5be23"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
  const db = firebase.firestore();

  const DivUltimaActualizacion = document.getElementById("DivUltimaActualizacion");
  const tablaFermentacion1 = document.getElementById("tabla");
  const tablaPulmones = document.getElementById("TablaPulmones");
  const tablaFermentacion2 = document.getElementById("TablaFermentacion2");

  function CrearTabla(tablaReferencia, cantidadTinas, tablaReferenciaNombre) {
    for (let index = 1; index < cantidadTinas; index++) {
      // Inserta una fila en la tabla, en el índice 0
      var newRow = tablaReferencia.insertRow(index); 
      // Inserta una celda en la fila, en el índice 0
      var newCell = newRow.insertCell(0);
      var newCell2 = newRow.insertCell(1);
      var newCell3 = newRow.insertCell(2);
      // Añade un nodo de texto a la celda
      var newText = document.createTextNode(index);
      newCell.appendChild(newText);
      // Añade un nodo de texto a la celda
      var newDiv = document.createElement("div");
      newDiv.setAttribute("id", `DivVolumen${tablaReferenciaNombre}(${index})`);
      newDiv.innerHTML = 0;
      newCell3.appendChild(newDiv);
      var x = document.createElement("INPUT");
      x.setAttribute("type", "numb");
      x.setAttribute("placeholder", "Vacio");
      x.setAttribute("onchange", `CalcularVolumenTinas${tablaReferenciaNombre}(${index})`);
      x.setAttribute("id", `InputVacio${tablaReferenciaNombre}(${index})`);
      newCell2.appendChild(x);
    }
  }

  function SolicitarDatosFireBase() {
    db.collection("Fermentacion1").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          document.getElementById(`InputVacioFermentacion1(${doc.data().numeroTina})`).value = doc.data().vacio;
          document.getElementById(`DivVolumenFermentacion1(${doc.data().numeroTina})`).innerHTML = doc.data().volumen;
        });
    });
    db.collection("Fermentacion2").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          document.getElementById(`InputVacioFermentacion2(${doc.data().numeroTina})`).value = doc.data().vacio;
          document.getElementById(`DivVolumenFermentacion2(${doc.data().numeroTina})`).innerHTML = doc.data().volumen;
        });
    });
    db.collection("Pulmones").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          document.getElementById(`InputVacioPulmones(${doc.data().numeroTina})`).value = doc.data().vacio;
          document.getElementById(`DivVolumenPulmones(${doc.data().numeroTina})`).innerHTML = doc.data().volumen;
        });
    });
    db.collection("UltimaActualizacion").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          DivUltimaActualizacion.innerHTML = doc.data().fechaHora;
        });
    });
  }

  function ActualizarDatosFireBase(tablaReferencia, numeroTinaActualizado, vacioActualizado, volumenActualizado) {
  
        let tablaRef = db.collection(tablaReferencia);
        tablaRef.doc(`Tina${numeroTinaActualizado}`).set({vacio: vacioActualizado, volumen: volumenActualizado, numeroTina: numeroTinaActualizado});

  }

  function CalcularVolumenTinasFermentacion1(index) {
    let vacio = document.getElementById(`InputVacioFermentacion1(${index})`);
    let volumen = (610 - vacio.value) * 116.41 + 2250;
    let volumenDiv = document.getElementById(`DivVolumenFermentacion1(${index})`);
    volumenDiv.innerHTML = volumen;
    ActualizarDatosFireBase("Fermentacion1", index, vacio.value, volumen);
    UltimaHoraDeActualizacionTablas();
  }

  function CalcularVolumenTinasPulmones(index) {
    var vacio = document.getElementById(`InputVacioPulmones(${index})`);
    let volumen = (610 - vacio.value) * 105.2 + 2034;
    let volumenDiv = document.getElementById(`DivVolumenPulmones(${index})`);
    volumenDiv.innerHTML = volumen;
    ActualizarDatosFireBase("Pulmones", index, vacio.value, volumen);
    UltimaHoraDeActualizacionTablas();
  }

  function CalcularVolumenTinasFermentacion2(index) {
    var vacio = document.getElementById(`InputVacioFermentacion2(${index})`);
    let volumen = (610 - vacio.value) * 116.41 + 2250;
    let volumenDiv = document.getElementById(`DivVolumenFermentacion2(${index})`);
    volumenDiv.innerHTML = volumen;
    ActualizarDatosFireBase("Fermentacion2", index, vacio.value, volumen);
    UltimaHoraDeActualizacionTablas();
    
  }

  function UltimaHoraDeActualizacionTablas(){
    let now = new Date();
    DivUltimaActualizacion.innerHTML = now;
    let tablaRef = db.collection("UltimaActualizacion");
    tablaRef.doc("FH").set({fechaHora: DivUltimaActualizacion.textContent});
  }

  CrearTabla(tablaFermentacion1, 25, "Fermentacion1");
  CrearTabla(tablaPulmones, 4, "Pulmones");
  CrearTabla(tablaFermentacion2, 13, "Fermentacion2");
  SolicitarDatosFireBase();
  

  

