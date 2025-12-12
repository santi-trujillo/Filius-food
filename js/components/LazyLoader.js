/**
 * LAZY LOADER COMPONENT
 * Carga diferida de imágenes usando Intersection Observer
 * Metodología: Progressive Enhancement + Performance
 */

export class LazyLoader {
  constructor() {
    this.images = document.querySelectorAll('img[loading="lazy"]');
    this.config = {
      root: null,
      rootMargin: "50px",
      threshold: 0.01,
    };

    this.init();
  }

  /**
   * Inicializar lazy loading
   */
  init() {
    // Verificar soporte de Intersection Observer
    if (!("IntersectionObserver" in window)) {
      console.warn(
        "⚠️ IntersectionObserver no soportado, cargando todas las imágenes"
      );
      this.loadAllImages();
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      this.config
    );

    // Observar todas las imágenes
    this.images.forEach((img) => this.observer.observe(img));
  }

  /**
   * Manejar intersección
   * @param {IntersectionObserverEntry[]} entries - Entradas observadas
   */
  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.loadImage(entry.target);
        this.observer.unobserve(entry.target);
      }
    });
  }

  /**
   * Cargar una imagen
   * @param {HTMLImageElement} img - Elemento de imagen
   */
  loadImage(img) {
    const src = img.dataset.src || img.src;

    if (!src) {
      console.warn("⚠️ Imagen sin src:", img);
      return;
    }

    // Crear nueva imagen para precargar
    const tempImg = new Image();

    tempImg.onload = () => {
      img.src = src;
      img.classList.add("lazy-loaded");
      img.classList.remove("lazy-loading");
    };

    tempImg.onerror = () => {
      console.error(`❌ Error cargando imagen: ${src}`);
      img.classList.add("lazy-error");
      img.alt = img.alt || "Imagen no disponible";
      // Agregar placeholder visual
      img.style.background = "var(--color-gray-300)";
    };

    img.classList.add("lazy-loading");
    tempImg.src = src;
  }

  /**
   * Cargar todas las imágenes (fallback)
   */
  loadAllImages() {
    this.images.forEach((img) => this.loadImage(img));
  }
}
