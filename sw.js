self.addEventListener('fetch',
  function(evento) {
    // http://localhost/pwa2/index.jpg > unicorn.jpg
    // http://localhost/pwa2/index.jpeg > utp.png
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
