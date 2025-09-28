// Nombre del caché
const cacheName = 'helloWorld-v1';

// Archivos que se deben cachear
const archivosACachear = [
  './index.html',
  './lib1.js',
  './lib2.js',
  './hola.jpg',
  './unicorn.jpg',
  './utp.png',
  './iconos/homescreen144.jpg',
  './iconos/homescreen144.jpg'
  // puedes agregar más si tienes
];
// Instalar y cachear archivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(archivosACachear))
  );
  self.skipWaiting(); // fuerza activación inmediata
});

// Activar: limpiar cachés antiguos (opcional, buena práctica)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim(); // toma control de todas las páginas
});

// Interceptar peticiones
self.addEventListener('fetch', function(event) {
  const url = event.request.url;

  if (url.endsWith('.jpg')) {
    event.respondWith(fetch('./unicorn.jpg'));
    return;
  }

  if (url.endsWith('.png')) {
    event.respondWith(fetch('./utp.png'));
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
