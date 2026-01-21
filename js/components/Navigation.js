/**
 * NAVIGATION COMPONENT
 * Manejo de navegación y menú hamburguesa
 * Metodología: BEM + Mobile First
 */

export class Navigation {
  constructor() {
    this.nav = document.querySelector(".nav");
    this.navToggle = document.querySelector(".nav__toggle");
    this.navMobileMenu = document.querySelector(".nav__mobile-menu");
    this.navLinks = document.querySelectorAll(".nav__link, .nav__mobile-link");
    this.isOpen = false;

    this.init();
  }

  /**
   * Inicializar navegación
   */
  init() {
    if (!this.nav || !this.navToggle) {
      console.warn("⚠️ Elementos de navegación no encontrados");
      return;
    }

    this.bindEvents();
  }

  /**
   * Vincular eventos
   */
  bindEvents() {
    // Toggle del menú hamburguesa
    this.navToggle.addEventListener("click", () => this.toggle());

    // Cerrar menú al hacer click en un link
    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => this.close());
    });

    // Cerrar menú con tecla Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.close();
      }
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener("click", (e) => {
      if (this.isOpen && !this.nav.contains(e.target)) {
        this.close();
      }
    });
  }

  /**
   * Abrir/cerrar menú
   */
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Abrir menú
   */
  open() {
    this.navMobileMenu.classList.add("nav__mobile-menu--active");
    this.navToggle.classList.add("nav__toggle--active");
    this.navToggle.setAttribute("aria-expanded", "true");
    this.isOpen = true;

    // Prevenir scroll del body
    document.body.style.overflow = "hidden";
  }

  /**
   * Cerrar menú
   */
  close() {
    this.navMobileMenu.classList.remove("nav__mobile-menu--active");
    this.navToggle.classList.remove("nav__toggle--active");
    this.navToggle.setAttribute("aria-expanded", "false");
    this.isOpen = false;

    // Restaurar scroll del body
    document.body.style.overflow = "";
  }
}
