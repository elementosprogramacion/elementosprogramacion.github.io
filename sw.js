//cache-control: max-age=0,no-cache,no-store,must-revalidate
const cacheName = 'epUNLaM-v11';
const resourcesToCache = [
  'index.html',
  'unidades.html',
  'secuencial.html',
  'secuencial_ejercicios.html'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) 
       {
        return cache.addAll(resourcesToCache);
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
          if (cacheVieja !== cacheName &&  cacheVieja.startsWith("epUNLaM")) {
            return caches.delete(cacheVieja);
          }
        })
      );
    })
  );
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
