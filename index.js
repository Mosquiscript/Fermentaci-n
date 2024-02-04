const tabla = document.getElementById("tabla");

let row = tabla.insertRow(-1);
let celdasMax = 24;


for (let index = 0; index < celdasMax; index++) {
      
      let celda = row.insertCell(index);
      celda.innerText = "1";
}