
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

function CalcularVolumenTinasFermentacion1(index) {
  var x = document.getElementById(`InputVacioFermentacion1(${index})`);
  let volumen = (610 - x.value) * 116.41 + 2250;
  let volumenDic = document.getElementById(`DivVolumenFermentacion1(${index})`);
  volumenDic.innerHTML = volumen;
  UltimaHoraDeActualizacionTablas();
}

function CalcularVolumenTinasPulmones(index) {
  var x = document.getElementById(`InputVacioPulmones(${index})`);
  let volumen = (610 - x.value) * 105.2 + 2034;
  let volumenDic = document.getElementById(`DivVolumenPulmones(${index})`);
  volumenDic.innerHTML = volumen;
  UltimaHoraDeActualizacionTablas();
}

function CalcularVolumenTinasFermentacion2(index) {
  var x = document.getElementById(`InputVacioFermentacion2(${index})`);
  let volumen = (610 - x.value) * 116.41 + 2250;
  let volumenDic = document.getElementById(`DivVolumenFermentacion2(${index})`);
  volumenDic.innerHTML = volumen;
  UltimaHoraDeActualizacionTablas();
}

function UltimaHoraDeActualizacionTablas(){
  let now = new Date();
  DivUltimaActualizacion.innerHTML = now;
}

CrearTabla(tablaFermentacion1, 25, "Fermentacion1");
CrearTabla(tablaPulmones, 4, "Pulmones");
CrearTabla(tablaFermentacion2, 16, "Fermentacion2");