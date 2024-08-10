declare const self: ServiceWorkerGlobalScope;

export const serviceWorker = self;

const REPORTING = false;
const CACHE_NAME = 'blockhaus-cache-v1.0.0';

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/game',
  '/leader-board',
  '/profile',
];

const CACHE_CONTENT_TYPES = ['script', 'style', 'font', 'image', 'manifest'];

const FALLBACK_BODY = `
  <div style="
    display: flex;
    justify-content: center;
    text-align: center;
    font-family: sans-serif;
  ">
    <div>
      <h1 style="font-size: 2em; margin-bottom: 0.5em;">Uh-oh, Looks Like You’re Offline!</h1>
      <p style="font-size: 1.2em; margin-top: 0;">We’ll keep things cozy until you’re back online.</p>
    </div>
  </div>
`;

const FALLBACK_HEADERS = {
  headers: { 'Content-Type': 'text/html; charset=utf-8' },
};
const FETCH_CACHED_TIMEOUT = 5000;
const FETCH_NETWORK_TIMEOUT = 15000;

function logStatus<T>(msg: string, obj: T | null = null) {
  if (REPORTING) {
    console.log(msg, obj);
  }
}

function shouldUseCache(req: Request) {
  if (!req.url.match(/^http/)) {
    return false;
  }

  return !req.url.includes('/api/');
}

function shouldServeCacheInstantly(req: Request) {
  if (CACHE_CONTENT_TYPES.includes(req.destination)) {
    return true;
  }

  return !(
    req.destination === 'document' ||
    req.url[req.url.length - 1] === '/' ||
    req.url.match(/\/[A-Za-z0-9_-]+$/)
  );
}

serviceWorker.addEventListener('install', (event: ExtendableEvent) => {
  logStatus('SW: installing', event);

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => {
        serviceWorker.skipWaiting();
        logStatus('SW: cache added & skipped waiting');
      })
  );
});

serviceWorker.addEventListener('activate', (event: ExtendableEvent) => {
  logStatus('SW: activating', event);

  event.waitUntil(serviceWorker.clients.claim());
});

serviceWorker.addEventListener('fetch', (event: FetchEvent) => {
  if (!shouldUseCache(event.request)) {
    return;
  }

  logStatus('SW: fetching', event.request.url);

  event.respondWith(
    caches
      .open(CACHE_NAME)
      .then(cache =>
        cache.match(event.request).then(cachedResponse => {
          const abortController = new AbortController();
          const abortTimeout = setTimeout(
            () => abortController.abort(),
            cachedResponse ? FETCH_CACHED_TIMEOUT : FETCH_NETWORK_TIMEOUT
          );
          const fetchedResponse = fetch(event.request, {
            signal: abortController.signal,
          })
            .then(networkResponse => {
              clearTimeout(abortTimeout);
              if (
                networkResponse.status >= 200 &&
                networkResponse.status < 300
              ) {
                cache
                  .put(event.request, networkResponse.clone())
                  .catch(cacheError => {
                    logStatus('SW: cache put error', cacheError);
                  });
              }
              return networkResponse;
            })
            .catch(fetchedError => {
              clearTimeout(abortTimeout);
              logStatus('SW: network problem', fetchedError);
              return (
                cachedResponse ?? new Response(FALLBACK_BODY, FALLBACK_HEADERS)
              );
            });

          if (cachedResponse && shouldServeCacheInstantly(event.request)) {
            logStatus('SW: return cached response', event.request.url);
            return cachedResponse;
          }

          logStatus('SW: return network response', event.request.url);
          return fetchedResponse;
        })
      )
      .catch(cacheError => {
        logStatus('SW: cache open error', cacheError);
        return new Response(FALLBACK_BODY, FALLBACK_HEADERS);
      })
  );
});
