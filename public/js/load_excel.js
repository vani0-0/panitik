function loadExcelData() {
  const content = document.getElementById("bulk_add");
  var fileInput = document.getElementById("excelFile");
  var file = fileInput.files[0];
  var reader = new FileReader();

  reader.onload = function (e) {
    var data = new Uint8Array(e.target.result);
    var workbook = XLSX.read(data, { type: "array" });
    var worksheet = workbook.Sheets[workbook.SheetNames[0]];
    var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Process the data as needed
    // For example, you can loop through the jsonData array and display it in a table

    var table = document.createElement("table");
    for (var i = 0; i < jsonData.length; i++) {
      var row = document.createElement("tr");
      for (var j = 0; j < jsonData[i].length; j++) {
        var cell = document.createElement(i === 0 ? "th" : "td");
        cell.textContent = jsonData[i][j];
        row.appendChild(cell);
      }
      table.appendChild(row);
    }

    content.appendChild(table);
  };

  reader.readAsArrayBuffer(file);
}
