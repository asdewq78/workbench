// Service Worker — 离线缓存
const CACHE_NAME = 'workbench-v1';

const CACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.jsdelivr.net/npm/vue@3.4.0/dist/vue.global.prod.js'
];

// Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching resources');
      return cache.addAll(CACHE_URLS).catch(err => {
        console.log('[SW] Some resources failed to cache (may be offline):', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch — cache-first for CDN, network-first for local
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // CDN resources: cache-first
  if (url.hostname.includes('jsdelivr.net') || url.hostname.includes('unpkg.com')) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return cached || fetch(event.request).then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
    return;
  }

  // Local resources: network-first, fallback to cache
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
