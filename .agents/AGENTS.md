# Reglas de Catalogación Automatizada (IA): Archivo Rafael Zarza

Estas reglas rigen el comportamiento del modelo de Inteligencia Artificial (IA) en el proyecto de catalogación del legado documental de Rafael Zarza Ballugera para la Fundación CEDCS. El objetivo de la IA es realizar la microdescripción (Nivel 9: Documento simple) extrayendo metadatos precisos a partir de fotografías, para su posterior integración en bases de datos compatibles con el estándar Dublin Core Qualified, ISAD(G), el Manual de Descripción Multinivel (MDM) y AtoM.

## 1. Principio Archivístico Base: Dependencia y Herencia (ISAD-G)
*   **Productor Único:** Todo el fondo pertenece al productor **Rafael Zarza**. 
*   **Regla de No Repetición:** Al realizar la extracción de datos, la IA **NUNCA** debe generar el campo `Creator` (Autor) rellenándolo con "Rafael Zarza". Según el Manual de Descripción Multinivel (MDM), esta información se hereda lógicamente de los niveles superiores del fondo.

## 2. Esquema Estándar de Metadatos (Qualified Dublin Core - Nivel 9)
Por cada documento procesado, la IA actuará como un archivero experto y estructurará la microdescripción en la tabla estandarizada con exactamente las siguientes 12 columnas (nombres de cabecera en minúsculas y camelCase oficiales):

*   **`source` (Fuente / Archivo de Origen):** Nombre físico estandarizado de la imagen procesada con extensión `.jpg` (ej. `ES-CEDCS-ZARZA-PERSONAL-C001-P001-D004.jpg`).
*   **`identifier` (Identificador):** Estructura del código de referencia unívoco **ESTRICTO**: `ES-CEDCS-ZARZA-[SERIE]-C[X]-P[Y]-D[Z]` (ej. `ES-CEDCS-ZARZA-PERSONAL-C001-P001-D004`). Prohibido el uso de llaves `{}`, comas `,`, o barras `/` o `//`.
*   **`isPartOf` (Es Parte De / Ubicación Física Limpia):** Código de agregación del contenedor físico del nivel superior al que pertenece el recurso, **ESTRICTAMENTE SIN PREFIJOS DE SERIE** (ej. `C001-P001`, `C001-P002`). Los contenedores físicos se desvinculan totalmente de las series (número currens).
*   **`title` (Título):** Nombre del recurso.
    *   **Título Formal:** Si tiene título explícito en el documento, transcríbelo textualmente **limpio de comillas envolventes** (ej. `EL RAYO DESINTEGRADOR` o `diseño SIN diseño. Cincuenta objetos anarquistas`). Prohibido incluir comillas físicas `" "` alrededor del título formal para evitar ruido visual en la interfaz web y mantener limpia la base de datos.
    *   **Título Atribuido:** Si carece de título explícito, redacta un título conciso iniciando con la tipología documental entre corchetes `[ ]` (ej. `[Carta a Koldo Artieda sobre la publicación El Refractor]`).
*   **`description` (Alcance y Contenido):** Resumen analítico de 2 a 3 líneas explicando el contenido intelectual del documento y transcribiendo citas textuales clave entrecomilladas de gran valor para su recuperación. **Regla de Puntuación:** No entrecomillar globalmente todo el texto del párrafo de la descripción; redactar en texto continuo y limpio, manteniendo comillas `"` exclusivamente para títulos literales o citas explícitas en el interior de la frase.
*   **`date` (Fecha):** Fecha de creación.
    *   **Regla Estricta de Fechas:** A no ser que identifiques en la imagen la fecha **explícitamente escrita o impresa**, usarás **SIEMPRE** la etiqueta `[s.f.]` (sin fecha) para consignar el campo `date`. Queda **PROHIBIDO** deducir o estimar fechas aproximadas (como `[ca. AAAA]`) si el año/fecha no figura explícitamente impreso o escrito en el documento.
    *   **Formatos para Fechas Explícitas:** ISO 8601 (`AAAA-MM-DD`) o año explícito (`AAAA`).
