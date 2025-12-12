/**
 * STATE MANAGER
 * Gestión de estado global de la aplicación
 * Metodología: Observer Pattern
 */

export class State {
  constructor() {
    this.state = {};
    this.listeners = new Map();
  }

  /**
   * Obtener valor del estado
   * @param {string} key - Clave del estado
   * @returns {*} Valor almacenado
   */
  get(key) {
    return this.state[key];
  }

  /**
   * Establecer valor en el estado
   * @param {string} key - Clave del estado
   * @param {*} value - Valor a guardar
   */
  set(key, value) {
    const oldValue = this.state[key];
    this.state[key] = value;

    // Notificar a los listeners
    this.notify(key, value, oldValue);
  }

  /**
   * Suscribirse a cambios en el estado
   * @param {string} key - Clave a observar
   * @param {Function} callback - Función a ejecutar
   */
  subscribe(key, callback) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, []);
    }

    this.listeners.get(key).push(callback);
  }

  /**
   * Notificar a los listeners
   * @param {string} key - Clave modificada
   * @param {*} newValue - Nuevo valor
   * @param {*} oldValue - Valor anterior
   */
  notify(key, newValue, oldValue) {
    if (this.listeners.has(key)) {
      this.listeners.get(key).forEach((callback) => {
        callback(newValue, oldValue);
      });
    }
  }
}

// Exportar instancia singleton
export const state = new State();
