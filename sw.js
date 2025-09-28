self.addEventListener('fetch',
  function(evento) {
    // http://localhost/index.jpg > unicorn.jpg
    // http://localhost/index.jpeg > utp.png
    console.log(evento.request.url);
    if(/\.jpg$/.test(evento.request.url)) {
      evento.respondWith(
        fetch('atardecer.jpg')
      );
    }
   
    else if(/\.png$/.test(evento.request.url)) {
      evento.respondWith(
        fetch('utp.png')
      );
    }
  }
);
// Nombre del caché
var cacheName = 'helloWorld';

// Evento de instalación del SW: cachea archivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([
        '/pwa2/index.html',
        '/pwa2/lib1.js',
        '/pwa2/lib2.js',
        '/pwa2/hola.jpg',
        '/pwa2/unicorn.jpg',
        '/pwa2/utp.png',
      ]))
  );
});

// Evento fetch: responde desde la caché si existe
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response; // Devuelve desde caché
      }
      return fetch(event.request); // Si no está en caché, va a la red
    })
  );
});