*   **`relation` (Serie / Relación):** **CATEGORÍAS FIJAS OBLIGATORIAS**. La serie vive de manera estrictamente VIRTUAL en la base de datos y debe pertenecer **EXCLUSIVAMENTE** a una de las siguientes 6 categorías fijas en mayúsculas:
    *   `PERSONAL`
    *   `MILITANCIA`
    *   `PUBLICACIONES`
    *   `EXPOSICIONES`
    *   `AUDIOVISUAL`
    *   `ARQUITECTURA`
    *   `XXXXX` *(Si presenta duda)*

    *   *Nota:* Si la serie no es conocida o presenta duda, se marcará obligatoriamente como `XXXXX` (ej. `ES-CEDCS-ZARZA-XXXXX-C001-P001-D004`).
*   **`coverage` (Lugar / Cobertura Espacial):** Contexto geográfico mencionado o específico.
    *   **Regla de Herencia MDM (1.3.E2):** Como el Fondo general de Rafael Zarza tiene como lugar de producción y acumulación principal Madrid, **NO se debe rellenar si se asume o presupone producido en el entorno habitual de Madrid**. Dejar la celda **COMPLETAMENTE EN BLANCO** (vacía) para que herede la ubicación general del fondo y evitar ruido en las búsquedas.
    *   **Cuándo se rellena:** Consignar el lugar **únicamente** cuando difiera explícitamente del nivel superior (ej. `París`, `Zaragoza`, `Valencia`) o mencione un espacio/calle específico de relevante interés (ej. `Madrid, Galería Buades` o `Madrid, Calle Bocángel`). Si es desconocido o no hay indicio claro, omitir dejando la celda vacía.
*   **`type` (Tipo DCMI):** **REGLA ESTRICTA**. Clasifica la naturaleza del recurso utilizando **exclusivamente** uno de estos tres términos del *DCMI Type Vocabulary*:
    *   `Text` (para cartas, manuscritos, pasquines, recortes de prensa, artículos).
    *   `Still Image` (para fotografías, carteles, bocetos, grabados).
    *   `Physical Object` (para objetos tridimensionales).
*   **`format` (Formato / Soporte):** Manifestación y soporte físico deducido del objeto (ej. `Fotocopia sobre papel rojo`, `Impresión sobre papel`, `Papel impreso de prensa`).
*   **`contributor` (Contribuidor):** Remitentes, destinatarios, coautores, ilustradores o colaboradores distintos a Rafael Zarza, separados por comas (ej. `Juan D. Goy, Quico Rivas`).
*   **`subject` (Materia / Tags):** De 3 a 5 etiquetas temáticas normalizadas separadas por comas. Excluye ubicaciones geográficas (que ya van en `coverage`) y **NUNCA utilices los términos que coincidan con las 6 categorías fijas de `relation`** (ej. prohibido incluir `PUBLICACIONES`, `AUDIOVISUAL`, `EXPOSICIONES`, `PERSONAL`, `MILITANCIA` o `ARQUITECTURA` como materias).

## 3. Comportamiento Multimodal de la IA (Precauciones)
*   **Fidelidad Transcripcional Manuscrita:** Queda estrictamente **PROHIBIDO** inventar, asumir o alucinar contenidos temáticos en documentos manuscritos. Si un texto manuscrito resulta difícil de leer, la IA debe describirlo objetivamente como texto manuscrito y consignar únicamente los fragmentos legibles con certeza (añadiendo `[sic]` o `[?]` para términos dudosos).
*   **Caligrafía compleja / OCR:** Si un nombre o palabra presenta ambigüedad de lectura manuscrita, añade `[sic]` o `[?]` según normas de transcripción paleográfica/archivística.
*   **Formato de Salida:** Devuelve SIEMPRE la información en formato de tabla estructurada en Markdown y CSV.

