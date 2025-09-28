// Nombre del caché
const cacheName = 'helloWorld-v1';

// Archivos que se deben cachear
const archivosACachear = [
  '/pwa2/',
  '/pwa2/index.html',
  '/pwa2/manifest.json',
  '/pwa2/lib1.js',
  '/pwa2/lib2.js',
  '/pwa2/hola.jpg',
  '/pwa2/unicorn.jpg',
  '/pwa2/utp.png',
  '/pwa2/iconos/homescreen144.png',
  '/pwa2/iconos/homescreen192.png'
  // puedes agregar más si tienes
];

// Evento de instalación del SW: guarda archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(archivosACachear))
  );
});

// Evento fetch: responde desde caché o red
self.addEventListener('fetch', function(event) {
  const url = event.request.url;

  // Redirección personalizada para imágenes
  if (url.endsWith('.jpg')) {
    event.respondWith(fetch('./unicorn.jpg'));
    return;
  }

  if (url.endsWith('.png')) {
    event.respondWith(fetch('./utp.png'));
    return;
  }

  // Caché por defecto
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
  );
});
