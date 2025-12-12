/**
 * Utilidades de Performance para Filius Food
 * Debounce, Throttle, Lazy Execution, Memoization
 */

/**
 * Debounce - Retrasa la ejecución hasta que pasen X ms sin llamadas
 * Uso: Búsqueda en tiempo real, resize events
 * @param {Function} func - Función a ejecutar
 * @param {Number} wait - Milisegundos de espera
 * @param {Boolean} immediate - Ejecutar en el primer call
 * @returns {Function}
 */
export function debounce(func, wait = 300, immediate = false) {
  let timeout;

  return function executedFunction(...args) {
    const context = this;

    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

/**
 * Throttle - Limita ejecuciones a 1 cada X ms
 * Uso: Scroll events, mousemove, resize
 * @param {Function} func - Función a ejecutar
 * @param {Number} limit - Milisegundos entre ejecuciones
 * @returns {Function}
 */
export function throttle(func, limit = 100) {
  let inThrottle;
  let lastResult;

  return function executedFunction(...args) {
    const context = this;

    if (!inThrottle) {
      lastResult = func.apply(context, args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }

    return lastResult;
  };
}

/**
 * Memoization - Cachea resultados de funciones puras
 * Uso: Cálculos costosos que se repiten
 * @param {Function} func - Función a memoizar
 * @returns {Function}
 */
export function memoize(func) {
  const cache = new Map();

  return function memoized(...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = func.apply(this, args);
    cache.set(key, result);

    return result;
  };
}

/**
 * Lazy Execution - Ejecuta función solo cuando es necesario
 * Uso: Componentes que pueden no ser vistos
 * @param {Function} func - Función a ejecutar
 * @param {Object} options - Opciones de Intersection Observer
 * @returns {Function}
 */
export function lazyExecute(func, options = {}) {
  const defaultOptions = {
    root: null,
    rootMargin: "50px",
    threshold: 0.1,
  };

  const config = { ...defaultOptions, ...options };

  return function (element) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          func.call(this, element);
          observer.unobserve(element);
        }
      });
    }, config);

    observer.observe(element);
  };
}

/**
 * Request Animation Frame Throttle - Optimiza para animaciones
 * Uso: Scroll parallax, animaciones basadas en scroll
 * @param {Function} func - Función a ejecutar
 * @returns {Function}
 */
export function rafThrottle(func) {
  let rafId = null;

  return function rafThrottled(...args) {
    const context = this;

    if (rafId !== null) {
      return;
    }

    rafId = requestAnimationFrame(() => {
      func.apply(context, args);
      rafId = null;
    });
  };
}

/**
 * Batch DOM Reads/Writes - Evita layout thrashing
 * Uso: Múltiples lecturas/escrituras del DOM
 */
export const batch = {
  reads: [],
  writes: [],
  rafId: null,

  read(func) {
    this.reads.push(func);
    this.schedule();
  },

  write(func) {
    this.writes.push(func);
    this.schedule();
  },

  schedule() {
    if (this.rafId !== null) return;

    this.rafId = requestAnimationFrame(() => {
      // Ejecutar todas las lecturas primero
      this.reads.forEach((read) => read());
      this.reads = [];

      // Luego todas las escrituras
      this.writes.forEach((write) => write());
      this.writes = [];

      this.rafId = null;
    });
  },
};

/**
 * Preload Image - Precarga imágenes
 * Uso: Precargar imágenes que se mostrarán pronto
 * @param {String} src - URL de la imagen
 * @returns {Promise}
 */
export function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Preload Multiple Images - Precarga múltiples imágenes
 * @param {Array<String>} srcs - Array de URLs
 * @returns {Promise<Array>}
 */
export function preloadImages(srcs) {
  return Promise.all(srcs.map((src) => preloadImage(src)));
}

/**
 * Idle Callback Wrapper - Ejecuta en tiempo idle del navegador
 * Uso: Tareas no críticas, analytics, prefetching
 * @param {Function} func - Función a ejecutar
 * @param {Object} options - Opciones de requestIdleCallback
 * @returns {Number} - ID del callback
 */
export function runWhenIdle(func, options = {}) {
  if ("requestIdleCallback" in window) {
    return requestIdleCallback(func, options);
  } else {
    // Fallback para navegadores sin soporte
    return setTimeout(func, 1);
  }
}

/**
 * Cancel Idle Callback
 * @param {Number} id - ID del callback
 */
export function cancelIdle(id) {
  if ("cancelIdleCallback" in window) {
    cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
}

/**
 * Load Script Async - Carga scripts de forma asíncrona
 * Uso: Cargar librerías externas sin bloquear
 * @param {String} src - URL del script
 * @param {Object} attrs - Atributos adicionales
 * @returns {Promise}
 */
export function loadScript(src, attrs = {}) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;

    Object.keys(attrs).forEach((key) => {
      script.setAttribute(key, attrs[key]);
    });

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));

    document.head.appendChild(script);
  });
}

/**
 * Prefetch Resource - Prefetch de recursos
 * Uso: Precargar páginas que probablemente visitará el usuario
 * @param {String} url - URL a prefetch
 * @param {String} as - Tipo de recurso (script, style, image, etc)
 */
export function prefetch(url, as = "fetch") {
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = url;
  link.as = as;
  document.head.appendChild(link);
}

/**
 * Optimize Event Listeners - Optimiza event listeners con passive
 * @param {Element} element - Elemento DOM
 * @param {String} event - Nombre del evento
 * @param {Function} handler - Handler function
 * @param {Boolean} passive - Usar passive listener
 */
export function addOptimizedListener(element, event, handler, passive = true) {
  const options = passive ? { passive: true } : false;
  element.addEventListener(event, handler, options);
}

/**
 * Performance Monitor - Mide performance de funciones
 * Uso: Debugging, profiling
 * @param {Function} func - Función a medir
 * @param {String} label - Label para la medición
 * @returns {Function}
 */
export function measurePerformance(func, label = "Function") {
  return function measured(...args) {
    const start = performance.now();
    const result = func.apply(this, args);
    const end = performance.now();

    console.log(`[Performance] ${label}: ${(end - start).toFixed(2)}ms`);

    return result;
  };
}

/**
 * Check if user prefers reduced motion
 * @returns {Boolean}
 */
export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Check if user is on slow connection
 * @returns {Boolean}
 */
export function isSlowConnection() {
  if ("connection" in navigator) {
    const conn =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
    return (
      conn.saveData ||
      conn.effectiveType === "slow-2g" ||
      conn.effectiveType === "2g"
    );
  }
  return false;
}

/**
 * Adaptive Loading - Ajusta calidad según conexión
 * @param {Object} options - Opciones para cada tipo de conexión
 * @returns {*} - Configuración apropiada
 */
export function adaptiveLoading(options) {
  const defaults = {
    "slow-2g": options.low || options.default,
    "2g": options.low || options.default,
    "3g": options.medium || options.default,
    "4g": options.high || options.default,
    default: options.default,
  };

  if ("connection" in navigator) {
    const conn =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
    return defaults[conn.effectiveType] || defaults.default;
  }

  return defaults.default;
}