## 4. Previsualización de Cambios en CSV
Siempre que hagas un cambio, actualización o inserción en el archivo `Nivel 9 (Documento simple).csv`, debes generar una previsualización bajo el título **"Previsualización: Nivel 9 (Documento simple).csv"**. Marca en amarillo (usando `<mark>texto</mark>`) exclusivamente las celdas actualizadas o añadidas.

## 5. Inmutabilidad de Registros Previos
Bajo ninguna circunstancia se modificarán o eliminarán filas previas de lotes anteriores salvo solicitud directa del archivero humano.

## 6. Normalización de Nombres de Archivo e Imágenes Procesadas
Al procesar un nuevo lote de imágenes, la IA debe copiar a la carpeta `Imágenes procesadas` **únicamente la imagen principal representativa** (marcada como `M`), renombrándola para que coincida exactamente con el `identifier` generado definitivo (con extensión `.jpg`). La carpeta `Imágenes procesadas` alojará exclusivamente los archivos de imagen principales necesarios para el funcionamiento del buscador web `index.html`, evitando subir tomas secundarias al servidor y a GitHub.

## 7. Principio de Catalogación del Objeto Global
Catalogamos objetos documentales en su conjunto (ej. el libro, el cartel, la carta), no las fotografías individuales que los retratan ni sus partes fotografiadas. La descripción debe atender siempre a la naturaleza del recurso en su totalidad (evitando expresamente listas de tomas o folios como "Cubierta, página de créditos y colofón de..." o "fotografía de la portada" en favor de describir directamente la obra o documento global).

## 8. Regla Fundamental: Requisito Obligatorio de Ubicación Física y Lógica de Numeración
* **Suministro Obligatorio por el Archivero:** Al procesar cualquier nuevo documento o lote de imágenes, los datos de la ubicación física son **ESTRICTAMENTE OBLIGATORIOS** y deben ser proporcionados por el archivero humano.
* **Consulta Previa Obligatoria (Si no se proporcionan datos):** Si el usuario solicita procesar imágenes pero **NO** ha facilitado la ubicación física, la IA **NUNCA debe inventar ni asumir valores por defecto**. La IA debe **DETENERSE Y PREGUNTAR** explícitamente la ubicación física al usuario antes de catalogar, generar identificadores o renombrar los archivos.
* **Estructura Estándar de Codificación:**
  * **Caja (`C`):** Codificación con el patrón `C001`, `C002`, etc.
  * **Carpeta / Legajo (`P`):** Codificación con el patrón `C001-P001`, `C001-P002`, `C002-P001`, etc. (donde `C` representa la Caja y `P` representa la Carpeta).
  * **Documento (`D` o `DOC`):** Codificación con el patrón `D001`, `D002`, `D003`, etc.
* **Nomenclatura de Archivos y Carpetas de Origen en `Imagenes a procesar`:**
  * El archivero codificará la ubicación física directamente en el nombre del archivo o carpeta de origen con el patrón `c[X]-p[Y]` o `c[X]_p[Y]` (ej. `c004-P003.jpg`, `c006_p002.jpg`, subcarpeta `c002-p003`).
  * Si existen múltiples documentos distintos en la misma ubicación física, el archivero añadirá sufijos correlativos `_2`, `_3`, etc. al nombre del archivo o carpeta (ej. `c006-p001.jpg` = 1er doc en C006-P001, `c006-p001_2.jpg` = 2º doc en C006-P001, `c006-p001_3.jpg` = 3er doc en C006-P001).
  * La IA extraerá limpiamente el valor de `isPartOf` a partir de esta codificación (ej. `C004-P003`, `C006-P001`, `C006-P002`, `C002-P003`).
