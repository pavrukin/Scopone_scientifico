// Update the cache name to a new version
const CACHE_NAME = 'cc_state_v3';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon_scopone_scientifico.png'
];

// Install and cache app shell files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting(); // Activate worker immediately
});

// Activate and remove old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim(); // Take control of all clients immediately
});

// Fetch files: serve cache first, then network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

