// sw.js
const CACHE_NAME = 'scopone-v7';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon_scopone_scientifico.png'
];

// Install and cache all app shell files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

// Serve cached content when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
