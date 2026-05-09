// Basic service worker for PWA installability
const CACHE_NAME = 'tripsplit-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Pass-through fetch (network first)
  event.respondWith(fetch(event.request));
});
