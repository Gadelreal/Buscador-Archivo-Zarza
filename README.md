# 🔍 Buscador del Archivo Rafael Zarza (Fundación CEDCS)

Sistema de búsqueda y consulta web estático para el fondo documental de **Rafael Zarza Ballugera**. Diseñado bajo estándares archivísticos de microdescripción (**ISAD(G)**, **Qualified Dublin Core - Nivel 9** y **Manual de Descripción Multinivel - Nivel 7**).

El buscador funciona 100% en el lado del cliente (*client-side*), lo que garantiza respuestas instantáneas a las búsquedas sin sobrecargar el servidor ni requerir bases de datos MySQL/PHP complejas.

---

## 🌟 Características Principales

* **Búsqueda Dual en 2 Dimensiones**:
  * **📁 Localizaciones (Nivel 7)**: Navegación jerárquica por cajas (`C001`, `C002`...) y carpetillas de conservación (`C001-P001`...). Incluye botón interactivo `Ver X docs ➔` para saltar a los documentos alojados en cada contenedor.
  * **📄 Documentos (Nivel 9)**: Microdescripción completa de documentos simples, con miniaturas representativas, etiquetas de tesauro y avisos de ubicación física.
* **Filtros Avanzados**: Búsqueda textual en tiempo real, filtro jerárquico de Cajas/Carpetas, selección múltiple de Series y Fechas extremas.
* **Fácil Despliegue de Filas**: Haz clic en cualquier fila para desplegar simultáneamente todas sus columnas largas (`Título`, `Descripción`, `Contribuidor`, `Materias`).
* **Personalización de Columnas**: Menú desplegable para ocultar/mostrar columnas según la necesidad del archivero o visitante.
* **Carga Ultrarrápida**: Carga paralela de archivos estandarizados CSV (`Nivel 9 (Documento simple).csv` y `Nivel 7 (Carpetilla simple).csv`).

---

## 📂 Estructura del Repositorio y Política de Publicación en GitHub

El proyecto mantiene una **separación estricta** entre los archivos de producción pública (publicados en GitHub) y los archivos máster de trabajo local:

### 🟢 Archivos Públicos en GitHub (Exclusivos para el Buscador Web)
Únicamente se suben al repositorio los archivos indispensables para la ejecución del buscador estático en web:

```text
├── index.html                           # Aplicación web interactiva (UI, Tailwind CSS y JavaScript)
├── Nivel 7 (Carpetilla simple).csv      # Base de datos pública de contenedores físicos y localizaciones
├── Nivel 9 (Documento simple).csv       # Base de datos pública de documentos catalogados (Dublin Core)
├── Imágenes procesadas/                 # Fotografías principales representativas (.jpg) por identifier
├── README.md                            # Documentación del proyecto
├── .gitignore                           # Configuración de exclusiones de archivos de trabajo local
└── .nojekyll                            # Configuración para GitHub Pages (evita bloqueo de rutas con tildes)
```

### 🔒 Archivos de Trabajo Local (NO se suben a GitHub - Exclusivos en Disco Local)
Los archivos máster en Excel, scripts de sincronización interna, fotografías originales y notas de trabajo permanecen en local mediante `.gitignore`:

```text
├── Nivel 7.xlsx                         # Fuente máster Excel de Localizaciones (Nivel 7)
├── Nivel 9 (Documento simple).xlsx       # Fuente máster Excel de Documentos (Nivel 9)
├── sync_excel_csv.py                    # Script de sincronización bidireccional entre Excel y CSV
├── export_nivel7.py                     # Script auxiliar de exportación Nivel 7
├── Imagenes a procesar/                 # Fotografías originales recibidas para catalogar
├── Descripcion Archivo/                 # Documentación y notas de trabajo
└── .agents/                             # Manuales y reglas internas de catalogación IA
```

---

## 🛠️ Desarrollo Local y Sincronización

### 1. Ejecutar el buscador en local
Para probar el buscador localmente en tu ordenador:
```bash
python3 -m http.server 8085
```
Abre en tu navegador: `http://localhost:8085`

### 2. Sincronizar cambios desde los Excel máster a CSV
Cuando actualices los archivos Excel en local, sincroniza los CSV del buscador con el script:

* **Sincronizar Nivel 7 (Localizaciones)** desde `Nivel 7.xlsx`:
  ```bash
  python3 sync_excel_csv.py n7-to-csv
  ```
* **Sincronizar Nivel 9 (Documentos)** desde `Nivel 9 (Documento simple).xlsx`:
  ```bash
  python3 sync_excel_csv.py to-csv
  ```
* **Generar Excel Nivel 9** desde `Nivel 9 (Documento simple).csv`:
  ```bash
  python3 sync_excel_csv.py to-excel
  ```

---

## 🌐 Guía de Integración en WordPress

Este buscador es **totalmente compatible con WordPress**. Al ser código estático, no requiere instalar plugins pesados ni hacer consultas a la base de datos de WordPress.

### Opción Recomendada: Incrustación mediante `<iframe>`
Sube los archivos públicos (`index.html`, los dos `.csv`, `.nojekyll` y la carpeta `Imágenes procesadas/`) a tu servidor web e insértalos en WordPress mediante un bloque de **HTML Personalizado**:

```html
<div class="zarza-iframe-container" style="width: 100%; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
    <iframe 
        src="https://tu-web-wordpress.org/buscador-zarza/index.html?embed=true" 
        width="100%" 
        height="950px" 
        style="border: none; width: 100%; min-height: 850px; display: block;" 
        title="Buscador Archivo Rafael Zarza" 
        loading="lazy">
    </iframe>
</div>
```
*(Utiliza `?embed=true` al final de la URL para ocultar el encabezado e integrar el buscador limpiamente en tu plantilla de WordPress).*
