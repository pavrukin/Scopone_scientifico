const CACHE_NAME = 'scopone-v6';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon_scopone_scientifico.png',
  './app.js',    // add your JS if needed
  './style.css'  // add your CSS if needed
];

// Install and cache all app shell files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting(); // activate new SW immediately
});

// Activate: remove old caches
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
  self.clients.claim(); // take control of all pages immediately
});

// Fetch files: serve cache first, then network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
