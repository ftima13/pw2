const CACHE_NAME = 'helloWorld-v1';
const FILES_TO_CACHE = [
  './index.html',
  './lib1.js',
  './lib2.js',
  './hola.jpg',
  './unicorn.jpg',
  './utp.png'
];

// Instalar SW y guardar archivos en caché
self.addEventListener('install', function(event) {
  console.log('[SW] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caché abierto');
        return cache.addAll(FILES_TO_CACHE);
      })
      .catch(err => {
        console.error('[SW] Error al agregar archivos al caché:', err);
      })
  );
  self.skipWaiting();
});

// Activar SW (limpiar cachés viejos)
self.addEventListener('activate', function(event) {
  console.log('[SW] Activado');
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.map(function(key) {
          if (key !== CACHE_NAME) {
            console.log('[SW] Borrando caché viejo:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Manejo de fetch
self.addEventListener('fetch', function(event) {
  const url = event.request.url;

  // Redirección de imágenes
  if (url.endsWith('.jpg')) {
    event.respondWith(fetch('./unicorn.jpg'));
    return;
  }

  if (url.endsWith('.png')) {
    event.respondWith(fetch('./utp.png'));
    return;
  }

  // Respuesta desde caché o red
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
