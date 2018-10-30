var CACHE = 'aresonline-v5';
const staticAssets = [
  './',
  './app.js',
  './manifest.json',
  './favicon.ico',
  './assets/img/brand/blue.png',
  './assets/funciones.js',
  './assets/js/argon.js',
  './assets/vendor/nucleo/css/nucleo.css',
  './assets/vendor/@fortawesome/fontawesome-free/css/all.min.css',
  './assets/css/argon.css',
  './assets/vendor/jquery/dist/jquery.min.js',
  './assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js',
  './assets/vendor/chart.js/dist/Chart.min.js',
  './assets/vendor/chart.js/dist/Chart.extension.js',
  './index.html',
  './sw.js'
];

self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');
  evt.waitUntil(caches.open(CACHE).then(function (cache) {
    cache.addAll(staticAssets);
  }));
});

self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.');
  evt.respondWith(fromCache(evt.request));
  evt.waitUntil(
    update(evt.request)
    .then(refresh)
  );
});

function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request);
  });
}

function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response.clone()).then(function () {
        return response;
        console.log('Cache actualizado');
      });
    });
  });
}

function refresh(response) {
  return self.clients.matchAll().then(function (clients) {
    clients.forEach(function (client) {
      var message = {
        type: 'refresh',
        url: response.url,
        eTag: response.headers.get('ETag')
      };
      client.postMessage(JSON.stringify(message));
    });
  });
}