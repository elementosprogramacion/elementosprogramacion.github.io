//cache-control: max-age=0,no-cache,no-store,must-revalidate
const cachePaginas = 'epUNLaM-v1';
const cacheFija = 'epUNLaMEstatica-v0';

const paginasCache = [
  'index.html',
  'unidades.html',
  'secuencial.html',
  'secuencial_ejercicios.html'  
];

const recursosEstaticos = [
  'css/materialize.min.css',
  'css/estilos.css',
  'js/materialize.min.js'  
];

self.addEventListener('install', function(event) 
{
  event.waitUntil
  (
    caches.open(cachePaginas).then(function(cache) 
       {
        return cache.adderall(paginasCache);
       })
  );
  
  event.waitUntil
  (
    caches.open(cacheFija).then(function(cache) 
       {
        return cache.adderall(recursosEstaticos);
       })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});



self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheVieja) {
          if (cacheVieja !== cachePaginas && cacheVieja !== cacheFija) 	  //&& cacheVieja.startsWith("epUNLaM")) {
		  {		
            return caches.delete(cacheVieja);
          }
        })
      );
    })
  );
  return self.clients.claim(); //fuerza que todos los clientes se actualicen
});


/*
self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheVieja) {
          if (cacheVieja !== cachePaginas &&  cacheVieja.startsWith("epUNLaM")) {
            return caches.delete(cacheVieja);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

/*
self.addEventListener('activate', function(event) 
{
  var version = 'v7';
  event.waitUntil(
    caches.keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames
            .map(c => c.split('-'))
            .filter(c => c[0] === 'epUNLaM')
            .filter(c => c[1] !== version)
            .map(c => caches.delete(c.join('-')))
        )
      )
  );
  });


self.addEventListener('activate', function(event) 
{
  var version = 'v3';
  event.waitUntil(
    caches.keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames
            .map(c => c.split('-'))
            .filter(c => c[0] === 'epUNLaM')
            .filter(c => c[1] !== version)
            .map(c => caches.delete(c.join('-')))
        )
      )
  );
  });



self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
*/
