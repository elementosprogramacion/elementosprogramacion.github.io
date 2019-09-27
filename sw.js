const cacheActual = 'epUNLaM-v4';


const paginasModificadas = [
  'oldindex.html'
    
];

const recursosACopiar = [
  'css/materialize.min.css',
  'js/materialize.min.js',
  'icons/apoyo.svg',
  'icons/catedra.svg',
  'icons/consultas.svg',
  'icons/ejercicios.svg',
  'icons/expandir.svg',
  'icons/herramientas.svg',
  'icons/home.svg',
  'icons/icon192.png',
  'icons/icon512.png',
  'icons/linkweb.svg',
  'icons/list.svg',
  'icons/logo.svg',
  'icons/pdf.svg',
  'icons/programados.svg',
  'icons/ProgramadosApaisado.svg',
  'icons/seleccionar.svg',
  'icons/teoricos.svg',
  'icons/unidades.svg',
  'icons/videos.svg',
  'icons/volver.svg'  
];



self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(cacheActual).then(function(cache) {
      var newImmutableRequests = [];
      return Promise.all(
        recursosACopiar.map(function(url) {
          return caches.match(url).then(function(response) {
            if (response) {
              return cache.put(url, response);
            } else {
              newImmutableRequests.push(url);
              return Promise.resolve();
            }
          });
        })
      ).then(function() {
        return cache.addAll(newImmutableRequests.concat(paginasModificadas));
      });
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
          if (cacheVieja !== cacheActual) 	  //&& cacheVieja.startsWith("epUNLaM")) {
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

var immutableRequests = [
  "/fancy_header_background.mp4",
  "/vendor/bootstrap/3.3.7/bootstrap.min.css",
  "/css/style-v355.css"
];
var mutableRequests = [
  "app-settings.json",
  "index.html"
];



self.addEventListener('install', function(event) 
{
  event.waitUntil
  (
    caches.open(cachePaginas).then(function(cache) 
       {
        return cache.addAll(paginasCache);
       })
  );
  

});


self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open("cache-v2").then(function(cache) {
      var newImmutableRequests = [];
      return Promise.all(
        immutableRequests.map(function(url) {
          return caches.match(url).then(function(response) {
            if (response) {
              return cache.put(url, response);
            } else {
              newImmutableRequests.push(url);
              return Promise.resolve();
            }
          });
        })
      ).then(function() {
        return cache.addAll(newImmutableRequests.concat(mutableRequests));
      });
    })
  );
});

*/
