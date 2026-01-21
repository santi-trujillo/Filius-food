// Service Worker para Filius Food - PWA + Cache Strategy
// Versión: 1.0.0

const CACHE_NAME = "filius-food-v1";
const CACHE_VERSION = "1.0.0";

// Assets críticos para cachear inmediatamente (Cache First)
const PRECACHE_ASSETS = [
  "/",
  "/index.html",
  "/css/main.css",
  "/js/main.js",
  "/js/core/router.js",

  "/assets/images/logo.svg",
  "/assets/images/hero-home.webp",
  "/data/products.json",
  "/manifest.json",
];

// Assets dinámicos (Network First, fallback a cache)
const DYNAMIC_CACHE = "filius-food-dynamic-v1";

// Instalación del Service Worker
self.addEventListener("install", (event) => {
  console.log("[SW] Installing Service Worker v" + CACHE_VERSION);

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[SW] Precaching assets");
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting()) // Activar inmediatamente
  );
});

// Activación del Service Worker
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating Service Worker v" + CACHE_VERSION);

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Eliminar caches viejas
            if (cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE) {
              console.log("[SW] Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim()) // Tomar control inmediato
  );
});

// Estrategia de Fetch
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo cachear requests del mismo origen
  if (url.origin !== location.origin) {
    return;
  }

  // Estrategia según tipo de recurso
  if (isStaticAsset(url.pathname)) {
    // Cache First para assets estáticos (CSS, JS, imágenes)
    event.respondWith(cacheFirst(request));
  } else if (isAPIRequest(url.pathname)) {
    // Network First para API/datos (products.json)
    event.respondWith(networkFirst(request));
  } else {
    // Stale While Revalidate para HTML
    event.respondWith(staleWhileRevalidate(request));
  }
});

// Cache First Strategy (para CSS, JS, imágenes)
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  if (cached) {
    return cached; // Devolver inmediatamente del cache
  }

  try {
    const response = await fetch(request);
    // Cachear la nueva respuesta
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error("[SW] Cache First failed:", error);
    // Intentar devolver offline fallback
    return caches.match("/offline.html") || new Response("Offline");
  }
}

// Network First Strategy (para datos dinámicos)
async function networkFirst(request) {
  const cache = await caches.open(DYNAMIC_CACHE);

  try {
    const response = await fetch(request);
    // Actualizar cache con nueva data
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Fallback a cache si falla la red
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    throw error;
  }
}

// Stale While Revalidate (para HTML)
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  // Fetch en background para actualizar cache
  const fetchPromise = fetch(request).then((response) => {
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  });

  // Devolver cache si existe, sino esperar fetch
  return cached || fetchPromise;
}

// Helpers
function isStaticAsset(pathname) {
  return pathname.match(
    /\.(css|js|jpg|jpeg|png|gif|svg|webp|woff|woff2|ttf|ico)$/
  );
}

function isAPIRequest(pathname) {
  return pathname.includes("/data/") || pathname.includes("/api/");
}

// Sincronización en background (opcional, para futuras features)
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-products") {
    event.waitUntil(syncProducts());
  }
});

async function syncProducts() {
  try {
    const response = await fetch("/data/products.json");
    const cache = await caches.open(DYNAMIC_CACHE);
    await cache.put("/data/products.json", response);
    console.log("[SW] Products synced");
  } catch (error) {
    console.error("[SW] Sync failed:", error);
  }
}

// Mensajes desde el cliente
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

  if (event.data && event.data.type === "CACHE_URLS") {
    event.waitUntil(
      caches.open(DYNAMIC_CACHE).then((cache) => {
        return cache.addAll(event.data.payload);
      })
    );
  }
});
