// Service Worker for Portfolio Site
// Version 1.2 - Enhanced caching for Spline models and assets

const CACHE_NAME = 'portfolio-cache-v1.2';
const SPLINE_CACHE = 'spline-models-v1.0';
const STATIC_CACHE = 'static-assets-v1.0';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/src/main.jsx',
  '/src/index.css',
  // Add other critical assets
];

// Spline-related URLs to cache
const SPLINE_PATTERNS = [
  /prod\.spline\.design/,
  /\.splinecode$/,
  /spline.*\.(bin|gltf|glb|wasm)$/
];

// Network-first strategy for critical assets
const NETWORK_FIRST = [
  /\/api\//,
  /firebasestorage\.googleapis\.com/
];

// Cache-first strategy for static assets
const CACHE_FIRST = [
  /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/,
  /\.(bin|gltf|glb)$/
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE).then(cache => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS.filter(url => url !== '/'));
      }),
      // Initialize Spline cache
      caches.open(SPLINE_CACHE).then(cache => {
        console.log('Service Worker: Initialized Spline cache');
        return Promise.resolve();
      })
    ]).then(() => {
      console.log('Service Worker: Installation complete');
      self.skipWaiting();
    })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Delete old caches
          if (cacheName !== CACHE_NAME && 
              cacheName !== SPLINE_CACHE && 
              cacheName !== STATIC_CACHE) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activation complete');
      self.clients.claim();
    })
  );
});

// Fetch event - handle caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Handle different types of requests
  if (isSplineAsset(url)) {
    event.respondWith(handleSplineAsset(request));
  } else if (isStaticAsset(url)) {
    event.respondWith(handleStaticAsset(request));
  } else if (isNetworkFirst(url)) {
    event.respondWith(handleNetworkFirst(request));
  } else {
    event.respondWith(handleDefault(request));
  }
});

// Check if URL is a Spline asset
function isSplineAsset(url) {
  return SPLINE_PATTERNS.some(pattern => pattern.test(url.href));
}

// Check if URL is a static asset
function isStaticAsset(url) {
  return CACHE_FIRST.some(pattern => pattern.test(url.pathname));
}

// Check if URL requires network-first strategy
function isNetworkFirst(url) {
  return NETWORK_FIRST.some(pattern => pattern.test(url.href));
}

// Handle Spline assets with special caching
async function handleSplineAsset(request) {
  const cache = await caches.open(SPLINE_CACHE);
  
  try {
    // Try cache first for Spline assets (they don't change often)
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      console.log('Service Worker: Serving Spline asset from cache:', request.url);
      
      // Update cache in background if asset is older than 24 hours
      const cacheDate = cachedResponse.headers.get('sw-cache-date');
      if (cacheDate && (Date.now() - parseInt(cacheDate)) > 24 * 60 * 60 * 1000) {
        updateSplineAssetInBackground(request, cache);
      }
      
      return cachedResponse;
    }
    
    // Fetch from network with timeout
    console.log('Service Worker: Fetching Spline asset from network:', request.url);
    const networkResponse = await fetchWithTimeout(request, 10000);
    
    if (networkResponse && networkResponse.ok) {
      // Add custom header for cache date tracking
      const responseToCache = new Response(networkResponse.body, {
        status: networkResponse.status,
        statusText: networkResponse.statusText,
        headers: {
          ...Object.fromEntries(networkResponse.headers.entries()),
          'sw-cache-date': Date.now().toString()
        }
      });
      
      cache.put(request, responseToCache.clone());
      console.log('Service Worker: Cached Spline asset:', request.url);
      
      return networkResponse;
    }
    
    throw new Error('Network response not ok');
    
  } catch (error) {
    console.warn('Service Worker: Spline asset fetch failed:', error);
    
    // Try to serve stale cache as fallback
    const staleResponse = await cache.match(request);
    if (staleResponse) {
      console.log('Service Worker: Serving stale Spline asset:', request.url);
      return staleResponse;
    }
    
    // Return offline fallback
    return new Response(
      JSON.stringify({ error: 'Asset unavailable offline' }),
      { 
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Handle static assets (cache-first)
async function handleStaticAsset(request) {
  const cache = await caches.open(STATIC_CACHE);
  
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    // Update cache in background for dynamic assets
    if (!request.url.includes('static/')) {
      updateAssetInBackground(request, cache);
    }
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.warn('Service Worker: Static asset fetch failed:', error);
    return new Response('Asset unavailable', { status: 404 });
  }
}

// Handle network-first requests
async function handleNetworkFirst(request) {
  try {
    const networkResponse = await fetchWithTimeout(request, 5000);
    
    if (networkResponse && networkResponse.ok) {
      // Cache successful responses
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.warn('Service Worker: Network-first fetch failed, trying cache:', error);
    
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return new Response('Service unavailable', { status: 503 });
  }
}

// Default handler
async function handleDefault(request) {
  try {
    return await fetch(request);
  } catch (error) {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    return cachedResponse || new Response('Not found', { status: 404 });
  }
}

// Utility: Fetch with timeout
function fetchWithTimeout(request, timeout = 8000) {
  return Promise.race([
    fetch(request),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeout)
    )
  ]);
}

// Background update for Spline assets
async function updateSplineAssetInBackground(request, cache) {
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      const responseToCache = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: {
          ...Object.fromEntries(response.headers.entries()),
          'sw-cache-date': Date.now().toString()
        }
      });
      await cache.put(request, responseToCache);
      console.log('Service Worker: Updated Spline asset in background:', request.url);
    }
  } catch (error) {
    console.warn('Service Worker: Background update failed:', error);
  }
}

// Background update for regular assets
async function updateAssetInBackground(request, cache) {
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      await cache.put(request, response.clone());
    }
  } catch (error) {
    console.warn('Service Worker: Background asset update failed:', error);
  }
}

// Handle messages from main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_SPLINE_CACHE') {
    caches.delete(SPLINE_CACHE).then(() => {
      console.log('Service Worker: Cleared Spline cache');
      event.ports[0].postMessage({ success: true });
    });
  }
  
  if (event.data && event.data.type === 'GET_CACHE_SIZE') {
    getCacheSize().then(size => {
      event.ports[0].postMessage({ size });
    });
  }
});

// Utility: Get total cache size
async function getCacheSize() {
  const cacheNames = await caches.keys();
  let totalSize = 0;
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();
    
    for (const request of requests) {
      const response = await cache.match(request);
      if (response) {
        const blob = await response.blob();
        totalSize += blob.size;
      }
    }
  }
  
  return totalSize;
}

console.log('Service Worker: Script loaded');