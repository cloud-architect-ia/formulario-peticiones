# 🙏 Formulario de Peticiones de Oración

Formulario web simple para recolectar peticiones de oración y exportarlas a Excel.

## 📁 Archivos Incluidos

- `index.html` - Formulario principal para que los usuarios envíen peticiones
- `styles.css` - Estilos del formulario
- `script.js` - Lógica del formulario y almacenamiento
- `admin.html` - Panel de administración para ver y descargar peticiones

## 🚀 Cómo Usar

### Para los usuarios (enviar peticiones):
1. Abre `index.html` en tu navegador
2. Opcionalmente escribe tu nombre
3. Escribe tu petición de oración
4. Haz clic en "Enviar mi Petición"

### Para administradores (descargar peticiones):
1. Abre `admin.html` en el mismo navegador
2. Verás todas las peticiones registradas
3. Haz clic en "📥 Descargar Excel (CSV)" para exportar
4. El archivo se puede abrir en Excel, Google Sheets, etc.

## 💾 Almacenamiento

Las peticiones se guardan en el navegador usando `localStorage`. Esto significa:
- ✅ No necesitas servidor ni base de datos
- ✅ Funciona completamente offline
- ⚠️ Los datos solo están en ese navegador específico
- ⚠️ Si borras los datos del navegador, se pierden las peticiones

## 📊 Formato Excel

El archivo descargado es un CSV que incluye:
- Fecha y hora de la petición
- Nombre (o "Anónimo" si no se proporcionó)
- Texto de la petición

## 🌐 Para Publicar en Internet

Si quieres que otras personas accedan al formulario:

1. **Opción fácil**: Sube los archivos a servicios gratuitos como:
   - GitHub Pages
   - Netlify
   - Vercel

2. **Opción con base de datos**: Para uso más profesional, considera:
   - Google Forms + Google Sheets
   - Integración con Google Sheets API
   - Backend con Node.js + MongoDB

## 🎨 Personalización

Puedes modificar:
- Colores en `styles.css`
- Textos en `index.html`
- Fecha del ayuno en el HTML

## ⚠️ Nota Importante

Este sistema guarda los datos localmente en el navegador. Para un uso en producción con múltiples usuarios, necesitarías implementar un backend con base de datos.
