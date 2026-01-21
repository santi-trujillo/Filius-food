/**
 * NEWSLETTER FORM HANDLER
 * Manejo del formulario de suscripción del footer
 */

export class Newsletter {
  constructor() {
    this.form = document.getElementById("newsletter-form");
    this.input = this.form?.querySelector(".footer__newsletter-input");
    this.button = this.form?.querySelector(".footer__newsletter-button");

    this.init();
  }

  /**
   * Inicializar newsletter
   */
  init() {
    if (!this.form) {
      console.warn("⚠️ Formulario de newsletter no encontrado");
      return;
    }

    this.bindEvents();
  }

  /**
   * Vincular eventos
   */
  bindEvents() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  /**
   * Manejar envío del formulario
   * @param {Event} e - Evento de submit
   */
  async handleSubmit(e) {
    e.preventDefault();

    const email = this.input.value.trim();

    if (!this.validateEmail(email)) {
      this.showMessage("Por favor ingresa un email válido", "error");
      return;
    }

    // Deshabilitar botón durante el envío
    this.button.disabled = true;
    this.button.textContent = "Enviando...";

    try {
      // Aquí iría la lógica de envío al backend
      // Por ahora simulamos un delay
      await this.simulateApiCall();

      this.showMessage("¡Gracias por suscribirte!", "success");
      this.form.reset();
    } catch (error) {
      console.error("Error al suscribir:", error);
      this.showMessage("Ocurrió un error. Intenta nuevamente.", "error");
    } finally {
      // Restaurar botón
      this.button.disabled = false;
      this.button.textContent = "Suscríbete";
    }
  }

  /**
   * Validar email
   * @param {string} email - Email a validar
   * @returns {boolean}
   */
  validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  /**
   * Mostrar mensaje al usuario
   * @param {string} message - Mensaje a mostrar
   * @param {string} type - Tipo de mensaje ('success' o 'error')
   */
  showMessage(message, type) {
    // Crear elemento de mensaje
    const messageEl = document.createElement("div");
    messageEl.textContent = message;
    messageEl.className = `newsletter-message newsletter-message--${type}`;
    messageEl.style.cssText = `
      margin-top: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      font-size: 0.875rem;
      text-align: center;
      background-color: ${type === "success" ? "#D4EDDA" : "#F8D7DA"};
      color: ${type === "success" ? "#155724" : "#721C24"};
    `;

    // Remover mensaje anterior si existe
    const oldMessage = this.form.querySelector(".newsletter-message");
    if (oldMessage) {
      oldMessage.remove();
    }

    // Añadir nuevo mensaje
    this.form.appendChild(messageEl);

    // Remover mensaje después de 3 segundos
    setTimeout(() => {
      messageEl.remove();
    }, 3000);
  }

  /**
   * Simular llamada a API
   * @returns {Promise}
   */
  simulateApiCall() {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }
}
