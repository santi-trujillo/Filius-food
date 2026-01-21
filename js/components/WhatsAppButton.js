/**
 * WHATSAPP BUTTON COMPONENT
 * Botón flotante de WhatsApp con mensaje predefinido
 * Metodología: BEM + Progressive Enhancement
 */

import { WHATSAPP_CONFIG } from "../config/constants.js";

export class WhatsAppButton {
  constructor() {
    this.button = document.querySelector(".whatsapp-float");
    this.init();
  }

  /**
   * Inicializar componente
   */
  init() {
    if (!this.button) {
      console.warn("⚠️ Botón de WhatsApp no encontrado");
      return;
    }

    this.enhanceButton();
  }

  /**
   * Mejorar botón con JavaScript
   */
  enhanceButton() {
    // El enlace ya funciona sin JS, solo mejoramos con analytics
    this.button.addEventListener("click", (e) => {
      this.trackClick();
    });

    // Añadir animación de entrada
    setTimeout(() => {
      this.button.classList.add("whatsapp-float--visible");
    }, 1000);
  }

  /**
   * Generar URL de WhatsApp con mensaje predefinido
   * @param {string} customMessage - Mensaje personalizado (opcional)
   * @returns {string} URL completa
   */
  static generateURL(customMessage = null) {
    const message = customMessage || WHATSAPP_CONFIG.defaultMessage;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodedMessage}`;
  }

  /**
   * Rastrear click para analytics
   */
  trackClick() {
    // Implementar analytics si está disponible
    if (typeof gtag !== "undefined") {
      gtag("event", "click", {
        event_category: "WhatsApp",
        event_label: "Floating Button",
      });
    }
  }
}
