/**
 * DOM UTILITIES
 * Helpers para manipulación del DOM
 */

/**
 * Selector múltiple simplificado
 * @param {string} selector - Selector CSS
 * @param {Element} context - Contexto de búsqueda
 * @returns {Element[]} Array de elementos
 */
export function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

/**
 * Selector único simplificado
 * @param {string} selector - Selector CSS
 * @param {Element} context - Contexto de búsqueda
 * @returns {Element|null}
 */
export function $(selector, context = document) {
  return context.querySelector(selector);
}

/**
 * Crear elemento con atributos
 * @param {string} tag - Tag del elemento
 * @param {Object} attrs - Atributos del elemento
 * @param {string} content - Contenido del elemento
 * @returns {Element}
 */
export function createElement(tag, attrs = {}, content = "") {
  const element = document.createElement(tag);

  Object.entries(attrs).forEach(([key, value]) => {
    if (key === "className") {
      element.className = value;
    } else if (key === "dataset") {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        element.dataset[dataKey] = dataValue;
      });
    } else {
      element.setAttribute(key, value);
    }
  });

  if (content) {
    element.innerHTML = content;
  }

  return element;
}

/**
 * Añadir event listener con delegation
 * @param {Element} parent - Elemento padre
 * @param {string} eventType - Tipo de evento
 * @param {string} selector - Selector de elementos hijo
 * @param {Function} handler - Manejador del evento
 */
export function delegate(parent, eventType, selector, handler) {
  parent.addEventListener(eventType, (event) => {
    const target = event.target.closest(selector);
    if (target && parent.contains(target)) {
      handler.call(target, event);
    }
  });
}
