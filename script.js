// Contador de caracteres
const peticionTextarea = document.getElementById('peticion');
const charCount = document.getElementById('charCount');

peticionTextarea.addEventListener('input', function() {
    charCount.textContent = this.value.length;
});

// Manejo del formulario
const form = document.getElementById('petitionForm');
const mensaje = document.getElementById('mensaje');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value.trim() || 'Anónimo';
    const peticion = document.getElementById('peticion').value.trim();
    
    if (!peticion) {
        mostrarMensaje('Por favor escribe tu petición', 'error');
        return;
    }
    
    // Crear objeto con los datos
    const datos = {
        fecha: new Date().toLocaleString('es-ES'),
        nombre: nombre,
        peticion: peticion
    };
    
    // Guardar en localStorage
    guardarEnExcel(datos);
    
    // Limpiar formulario
    form.reset();
    charCount.textContent = '0';
    
    // Mostrar mensaje de éxito
    mostrarMensaje('¡Tu petición ha sido enviada! Estaremos orando por ti. 🙏', 'exito');
});

function guardarEnExcel(datos) {
    // Obtener peticiones existentes
    let peticiones = JSON.parse(localStorage.getItem('peticiones')) || [];
    
    // Agregar nueva petición
    peticiones.push(datos);
    
    // Guardar en localStorage
    localStorage.setItem('peticiones', JSON.stringify(peticiones));
}

function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = `mensaje ${tipo}`;
    
    setTimeout(() => {
        mensaje.style.display = 'none';
    }, 5000);
}

// Función para descargar Excel (CSV)
function descargarExcel() {
    const peticiones = JSON.parse(localStorage.getItem('peticiones')) || [];
    
    if (peticiones.length === 0) {
        alert('No hay peticiones para descargar');
        return;
    }
    
    // Crear CSV
    let csv = '\uFEFF'; // BOM para UTF-8
    csv += 'Fecha,Nombre,Petición\n';
    
    peticiones.forEach(p => {
        csv += `"${p.fecha}","${p.nombre}","${p.peticion}"\n`;
    });
    
    // Crear archivo y descargar
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `peticiones_oracion_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Agregar botón de descarga (solo visible en consola o puedes agregarlo al HTML)
console.log('Para descargar las peticiones en Excel, ejecuta: descargarExcel()');
