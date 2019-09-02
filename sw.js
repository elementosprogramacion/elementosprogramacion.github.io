importScripts('cache.adderall.js');

const cachePaginas = 'epUNLaM-v2';
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
        return adderall.addAll(cache, paginasCache);
       })
  );
  
  event.waitUntil
  (
    caches.open(cacheFija).then(function(cache) 
       {
        return adderall.addAll(cache,recursosEstaticos);
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
