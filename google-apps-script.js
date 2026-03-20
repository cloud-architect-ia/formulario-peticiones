// ============================================================
// INSTRUCCIONES DE DESPLIEGUE:
// 1. Ve a https://sheets.google.com y crea una nueva hoja
// 2. En la fila 1, pon los encabezados: Fecha | Nombre | Petición
// 3. Ve a Extensiones > Apps Script
// 4. Borra el código que aparece y pega TODO este archivo
// 5. Haz clic en "Implementar" > "Nueva implementación"
// 6. Tipo: "Aplicación web"
// 7. Ejecutar como: "Yo" (tu cuenta)
// 8. Quién tiene acceso: "Cualquier persona"
// 9. Clic en "Implementar" y copia la URL generada
// 10. Pega esa URL en script.js donde dice GOOGLE_SCRIPT_URL
// ============================================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var datos = JSON.parse(e.postData.contents);

    sheet.appendRow([
      datos.fecha,
      datos.nombre,
      datos.peticion
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ resultado: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ resultado: 'error', mensaje: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('El servicio de peticiones está activo.')
    .setMimeType(ContentService.MimeType.TEXT);
}
