function addRow(tableID) {
    // Obtiene una referencia a la tabla
    var tableRef = document.getElementById(tableID);

    // Inserta una fila en la tabla, en el índice 0
    var newRow = tableRef.insertRow(0);

    // Inserta una celda en la fila, en el índice 0
    var newCell = newRow.insertCell(0);

    // Añade un nodo de texto a la celda
    var newText = document.createTextNode("Nueva fila superior");
    newCell.appendChild(newText);
  }

  // Llama a addRow() con el ID de la tabla
  addRow("tabla");
