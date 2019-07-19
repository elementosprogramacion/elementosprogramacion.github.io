const cacheName = 'ep-190719-1129';
const resourcesToCache = [
  'index.html',
  'unidades.html',
  'secuencial.html',
  'secuencial_ejercicios.html'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(resourcesToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
