const CACHE_NAME = 'blackscreen-cache'

// Cache on install
self.addEventListener('install', function(event) {
  event.waitUntil(fillCache());
});

// Serve from cache & update
self.addEventListener('fetch', function(evt) {
  evt.respondWith(getFromCache(evt.request));
  evt.waitUntil(updateResource(evt.request));
});

async function fillCache() {
  const cache = await caches.open(CACHE_NAME)
  cache.add('./index.html')
}

async function getFromCache(request) {
  const cache = await caches.open(CACHE_NAME)
  const matching = await cache.match(request)
  return matching || Promise.reject('no-match');
}

async function updateResource(request) {
  const cache = await caches.open(CACHE_NAME)
  const response = await fetch(request)
  return cache.put(request, response)
}
