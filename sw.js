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
var cacheName = 'pwa2-v2';

var filesToCache = [
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
];

self.addEventListener('install', event => {
  console.log('Service Worker: Instalando...');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return Promise.all(
          filesToCache.map(url => {
            return cache.add(url).catch(err => {
              console.warn('⚠️ No se pudo cachear', url, err);
            });
          })
        );
      })
  );
});

