/**
 * CONTACT FORM HANDLER
 * Manejo del formulario de contacto
 */

export class ContactForm {
  constructor() {
    this.form = document.getElementById("contact-form");
    this.nameInput = this.form?.querySelector("#name");
    this.emailInput = this.form?.querySelector("#email");
    this.messageInput = this.form?.querySelector("#message");
    this.submitButton = this.form?.querySelector('button[type="submit"]');

    this.init();
  }

  /**
   * Inicializar formulario
   */
  init() {
    if (!this.form) {
      console.warn("⚠️ Formulario de contacto no encontrado");
      return;
    }

    this.bindEvents();
  }

  /**
   * Vincular eventos
   */
  bindEvents() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));

    // Validación en tiempo real
    [this.nameInput, this.emailInput, this.messageInput].forEach((input) => {
      input.addEventListener("blur", () => this.validateField(input));
    });
  }

  /**
   * Manejar envío del formulario
   * @param {Event} e - Evento de submit
   */
  async handleSubmit(e) {
    e.preventDefault();

    // Validar todos los campos
    const isValid = this.validateForm();
    if (!isValid) {
      this.showMessage(
        "Por favor corrige los errores en el formulario",
        "error"
      );
      return;
    }

    // Obtener datos del formulario
    const formData = {
      name: this.nameInput.value.trim(),
      email: this.emailInput.value.trim(),
      message: this.messageInput.value.trim(),
    };

    // Deshabilitar botón durante el envío
    this.submitButton.disabled = true;
    this.submitButton.textContent = "Enviando...";

    try {
      // Aquí iría la lógica de envío al backend
      // Por ahora simulamos un delay
      await this.simulateApiCall(formData);

      this.showMessage(
        "¡Mensaje enviado correctamente! Te responderemos pronto.",
        "success"
      );
      this.form.reset();
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      this.showMessage(
        "Ocurrió un error al enviar el mensaje. Intenta nuevamente.",
        "error"
      );
    } finally {
      // Restaurar botón
      this.submitButton.disabled = false;
      this.submitButton.textContent = "Enviar mensaje";
    }
  }

  /**
   * Validar formulario completo
   * @returns {boolean}
   */
  validateForm() {
    let isValid = true;

    if (!this.validateField(this.nameInput)) isValid = false;
    if (!this.validateField(this.emailInput)) isValid = false;
    if (!this.validateField(this.messageInput)) isValid = false;

    return isValid;
  }

  /**
   * Validar campo individual
   * @param {HTMLElement} input - Input a validar
   * @returns {boolean}
   */
  validateField(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = "";

    if (input === this.nameInput) {
      if (!value) {
        isValid = false;
        errorMessage = "El nombre es requerido";
      } else if (value.length < 3) {
        isValid = false;
        errorMessage = "El nombre debe tener al menos 3 caracteres";
      }
    }

    if (input === this.emailInput) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        isValid = false;
        errorMessage = "El email es requerido";
      } else if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = "Ingresa un email válido";
      }
    }

    if (input === this.messageInput) {
      if (!value) {
        isValid = false;
        errorMessage = "El mensaje es requerido";
      } else if (value.length < 10) {
        isValid = false;
        errorMessage = "El mensaje debe tener al menos 10 caracteres";
      }
    }

    // Mostrar/ocultar error
    this.toggleFieldError(input, errorMessage);

    return isValid;
  }

  /**
   * Mostrar/ocultar error en campo
   * @param {HTMLElement} input - Input
   * @param {string} message - Mensaje de error
   */
  toggleFieldError(input, message) {
    const formGroup = input.closest(".form-group");
    let errorEl = formGroup.querySelector(".field-error");

    if (message) {
      // Mostrar error
      if (!errorEl) {
        errorEl = document.createElement("span");
        errorEl.className = "field-error";
        errorEl.style.cssText = `
          display: block;
          color: var(--color-secondary);
          font-size: 0.875rem;
          margin-top: 0.25rem;
        `;
        formGroup.appendChild(errorEl);
      }
      errorEl.textContent = message;
      input.style.borderColor = "var(--color-secondary)";
    } else {
      // Ocultar error
      if (errorEl) {
        errorEl.remove();
      }
      input.style.borderColor = "";
    }
  }

  /**
   * Mostrar mensaje global
   * @param {string} message - Mensaje
   * @param {string} type - Tipo ('success' o 'error')
   */
  showMessage(message, type) {
    // Crear elemento de mensaje
    const messageEl = document.createElement("div");
    messageEl.textContent = message;
    messageEl.className = `form-message form-message--${type}`;
    messageEl.style.cssText = `
      margin-top: 1rem;
      padding: 1rem;
      border-radius: 4px;
      font-size: 0.875rem;
      text-align: center;
      background-color: ${type === "success" ? "#D4EDDA" : "#F8D7DA"};
      color: ${type === "success" ? "#155724" : "#721C24"};
      border: 1px solid ${type === "success" ? "#C3E6CB" : "#F5C6CB"};
    `;

    // Remover mensaje anterior si existe
    const oldMessage = this.form.querySelector(".form-message");
    if (oldMessage) {
      oldMessage.remove();
    }

    // Añadir nuevo mensaje
    this.form.appendChild(messageEl);

    // Remover mensaje después de 5 segundos
    setTimeout(() => {
      messageEl.remove();
    }, 5000);
  }

  /**
   * Simular llamada a API
   * @param {Object} data - Datos del formulario
   * @returns {Promise}
   */
  simulateApiCall(data) {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  }
}
