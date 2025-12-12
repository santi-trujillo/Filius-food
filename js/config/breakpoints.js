/**
 * BREAKPOINTS
 * Breakpoints compartidos entre CSS y JavaScript
 */

export const breakpoints = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
};

/**
 * Verificar si estamos en un viewport específico
 * @param {string} size - 'mobile', 'tablet', 'desktop', 'wide'
 * @returns {boolean}
 */
export function isViewport(size) {
  const width = window.innerWidth;

  switch (size) {
    case "mobile":
      return width < breakpoints.tablet;
    case "tablet":
      return width >= breakpoints.tablet && width < breakpoints.desktop;
    case "desktop":
      return width >= breakpoints.desktop && width < breakpoints.wide;
    case "wide":
      return width >= breakpoints.wide;
    default:
      return false;
  }
}

/**
 * Obtener viewport actual
 * @returns {string} 'mobile' | 'tablet' | 'desktop' | 'wide'
 */
export function getCurrentViewport() {
  const width = window.innerWidth;

  if (width < breakpoints.tablet) return "mobile";
  if (width < breakpoints.desktop) return "tablet";
  if (width < breakpoints.wide) return "desktop";
  return "wide";
}
