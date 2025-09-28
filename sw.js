const CACHE_NAME = 'helloWorld-v1';
const FILES_TO_CACHE = [
  './index.html',
  './lib1.js',
  './lib2.js',
  './hola.jpg',
  './unicorn.jpg',
  './utp.png'
];

self.addEventListener('install', event => {
  console.log('[SW] Instalando...');
  event.waitUntil(
    caches.open('helloWorld-v1')
      .then(cache => {
        console.log('[SW] Caché abierto');
        return cache.addAll([
          './index.html',
          './lib1.js',
          './lib2.js',
          './hola.jpg',
          './unicorn.jpg',
          './utp.png'
        ]);
      })
      .catch(err => console.error('[SW] Error al agregar archivos al caché:', err))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('[SW] Activado');
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== 'helloWorld-v1') {
            console.log('[SW] Borrando caché vieja:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
