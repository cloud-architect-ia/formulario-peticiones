// =============================================
// IMPORTANTE: Reemplaza esta URL con la de tu Google Apps Script desplegado
// =============================================
const GOOGLE_SCRIPT_URL = 'PEGA_AQUI_TU_URL_DE_GOOGLE_APPS_SCRIPT';

// Contador de caracteres
const peticionTextarea = document.getElementById('peticion');
const charCount = document.getElementById('charCount');

peticionTextarea.addEventListener('input', function() {
    charCount.textContent = this.value.length;
});

// Manejo del formulario
const form = document.getElementById('petitionForm');
const mensaje = document.getElementById('mensaje');

form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim() || 'Anónimo';
    const peticion = document.getElementById('peticion').value.trim();

    if (!peticion) {
        mostrarMensaje('Por favor escribe tu petición', 'error');
        return;
    }

    const submitBtn = form.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    const datos = {
        fecha: new Date().toLocaleString('es-ES'),
        nombre: nombre,
        peticion: peticion
    };

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        // Con mode: 'no-cors' no podemos leer la respuesta,
        // pero si no lanza error, el envío fue exitoso
        form.reset();
        charCount.textContent = '0';
        mostrarMensaje('¡Tu petición ha sido enviada! Estaremos orando por ti. 🙏', 'exito');

    } catch (error) {
        console.error('Error al enviar:', error);
        // Guardar en localStorage como respaldo si falla la red
        guardarLocal(datos);
        mostrarMensaje('Se guardó tu petición localmente. Se enviará cuando haya conexión. 🙏', 'exito');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar mi Petición';
    }
});

function guardarLocal(datos) {
    let peticiones = JSON.parse(localStorage.getItem('peticiones_pendientes')) || [];
    peticiones.push(datos);
    localStorage.setItem('peticiones_pendientes', JSON.stringify(peticiones));
}

// Intentar enviar peticiones pendientes al cargar la página
async function enviarPendientes() {
    let pendientes = JSON.parse(localStorage.getItem('peticiones_pendientes')) || [];
    if (pendientes.length === 0) return;

    const enviadas = [];

    for (let i = 0; i < pendientes.length; i++) {
        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pendientes[i])
            });
            enviadas.push(i);
        } catch (e) {
            break; // Si falla, dejamos el resto para después
        }
    }

    if (enviadas.length > 0) {
        pendientes = pendientes.filter((_, idx) => !enviadas.includes(idx));
        localStorage.setItem('peticiones_pendientes', JSON.stringify(pendientes));
    }
}

function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = 'mensaje ' + tipo;
    mensaje.style.display = '';  // Limpiar cualquier display:none previo

    setTimeout(function() {
        mensaje.className = 'mensaje';
        mensaje.style.display = '';
    }, 5000);
}

// Al cargar, intentar enviar pendientes
enviarPendientes();
