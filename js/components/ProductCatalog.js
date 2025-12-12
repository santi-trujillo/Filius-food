/**
 * PRODUCT CATALOG COMPONENT
 * Manejo dinámico del catálogo de productos
 */

export class ProductCatalog {
  constructor(containerId, category = "all") {
    this.container = document.querySelector(containerId);
    this.category = category;
    this.products = [];
    this.currentPage = 1;
    this.productsPerPage = 8;

    if (this.container) {
      this.init();
    }
  }

  /**
   * Inicializar catálogo
   */
  async init() {
    await this.loadProducts();
    this.render();
    this.initLazyLoading();
  }

  /**
   * Inicializar Lazy Loading optimizado para imágenes de productos
   */
  initLazyLoading() {
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.dataset.src;

            if (src) {
              img.src = src;
              img.classList.add("lazy-loaded");
              observer.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: "100px", // Cargar 100px antes de que sea visible
        threshold: 0.01,
      }
    );

    // Observar todas las imágenes lazy
    const lazyImages = this.container.querySelectorAll(".lazy-image");
    lazyImages.forEach((img) => imageObserver.observe(img));
  }

  /**
   * Cargar productos desde JSON
   */
  async loadProducts() {
    try {
      const response = await fetch("/data/products.json");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Filtrar por categoría
      if (this.category === "destacados") {
        // Solo productos destacados
        this.products = data.products.filter((p) => p.featured);
      } else if (this.category === "all") {
        // Todos los productos
        this.products = data.products;
      } else {
        // Filtrar por categoría específica
        this.products = data.products.filter(
          (p) => p.category === this.category
        );
      }
    } catch (error) {
      console.error("Error cargando productos:", error);
      this.showErrorMessage();
    }
  }

  /**
   * Mostrar mensaje de error con opción de recarga
   */
  showErrorMessage() {
    this.container.innerHTML = `
      <div class="error-message" style="
        grid-column: 1 / -1;
        text-align: center;
        padding: 4rem 2rem;
        background-color: #FFF3F3;
        border: 2px solid #FFCDD2;
        border-radius: 12px;
        margin: 2rem 0;
      ">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" style="margin: 0 auto 1rem;">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#C73E3A"/>
        </svg>
        <p style="font-size: 1.25rem; color: #C73E3A; margin-bottom: 1.5rem; font-weight: 600;">
          ⚠️ No pudimos cargar los productos
        </p>
        <p style="color: #666666; margin-bottom: 2rem;">
          Por favor, verifica tu conexión a internet e intenta nuevamente.
        </p>
        <button 
          onclick="location.reload()" 
          style="
            background-color: #C73E3A;
            color: white;
            border: none;
            padding: 12px 32px;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          "
          onmouseover="this.style.backgroundColor='#A02D2A'"
          onmouseout="this.style.backgroundColor='#C73E3A'"
        >
          🔄 Recargar página
        </button>
      </div>
    `;
  }

  /**
   * Renderizar productos
   */
  render() {
    if (!this.products || this.products.length === 0) {
      this.renderEmpty();
      return;
    }

    const html = this.products
      .slice(0, this.productsPerPage)
      .map((product) => this.renderProductCard(product))
      .join("");

    this.container.innerHTML = html;
  }

  /**
   * Renderizar tarjeta de producto
   * @param {Object} product - Datos del producto
   * @returns {string} HTML de la tarjeta
   */
  renderProductCard(product) {
    const badge = product.featured
      ? '<span class="product-card__badge">Destacado</span>'
      : "";

    return `
      <article class="product-card">
        <div class="product-card__image-wrapper">
          <img 
            data-src="${product.image}" 
            alt="${product.name}"
            class="product-card__image lazy-image"
            loading="lazy"
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect fill='%23f0f0f0' width='800' height='600'/%3E%3C/svg%3E"
          >
          ${badge}
        </div>
        <div class="product-card__content">
          <h3 class="product-card__title">${product.name}</h3>
          <p class="product-card__price">$${this.formatPrice(product.price)}</p>
          <a href="#producto/${product.id}" class="product-card__button">
            Ver detalles
          </a>
        </div>
      </article>
    `;
  }

  /**
   * Renderizar estado vacío
   */
  renderEmpty() {
    this.container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem;">
        <p style="font-size: 1.25rem; color: var(--color-text-light);">
          No hay productos disponibles en esta categoría.
        </p>
      </div>
    `;
  }

  /**
   * Renderizar error
   */
  renderError() {
    this.container.innerHTML = `
      <div class="error-state" style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem;">
        <p style="font-size: 1.25rem; color: var(--color-secondary);">
          Error al cargar los productos. Por favor, intenta nuevamente.
        </p>
      </div>
    `;
  }

  /**
   * Formatear precio
   * @param {number} price - Precio a formatear
   * @returns {string} Precio formateado
   */
  formatPrice(price) {
    return new Intl.NumberFormat("es-CO").format(price);
  }

  /**
   * Actualizar categoría y recargar
   * @param {string} category - Nueva categoría
   */
  async updateCategory(category) {
    this.category = category;
    this.currentPage = 1;
    await this.loadProducts();
    this.render();
  }
}
