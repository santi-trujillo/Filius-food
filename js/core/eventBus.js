/**
 * EVENT BUS
 * Sistema centralizado de eventos
 * Metodología: Publish-Subscribe Pattern
 */

export class EventBus {
  constructor() {
    this.events = new Map();
  }

  /**
   * Suscribirse a un evento
   * @param {string} eventName - Nombre del evento
   * @param {Function} callback - Función a ejecutar
   */
  on(eventName, callback) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }

    this.events.get(eventName).push(callback);
  }

  /**
   * Desuscribirse de un evento
   * @param {string} eventName - Nombre del evento
   * @param {Function} callback - Función a remover
   */
  off(eventName, callback) {
    if (!this.events.has(eventName)) return;

    const callbacks = this.events.get(eventName);
    const index = callbacks.indexOf(callback);

    if (index > -1) {
      callbacks.splice(index, 1);
    }
  }

  /**
   * Emitir un evento
   * @param {string} eventName - Nombre del evento
   * @param {*} data - Datos a pasar
   */
  emit(eventName, data) {
    if (!this.events.has(eventName)) return;

    this.events.get(eventName).forEach((callback) => {
      callback(data);
    });
  }

  /**
   * Suscribirse a un evento una sola vez
   * @param {string} eventName - Nombre del evento
   * @param {Function} callback - Función a ejecutar
   */
  once(eventName, callback) {
    const onceWrapper = (data) => {
      callback(data);
      this.off(eventName, onceWrapper);
    };

    this.on(eventName, onceWrapper);
  }
}

// Exportar instancia singleton
export const eventBus = new EventBus();
