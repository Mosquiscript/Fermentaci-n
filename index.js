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
  const tablaFermentacion = document.getElementById("tabla");
  const tablaPulmones = document.getElementById("TablaPulmones");
  const arraySelectOpcionStatusTinas  = ["MF", "MM", "JF", "SUCIA", "LAVADA", "LAVADO", "COLAS", "CARGANDO COLAS", "CARGANDO", "CASI SE TERMINA", "LIBERADA"];
  let enviarStatusObjecto = ["Tinas.    Status."];
  

  function CrearTabla(tablaReferencia, cantidadTinas, tablaReferenciaNombre) {
    for (let index = 1; index < cantidadTinas; index++) {
      // Inserta una fila en la tabla, en el índice 0
      var newRow = tablaReferencia.insertRow(index); 
      // Inserta una celda en la fila, en el índice 0
      var newCell = newRow.insertCell(0);
      var newCell2 = newRow.insertCell(1);
      var newCell3 = newRow.insertCell(2);
      var newCell4 = newRow.insertCell(3);
      if (tablaReferenciaNombre == "Pulmones") {
        var newCell5 = newRow.insertCell(4);
        var newCell6 = newRow.insertCell(5);
        var newCell7 = newRow.insertCell(6);

        var input1 = document.createElement("input");
        input1.setAttribute("type", "numb");
        input1.setAttribute("class", "inputTablaPulmones");
        input1.setAttribute("placeholder", "R.A");
        input1.setAttribute("onchange", `ActualizarInputTablaPulmones(${index})`);
        input1.setAttribute("id", `inputTablaRAPulmones${index}`);
        var input2 = document.createElement("input");
        input2.setAttribute("type", "numb");
        input2.setAttribute("class", "inputTablaPulmones");
        input2.setAttribute("placeholder", "Lote");
        input2.setAttribute("onchange", `ActualizarInputTablaPulmones(${index})`);
        input2.setAttribute("id", `inputTablaLotePulmones${index}`);
        var input3 = document.createElement("input");
        input3.setAttribute("type", "numb");
        input3.setAttribute("class", "inputTablaPulmones");
        input3.setAttribute("placeholder", "Tina Dest.");
        input3.setAttribute("onchange", `ActualizarInputTablaPulmones(${index})`);
        input3.setAttribute("id", `inputTablaTinaDestPulmones${index}`);
  
        newCell5.appendChild(input1);
        newCell6.appendChild(input2);
        newCell7.appendChild(input3);
      }
      // Añade un nodo de texto a la celda
      var newText = document.createTextNode(index);
      newCell.appendChild(newText);
      // Añade un nodo de texto a la celda
      var newDiv = document.createElement("div");
      newDiv.setAttribute("id", `DivVolumen${tablaReferenciaNombre}${index}`);
      newDiv.innerHTML = 0;
      newCell3.appendChild(newDiv);
      var x = document.createElement("input");
      x.setAttribute("type", "numb");
      x.setAttribute("class", "inputTabla");
      x.setAttribute("placeholder", "Vacio");
      x.setAttribute("onchange", `CalcularVolumenTinas${tablaReferenciaNombre}(${index})`);
      x.setAttribute("id", `InputVacio${tablaReferenciaNombre}${index}`);
      newCell2.appendChild(x);
      let newSelect = document.createElement("select");
      newSelect.setAttribute("onchange", `ActualizarStatusSelect${tablaReferenciaNombre}(${index})`);
      newSelect.setAttribute("id", `SelectStatus${tablaReferenciaNombre}${index}`);
      newSelect.setAttribute("class", `selectStatus`);
      for (let index = 0; index < arraySelectOpcionStatusTinas.length; index++) {
        let newOption = document.createElement("option");
        newOption.value = arraySelectOpcionStatusTinas[index];
        newOption.text = arraySelectOpcionStatusTinas[index];
        newSelect.appendChild(newOption);
        
      }
      newCell4.appendChild(newSelect);
     
    }
  }

  function SolicitarDatosFireBase() {
    db.collection("Fermentacion").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          /* console.log(doc.id, " => ", doc.data()); */
          document.getElementById(`InputVacioFermentacion${doc.data().numeroTina}`).value = doc.data().vacio;
          document.getElementById(`DivVolumenFermentacion${doc.data().numeroTina}`).innerHTML = doc.data().volumen;
          document.getElementById(`SelectStatusFermentacion${doc.data().numeroTina}`).text = doc.data().status;
          document.getElementById(`SelectStatusFermentacion${doc.data().numeroTina}`).value = doc.data().status;
          enviarStatusObjecto.push(`${doc.data().numeroTina}. - ${doc.data().status}.
`);
        });
    });
    db.collection("Pulmones").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          /* console.log(doc.id, " => ", doc.data()); */
          document.getElementById(`InputVacioPulmones${doc.data().numeroTina}`).value = doc.data().vacio;
          document.getElementById(`DivVolumenPulmones${doc.data().numeroTina}`).innerHTML = doc.data().volumen;
          document.getElementById(`SelectStatusPulmones${doc.data().numeroTina}`).text = doc.data().status;
          document.getElementById(`SelectStatusPulmones${doc.data().numeroTina}`).value = doc.data().status;
          document.getElementById(`inputTablaTinaDestPulmones${doc.data().numeroTina}`).value = doc.data().TinaDestilando;
          document.getElementById(`inputTablaRAPulmones${doc.data().numeroTina}`).value = doc.data().RA;
          document.getElementById(`inputTablaLotePulmones${doc.data().numeroTina}`).value = doc.data().Lote;
          enviarStatusObjecto.push(`Pulmon${doc.data().numeroTina}. - ${doc.data().TinaDestilando} - L${doc.data().Lote} - ${doc.data().status}.
`);
          console.log(enviarStatusObjecto);

        });
    });
    db.collection("UltimaActualizacion").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          /* console.log(doc.id, " => ", doc.data()); */
          DivUltimaActualizacion.innerHTML = doc.data().fechaHora;
        });
    });
    
  }

  function ActualizarDatosTinasFireBase(tablaReferencia, numeroTinaActualizado, vacioActualizado, volumenActualizado, statusActualizado, RAActualizado, LoteActualizado, TinaDestActualizado) {

    if (tablaReferencia == "Pulmones") {
      let tablaRefPulmones = db.collection("Pulmones");
        tablaRefPulmones.doc(`${numeroTinaActualizado}`).set({vacio: vacioActualizado, volumen: volumenActualizado, numeroTina: numeroTinaActualizado, status: statusActualizado, RA: RAActualizado, Lote: LoteActualizado, TinaDestilando:  TinaDestActualizado});
    } else {
      let tablaRefFermentacion = db.collection("Fermentacion");
        tablaRefFermentacion.doc(`${numeroTinaActualizado}`).set({vacio: vacioActualizado, volumen: volumenActualizado, numeroTina: numeroTinaActualizado, status: statusActualizado});
    }  
  }

  function CalcularVolumenTinasFermentacion(index) {
    let vacio = document.getElementById(`InputVacioFermentacion${index}`);
    let selectStatus = document.getElementById(`SelectStatusFermentacion${index}`);
    let volumen;
    if(index <= 25){
      volumen = (610 - vacio.value) * 116.41 + 2250;
      
    }else{
      volumen = (610 - vacio.value) * 115.81 + 1853;
  
    }
    let volumenDiv = document.getElementById(`DivVolumenFermentacion${index}`);
    volumenDiv.innerHTML = volumen.toFixed(2);
    ActualizarDatosTinasFireBase("Fermentacion", index, vacio.value, volumen, selectStatus.value);
    UltimaHoraDeActualizacionTablas();
  }

  function CalcularVolumenTinasPulmones(index) {
    let vacio = document.getElementById(`InputVacioPulmones${index}`);
    let selectStatus = document.getElementById(`SelectStatusPulmones${index}`);
    let volumen = (610 - vacio.value) * 105.2 + 2034;
    let volumenDiv = document.getElementById(`DivVolumenPulmones${index}`);
    volumenDiv.innerHTML = volumen.toFixed(2);
    ActualizarDatosTinasFireBase("Pulmones", index, vacio.value, volumen, selectStatus.value);
    UltimaHoraDeActualizacionTablas();
  }

  function ActualizarStatusSelectFermentacion(index) {
    let vacio = document.getElementById(`InputVacioFermentacion${index}`);
    let volumenDiv = document.getElementById(`DivVolumenFermentacion${index}`);
    let selectStatus = document.getElementById(`SelectStatusFermentacion${index}`);
    ActualizarDatosTinasFireBase("Fermentacion", index, vacio.value, volumenDiv.innerText, selectStatus.value);
    UltimaHoraDeActualizacionTablas();
  }

  function ActualizarStatusSelectPulmones(index) {
    let vacio = document.getElementById(`InputVacioPulmones${index}`);
    let volumenDiv = document.getElementById(`DivVolumenPulmones${index}`);
    let selectStatus = document.getElementById(`SelectStatusPulmones${index}`);
    ActualizarDatosTinasFireBase("Pulmones", index, vacio.value, volumenDiv.innerText, selectStatus.value);
    UltimaHoraDeActualizacionTablas();
  }

  function ActualizarInputTablaPulmones(index) {
    let vacio = document.getElementById(`InputVacioPulmones${index}`);
    let volumenDiv = document.getElementById(`DivVolumenPulmones${index}`);
    let selectStatus = document.getElementById(`SelectStatusPulmones${index}`);
    let RA = document.getElementById(`inputTablaRAPulmones${index}`);
    let Lote = document.getElementById(`inputTablaLotePulmones${index}`);
    let TinaDest = document.getElementById(`inputTablaTinaDestPulmones${index}`);
    ActualizarDatosTinasFireBase("Pulmones", index, vacio.value, volumenDiv.innerText, selectStatus.value, RA.value, Lote.value, TinaDest.value);
    UltimaHoraDeActualizacionTablas();
  }

  function UltimaHoraDeActualizacionTablas(){
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    DivUltimaActualizacion.innerHTML = now;
    let tablaRef = db.collection("UltimaActualizacion");
    tablaRef.doc("FH").set({fechaHora: DivUltimaActualizacion.textContent});
  }

  const shareData = {
    text: enviarStatusObjecto
  };
  
  const btn = document.querySelector("button");
  const resultPara = document.querySelector(".result");
  
  // Share must be triggered by "user activation"
  btn.addEventListener("click", async () => {
    try {
      console.log(enviarStatusObjecto);
      await navigator.share(shareData);
      resultPara.textContent = "Se mando el status!";
    } catch (err) {
      resultPara.textContent = `Error: ${err}`;
    }
  });
  
  CrearTabla(tablaFermentacion, 37, "Fermentacion");
  CrearTabla(tablaPulmones, 4, "Pulmones");
  SolicitarDatosFireBase();
  

  

