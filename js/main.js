/**
 * FILIUS FOOD - MAIN JAVASCRIPT
 * Punto de entrada de la aplicación
 * Metodología: Sistema Modular ES6+ + Progressive Enhancement
 */

import { Router } from "./core/router.js";
import { Navigation } from "./components/Navigation.js";
import { WhatsAppButton } from "./components/WhatsAppButton.js";
import { LazyLoader } from "./components/LazyLoader.js";
import { Newsletter } from "./components/Newsletter.js";
import { ProductCatalog } from "./components/ProductCatalog.js";

/**
 * Clase principal de la aplicación
 */
class App {
  constructor() {
    this.components = {};
    this.init();
  }

  /**
   * Inicialización de la aplicación
   */
  init() {
    // Esperar a que el DOM esté completamente cargado
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () =>
        this.initializeComponents()
      );
    } else {
      this.initializeComponents();
    }
  }

  /**
   * Inicializar todos los componentes
   */
  initializeComponents() {
    try {
      // Componentes core
      this.components.router = new Router();
      this.components.navigation = new Navigation();
      this.components.whatsapp = new WhatsAppButton();
      this.components.lazyLoader = new LazyLoader();
      this.components.newsletter = new Newsletter();

      // Inicializar catálogos de productos
      this.initProductCatalogs();

      // Progressive Enhancement
      this.enhanceUI();
    } catch (error) {
      console.error("❌ Error al inicializar la aplicación:", error);
      this.handleInitializationError(error);
    }
  }

  /**
   * Mejoras progresivas de UI
   */
  enhanceUI() {
    // Añadir clase 'js-enabled' al html
    document.documentElement.classList.add("js-enabled");

    // Smooth scroll para enlaces internos
    this.setupSmoothScroll();
  }

  /**
   * Inicializar catálogos de productos
   */
  initProductCatalogs() {
    // Catálogo de destacados (página inicio)
    const destacadosGrid = document.querySelector(".product-grid--destacados");
    if (destacadosGrid) {
      this.components.destacadosCatalog = new ProductCatalog(
        ".product-grid--destacados",
        "destacados"
      );
    }

    // Catálogo de postres (página postres)
    const postresPage = document.querySelector('[data-page="postres"]');
    if (postresPage) {
      const postresGrid = postresPage.querySelector(".product-grid");
      if (postresGrid) {
        this.components.postresCatalog = new ProductCatalog(
          '[data-page="postres"] .product-grid',
          "postres"
        );
      }
    }

    // Catálogo de sándwiches (página sanduches)
    const sanduchesPage = document.querySelector('[data-page="sanduches"]');
    if (sanduchesPage) {
      const sanduchesGrid = sanduchesPage.querySelector(".product-grid");
      if (sanduchesGrid) {
        this.components.sanduchesCatalog = new ProductCatalog(
          '[data-page="sanduches"] .product-grid',
          "sanduches"
        );
      }
    }
  }

  /**
   * Configurar scroll suave para navegación interna
   */
  setupSmoothScroll() {
    // En un SPA con hash routing, no necesitamos smooth scroll manual
    // El router se encarga de la navegación y hace scroll al tope
    // Este método se mantiene vacío para futuras mejoras si son necesarias
  }

  /**
   * Manejar errores de inicialización
   */
  handleInitializationError(error) {
    // Mostrar mensaje de error al usuario
    const errorDiv = document.createElement("div");
    errorDiv.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #C73E3A;
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      z-index: 10000;
      font-family: system-ui, sans-serif;
    `;
    errorDiv.textContent =
      "Error al cargar la aplicación. Por favor, recarga la página.";
    document.body.appendChild(errorDiv);

    // Ocultar después de 5 segundos
    setTimeout(() => errorDiv.remove(), 5000);
  }
}

// Inicializar aplicación
const app = new App();

// Exportar para uso global si es necesario
export default app;
