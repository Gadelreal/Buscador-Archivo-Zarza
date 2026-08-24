# 🔍 Buscador del Archivo Rafael Zarza (Fundación CEDCS)

Sistema de búsqueda y consulta web estático para el fondo documental de **Rafael Zarza Ballugera**. Diseñado bajo estándares archivísticos de microdescripción (**ISAD(G)**, **Qualified Dublin Core - Nivel 9** y **Manual de Descripción Multinivel - Nivel 7**).

El buscador funciona 100% en el lado del cliente (*client-side*), lo que garantiza respuestas instantáneas a las búsquedas sin sobrecargar el servidor ni requerir bases de datos MySQL/PHP complejas.

---

## 🌟 Características Principales

* **Búsqueda Dual en 2 Dimensiones**:
  * **📁 Localizaciones (Nivel 7)**: Navegación jerárquica por cajas (`C001`, `C002`...) y carpetillas de conservación (`C001-P001`...). Incluye botón interactivo `Ver X docs ➔` para saltar a los documentos alojados en cada contenedor.
  * **📄 Documentos (Nivel 9)**: Microdescripción completa de documentos simples, con miniaturas representativas, etiquetas de tesauro y avisos de ubicación física provisional.
* **Filtros Avanzados**: Búsqueda textual en tiempo real, filtro jerárquico de Cajas/Carpetas, selección múltiple de Series y Fechas extremas.
* **Fácil Despliegue de Filas**: Haz clic en cualquier fila para desplegar simultáneamente todas sus columnas largas (`Título`, `Descripción`, `Contribuidor`, `Materias`).
* **Personalización de Columnas**: Menú desplegable para ocultar/mostrar columnas según la necesidad del archivero o visitante.
* **Sin Base de Datos**: Carga directamente los datos desde archivos estandarizados CSV (`Nivel 9 (Documento simple).csv` y `Nivel 7 (Carpetilla simple).csv`).

---

## 📂 Estructura del Repositorio

El repositorio contiene dos categorías de archivos: los **necesarios para el funcionamiento web** y los **de mantenimiento y fuentes locales**.

### 🟢 Archivos de Producción (Necesarios en el Servidor Web)
```text
├── index.html                           # Aplicación web interactiva (UI, Tailwind CSS y JavaScript)
├── Nivel 7 (Carpetilla simple).csv      # Base de datos activa de contenedores físicos y localizaciones
├── Nivel 9 (Documento simple).csv       # Base de datos activa de documentos catalogados (Dublin Core)
├── Imágenes procesadas/                 # Fotografías principales representativas (.jpg) por identifier
└── .nojekyll                            # Configuración de servidor (evita bloqueos de nombres con tilde)
```

### 🟡 Archivos de Fuentes y Mantenimiento Local (No necesarios en la Web)
```text
├── Nivel 7.xlsx                         # Fuente principal Excel de Localizaciones (Nivel 7)
├── Nivel 9 (Documento simple).xlsx       # Fuente principal Excel de Documentos (Nivel 9)
├── export_nivel7.py                     # Script Python de exportación de Nivel 7.xlsx a CSV
├── sync_excel_csv.py                    # Script Python de sincronización y validación entre Excel y CSV
└── .agents/
    └── AGENTS.md                        # Manual de normas de catalogación archivística (Fundación CEDCS)
```

---

## 🌐 Guía de Integración en WordPress

Este buscador es **totalmente compatible con WordPress**. Al ser código estático, no requiere instalar plugins pesados ni hacer consultas a la base de datos de WordPress.

A continuación se detallan las **3 opciones principales** para integrarlo en tu sitio WordPress:

---

### Opción 1: Encrustación mediante `<iframe>` *(Método Más Rápido y Recomendado)*

Este método no altera tu tema de WordPress ni genera conflictos de código CSS/JS.

#### Paso 1: Subir los archivos al servidor
Sube los **archivos de producción** (`index.html`, los dos archivos `.csv`, `.nojekyll` y la carpeta `Imágenes procesadas/`) a un directorio público en tu servidor web (por ejemplo, mediante FTP o Administrador de Archivos de cPanel/Plesk):
```text
https://tu-web-wordpress.org/buscador-zarza/index.html
```

