/**
 * ROUTER
 * Manejo de navegación SPA (Single Page Application)
 * Metodología: Hash-based routing
 */

export class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.init();
  }

  /**
   * Inicializar router
   */
  init() {
    // Escuchar cambios en el hash
    window.addEventListener("hashchange", () => this.handleRouteChange());

    // Manejar ruta inicial
    this.handleRouteChange();
  }

  /**
   * Registrar una ruta
   * @param {string} path - Ruta (ej: '#inicio', '#postres')
   * @param {Function} handler - Función a ejecutar
   */
  register(path, handler) {
    this.routes.set(path, handler);
  }

  /**
   * Manejar cambio de ruta
   */
  handleRouteChange() {
    const hash = window.location.hash || "#inicio";

    // Ocultar todas las páginas
    document.querySelectorAll(".page").forEach((page) => {
      page.classList.remove("page--active");
    });

    // Mostrar página correspondiente
    const targetPage = document.querySelector(
      `[data-page="${hash.substring(1)}"]`
    );

    if (targetPage) {
      targetPage.classList.add("page--active");
    }

    // Ejecutar handler si existe
    if (this.routes.has(hash)) {
      this.routes.get(hash)();
    }

    // Actualizar ruta actual
    this.currentRoute = hash;

    // Actualizar active state en navegación
    this.updateActiveNav(hash);

    // Scroll al inicio de la página
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /**
   * Actualizar navegación activa
   * @param {string} hash - Hash actual
   */
  updateActiveNav(hash) {
    // Remover clase active de todos los enlaces de navegación
    document.querySelectorAll(".nav__link").forEach((link) => {
      link.classList.remove("nav__link--active");
    });

    // Remover clase active del bottom-bar
    document.querySelectorAll(".bottom-bar__item").forEach((item) => {
      item.classList.remove("bottom-bar__item--active");
    });

    // Añadir clase active a los enlaces correspondientes
    document.querySelectorAll(`a[href="${hash}"]`).forEach((link) => {
      if (link.classList.contains("nav__link")) {
        link.classList.add("nav__link--active");
      }
      if (link.classList.contains("bottom-bar__item")) {
        link.classList.add("bottom-bar__item--active");
      }
    });
  }

  /**
   * Navegar a una ruta programáticamente
   * @param {string} path - Ruta destino
   */
  navigate(path) {
    window.location.hash = path;
  }
}
