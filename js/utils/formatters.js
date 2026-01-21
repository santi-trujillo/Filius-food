/**
 * FORMATTERS
 * Funciones para formatear datos
 */

/**
 * Formatear precio en pesos colombianos
 * @param {number} amount - Cantidad a formatear
 * @returns {string} Precio formateado
 */
export function formatPrice(amount) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formatear fecha
 * @param {Date|string} date - Fecha a formatear
 * @returns {string} Fecha formateada
 */
export function formatDate(date) {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dateObj);
}

/**
 * Truncar texto
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} Texto truncado
 */
export function truncateText(text, maxLength = 100) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

/**
 * Slug de texto (para URLs)
 * @param {string} text - Texto a convertir
 * @returns {string} Slug
 */
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}