* **Lógica Archivística y de Base de Datos para Numeración:**
  1. **📦 Las Carpetillas (`P`) se reinician en cada caja:** La numeración de carpetillas es local a cada contenedor físico (`C001-P001`, `C001-P002`, y al cambiar a la Caja 2 se reinicia a `C002-P001`). Esto permite auditar visualmente el depósito (Nivel 7) e identificar cuántas carpetillas reales contiene cada caja.
  2. **🖼️ Los Documentos (`D` o `DOC`) son GLOBALES Y CONSECUTIVOS a lo largo de todo el fondo:** El número de documento funciona como el identificador unívoco absoluto ("DNI" digital) en la base de datos y en la web. **NUNCA SE REINICIA** al cambiar de carpeta o caja. Continuando tras el último documento registrado (actualmente `D008`), los siguientes asignarán estrictamente `D009`, `D010`, `D011`, `D012`, etc.
  * Esta codificación determina de forma directa los valores de `identifier` (ej. `ES-CEDCS-ZARZA-[SERIE]-C004-P003-D009`), `isPartOf` (ej. `C004-P003`), `source` y la Ubicación Física interpretada en el buscador web.

## 9. Catalogación de Documentos Compuestos y Transferencia Exclusiva de la Imagen Principal (`M`)
Cuando un mismo documento físico esté compuesto por varias fotografías (ej. múltiples páginas, reverso, folleto desplegable o detalles), la carpeta `Imágenes a procesar` contendrá una o varias subcarpetas:
1. **Unicidad de Fila por Subcarpeta:** Todas las imágenes contenidas dentro de una misma subcarpeta pertenecen al mismo recurso documental y generarán **UNA SOLA fila** en la tabla/CSV de catalogación Nivel 9.
2. **Análisis Multimodal Conjunto:** La IA examinará y sintetizará el contenido de **todas las imágenes** de la subcarpeta para construir el título, la descripción analítica y los metadatos globales del documento.
3. **Imagen M para la Miniatura Representativa:** Dentro de la subcarpeta, la imagen nombrada o marcada con la letra **`M`** (ej. `M.jpg`, `DOC_M.jpg`, etc.) se utilizará como la imagen principal para la representación visual y el campo `source`.
4. **Copia Exclusiva de la Imagen Principal a "Imágenes procesadas":** Al finalizar el procesamiento, **ÚNICAMENTE la imagen principal `M` se copiará a la carpeta `Imágenes procesadas`**, renombrándola exactamente con el patrón del `identifier` (ej. `ES-CEDCS-ZARZA-[SERIE]-C[X]-P[Y]-D[Z].jpg`). Las tomas secundarias o de detalle no se copian a `Imágenes procesadas` para mantener el repositorio limpio y ligero, garantizando que `Imágenes procesadas` contenga strictly un único archivo por documento catalogado en el buscador web `index.html`.

## 10. Control Estricto de Publicación en GitHub (Control Remoto)
* **Prohibición Total de Subida Automática / Git Push:** La IA **NUNCA** ejecutará el comando `git push` ni subirá archivos o cambios al repositorio remoto de GitHub de forma autónoma.
* **Requisito Obligatorio de Orden Expresa:** Todas las operaciones de catalogación, actualización de CSV/Excel y copia de imágenes se realizarán **únicamente en el entorno local**. Los cambios solo se subirán a GitHub cuando el usuario lo ordene de forma explícita (ej. *"sube a github"*, *"haz git push"*).

## 11. Normalización Estricta del CSV (RFC 4180) y Verificación Automatizada
* **Sintaxis CSV Estándar (RFC 4180):** Al editar, insertar o generar filas en `Nivel 9 (Documento simple).csv`, la IA debe garantizar que cualquier campo que contenga comas `,`, saltos de línea o comillas dobles quede estrictamente envuelto en comillas dobles externas (`"..."`), y que las comillas dobles internas se escapen duplicándolas (`""`). Se utilizará la librería oficial de lectura y escritura de CSV de Python (`csv.writer` / `csv.DictWriter`) para evitar desalineamientos de columnas.
* **Verificación Automatizada Obligatoria:** Tras cualquier modificación del archivo CSV, la IA ejecutará una comprobación automatizada en Python para validar que todos los registros del archivo mantengan exactamente la estructura estandarizada de columnas sin descalces en campos clave (`date`, `relation`, `coverage`, etc.) antes de sincronizar con Excel (`sync_excel_csv.py to-excel`).




