const http = require('http');
const fs = require('fs');
const path = require('path');

// Usar el puerto 8000 por defecto para evitar restricciones de puertos bajos en macOS
// pero permitir cambiarlo fácilmente mediante variable de entorno o argumento
const defaultPort = 8000;
let PORT = defaultPort;

const args = process.argv.slice(2);
if (args.length > 0 && !isNaN(args[0])) {
    PORT = parseInt(args[0], 10);
} else if (process.env.PORT && !isNaN(process.env.PORT)) {
    PORT = parseInt(process.env.PORT, 10);
}

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.csv': 'text/csv; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.avif': 'image/avif',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
};

const server = http.createServer((req, res) => {
    // Decodificar la URL para manejar caracteres especiales y espacios
    let filePath = path.join(__dirname, decodeURIComponent(req.url));
    
    // Si la ruta es un directorio, buscar index.html
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h1>404 - Archivo no encontrado</h1><p>El recurso solicitado no existe en este directorio.</p>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end(`Error de servidor: ${error.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(` Servidor local activo en: http://localhost:${PORT}`);
    console.log(` Sirviendo archivos desde: ${__dirname}`);
    if (PORT < 1024) {
        console.log(` ADVERTENCIA: Los puertos menores a 1024 requieren privilegios root en macOS.`);
    }
    console.log(` Para detener el servidor, presiona: Ctrl + C`);
    console.log(`==================================================\n`);
});

server.on('error', (err) => {
    if (err.code === 'EACCES') {
        console.error(`\n[ERROR] Permiso denegado para usar el puerto ${PORT}.`);
        console.error(`Los puertos inferiores a 1024 (como el 800) son puertos del sistema y requieren 'sudo'.`);
        console.error(`Te recomendamos utilizar un puerto alternativo como el 8000:`);
        console.error(`  node server.js 8000\n`);
    } else if (err.code === 'EADDRINUSE') {
        console.error(`\n[ERROR] El puerto ${PORT} ya está siendo utilizado por otra aplicación.`);
        console.error(`Por favor, intenta con otro puerto libre, por ejemplo:`);
        console.error(`  node server.js 8001\n`);
    } else {
        console.error(`Error en el servidor:`, err);
    }
});
