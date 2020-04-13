const cacheActual = 'epUNLaM-v8';


const paginasModificadas = [
  'u10_vi_archivos.html' ,
  'u10_archivos.html',
  'u8_strings.html',
  'u7_arrays.html',
  'u11_corte_de_control.html',
  'u2_vi_secuencial.html',
  'u2_secuencial.html',
  'u3_lenguajeC.html',
  'u3_vi_lenguajeC.html',
  'u4_vi_decision.html',
  'u4_decision.html'
];

const recursosACopiar = [
  'css/estilos.css',
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
  'icons/volver.svg',
  'icons/menu.svg',
  'favicon.ico' ,
  'adicionales.html' ,
  'catedra.html' ,
  'herramientas.html' ,
  'index.html' ,
  'iteracionCondicionada.html' ,
  'menu.html' ,
  'programados.html' ,
  'u10_ad_archivos.html' ,
  'u10_ej_archivos.html' ,
  'u11_ad_corte_de_control.html' ,
  'u11_ej_corte_de_control.html' ,
  'u1_introduccion.html' ,
  'u1_vi_introduccion.html' ,
  'u2_ad_secuencial.html' ,
  'u2_ej_secuencial.html' ,
  'u2_secuencial.html' ,
  'u3_ad_lenguajeC.html' ,
  'u3_lenguajeC.html' ,
  'u4_decision.html' ,
  'u4_ej_decision.html' ,
  'u5.1_ej_iteracionDefinida.html' ,
  'u5.2_ej_iteracionCondicionada.html' ,
  'u5_iteracion.html' ,
  'u6_ej_funciones.html' ,
  'u6_funciones.html' ,
  'u7.1_ej_vectores.html' ,
  'u7.2_ej_matrices.html' ,
  'u7_ad_arrays.html' ,
  'u7_vi_arrays.html' ,
  'u8_ej_strings.html' ,
  'u8_vi_strings.html' ,
  'u9_ej_estructuras.html' ,
  'u9_estructuras.html' ,
  'unidades.html'
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
          if (cacheVieja !== cacheActual) 	  
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