> 💡 **Nota**: Para mantener tu servidor web más ligero y limpio, **no es necesario subir** los archivos Excel (`.xlsx`), los scripts de Python (`.py`) ni el directorio `.agents/`, ya que son herramientas exclusivamente para uso y mantenimiento local.

#### Paso 2: Insertar en la página de WordPress
1. En el panel de control de WordPress, dirígete a **Páginas ➔ Añadir nueva** (o edita una existente en Gutenberg, Elementor, Divi o Beaver Builder).
2. Añade un bloque de **HTML Personalizado** (*Custom HTML*).
3. Pega el siguiente código:

```html
<div class="zarza-iframe-container" style="width: 100%; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
    <iframe 
        src="https://tu-web-wordpress.org/buscador-zarza/index.html" 
        width="100%" 
        height="950px" 
        style="border: none; width: 100%; min-height: 850px; display: block;" 
        title="Buscador Archivo Rafael Zarza" 
        loading="lazy">
    </iframe>
</div>
```
*(Reemplaza `https://tu-web-wordpress.org/buscador-zarza/index.html` por la URL real donde subiste los archivos).*

---

### Opción 2: Plantilla de Página Personalizada en el Tema WordPress

Si deseas que el buscador mantenga la cabecera, el menú de navegación y el pie de página originales de tu tema de WordPress:

1. Accede a tu tema hijo (*child theme*) en la ruta: `/wp-content/themes/tu-tema-child/`.
2. Crea un archivo llamado `page-buscador-zarza.php` con el siguiente contenido:

```php
<?php
/*
Template Name: Buscador Archivo Zarza
*/
get_header(); 
?>

<div id="zarza-app-wrapper" style="width: 100%; height: calc(100vh - 120px); min-height: 700px;">
    <?php 
    // Incluye el contenido del index.html
    include( get_stylesheet_directory() . '/buscador-zarza/index.html' ); 
    ?>
</div>

<?php 
get_footer(); 
?>
```
3. En WordPress, crea una nueva página y en el panel lateral derecho (**Ajustes de Página ➔ Plantilla**), selecciona **Buscador Archivo Zarza**.

---

### Opción 3: Integración mediante Shortcode PHP (`[buscador_zarza]`)

Puedes añadir un shortcode personalizado para insertar el buscador en cualquier entrada o página escribiendo `[buscador_zarza]`.

Añade este código al final del archivo `functions.php` de tu tema hijo o mediante el plugin **Code Snippets**:

```php
function registrar_shortcode_buscador_zarza() {
    $url_buscador = esc_url( get_site_url() . '/buscador-zarza/index.html' );
    return '
    <div style="width: 100%; height: 900px; max-width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <iframe src="' . $url_buscador . '" style="width: 100%; height: 100%; border: none;"></iframe>
    </div>';
}
add_shortcode('buscador_zarza', 'registrar_shortcode_buscador_zarza');
```

---

## ⚡ Rendimiento y Buenas Prácticas en WordPress

* **Cálculo instantáneo**: Los archivos CSV pesan apenas unos cientos de kilobytes, por lo que la carga inicial toma menos de 1 segundo incluso en conexiones móviles.
* **Caché en el Servidor**: Si utilizas plugins de caché en WordPress (WP Rocket, LiteSpeed Cache, W3 Total Cache), se recomienda añadir la ruta del CSV o del buscador a la lista de exclusiones de caché si vas a actualizar los datos CSV con frecuencia.
* **Ruta de Imágenes**: Asegúrate de que la carpeta `Imágenes procesadas/` conserve los permisos de lectura `755` para que las miniaturas en alta resolución se sirvan correctamente.

---

## 🛠️ Desarrollo Local y Mantenimiento

### Ejecutar localmente
Para probar el buscador en tu ordenador sin subirlo al servidor:
```bash
cd "Archivo Rafael Zarza"
python3 -m http.server 8080
```
Abre tu navegador en: `http://localhost:8080/index.html`

### Actualizar la base de datos de Nivel 7
Si actualizas la lista de localizaciones en `Nivel 7.xlsx`, ejecuta el script de re-exportación a CSV:
```bash
python3 export_nivel7.py
```
