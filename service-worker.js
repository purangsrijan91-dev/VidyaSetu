// VidyaSetu Service Worker - Zero-Connectivity Offline Engine (service-worker.js)
const CACHE_NAME = 'vidyasetu-v3';
const CORE_ASSETS = [
  './',
  './index.html',
  './css/styles.css',
  './manifest.json',
  './assets/icon.svg',
  './service-worker.js',
  './sw.js',
  './js/state.js',
  './js/timer.js',
  './js/audio.js',
  './js/storage.js',
  './js/modal.js',
  './js/rag.js',
  './js/voice.js',
  './js/diagnostics.js',
  './js/app.js'
];

// 1. Install Event: Pre-cache all core HTML, CSS, manifest, icons, and modular JS
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[VidyaSetu SW] Pre-caching core assets for zero-connectivity classrooms');
      return cache.addAll(CORE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// 2. Activate Event: Invalidate obsolete caches and claim clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[VidyaSetu SW] Deleting outdated cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Event: Cache-First strategy for instant launching in zero-connectivity environments
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });

        return networkResponse;
      }).catch(() => {
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return caches.match('./index.html');
        }
      });
    })
  );
});
