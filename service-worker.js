const cacheName = 'my-cache';
const filestoCache = [
  '/lp_counter/index.html',
  '/lp_counter/style.css',
  '/lp_counter/script.js',
  '/lp_counter/service-worker.js',
  '/lp_counter/manifest.json',
  '/lp_counter/img/icon-512.png',
  '/lp_counter/img/icon-192.png'
]; 
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll(filestoCache))
  );
});

self.addEventListener('activate', e => self.clients.claim());

self.addEventListener('fetch', e => {
    e.respondWith(
      caches.match(e.request)
      .then(response => response ? response : fetch(e.request))
    )
  });