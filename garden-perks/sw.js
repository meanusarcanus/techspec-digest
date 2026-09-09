const CACHE_NAME = 'garden-perks-v1';
const PRECACHE_URLS = [
  '/techspec-digest/garden-perks/',
  '/techspec-digest/garden-perks/manifest.json',
  '/techspec-digest/garden-perks/icons/icon-192.svg',
  '/techspec-digest/garden-perks/icons/icon-512.svg'
];

// Install: Cache essential core shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch((err) => {
        console.warn('[Garden Perks SW] Pre-cache warning:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate: Clean up older cache versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Stale-While-Revalidate with offline resilience
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Only handle GET requests and http/https schemes
  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    return;
  }

  // Handle static assets & pages
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // Return cached response if found, but fetch a fresh copy in the background
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // If offline and request is a navigation, return cached home page
          if (request.mode === 'navigate') {
            return caches.match('/techspec-digest/garden-perks/');
          }
        });

      return cachedResponse || fetchPromise;
    })
  );
});
