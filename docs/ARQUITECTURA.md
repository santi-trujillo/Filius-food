# ARQUITECTURA DEL PROYECTO FILIUS FOOD

## 📁 Estructura de Directorios

Este proyecto sigue una arquitectura estricta basada en las siguientes metodologías:

- **ITCSS** (Inverted Triangle CSS)
- **BEM** (Block Element Modifier)
- **Mobile First**
- **Sistema Modular**
- **Progressive Enhancement**

---

## 🎨 CSS - Metodología ITCSS

### Capas del Triángulo Invertido (orden de especificidad)

```
01-settings/     → Variables globales (sin output CSS)
02-tools/        → Funciones, mixins (sin output CSS)
03-generic/      → Resets, normalize
04-elements/     → Estilos de elementos HTML base
05-objects/      → Patrones de layout (OOCSS)
06-components/   → Componentes específicos (BEM)
07-utilities/    → Helpers atómicos (!important permitido)
08-shame/        → Hacks temporales (refactorizar)
```

### Reglas Estrictas

1. **NUNCA** alterar el orden de imports en `main.css`
2. **NUNCA** usar `max-width` en media queries (solo `min-width`)
3. **SIEMPRE** escribir CSS mobile-first
4. **SIEMPRE** usar nomenclatura BEM en componentes

---

## 🧱 BEM - Nomenclatura

### Estructura

```css
.block {
} /* Componente independiente */
.block__element {
} /* Parte del componente */
.block--modifier {
} /* Variación del componente */
.block__element--modifier {
} /* Variación del elemento */
```

### Prefijos por Capa

- **Objects**: `.o-*` (ej: `.o-container`, `.o-grid`)
- **Components**: Sin prefijo (ej: `.card`, `.hero`)
- **Utilities**: `.u-*` (ej: `.u-mt-16`, `.u-text-center`)

### Ejemplos Correctos

```css
/* ✅ CORRECTO */
.card {
}
.card__image {
}
.card__title {
}
.card__price {
}
.card--featured {
}
.card__button--primary {
}

/* ❌ INCORRECTO */
.card .image {
} /* No anidación */
.cardImage {
} /* No camelCase */
.card-featured-image {
} /* Demasiados guiones */
```

---

## 📱 Mobile First

### Estrategia

1. **Base**: Estilos para 320px+ (sin media query)
2. **Tablet**: `@media (min-width: 768px)`
3. **Desktop**: `@media (min-width: 1024px)`
4. **Wide**: `@media (min-width: 1440px)`

### Breakpoints

```javascript
mobile:  320px - 767px
tablet:  768px - 1023px
desktop: 1024px - 1439px
wide:    1440px+
```

### Carpeta Mobile-First

Los componentes complejos se dividen en archivos por viewport:

```
/06-components/mobile-first/
  ├── _header.mobile.css   → Base (320px+)
  ├── _header.tablet.css   → @media (min-width: 768px)
  └── _header.desktop.css  → @media (min-width: 1024px)
```

---

## ⚙️ JavaScript - Sistema Modular

### Arquitectura

```
js/
├── main.js              → Punto de entrada
├── core/                → Núcleo del sistema
│   ├── router.js       → SPA routing
│   ├── state.js        → State management
│   └── eventBus.js     → Event system
├── components/          → Componentes UI
├── services/            → Servicios externos
├── utils/               → Utilidades puras
└── config/              → Configuraciones
```

### Patrón de Componente

```javascript
export class ComponentName {
  constructor() {
    this.element = document.querySelector(".component");
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    // Event listeners
  }
}
```

### Imports ES6+

```javascript
// main.js
import { Router } from "./core/router.js";
import { Navigation } from "./components/Navigation.js";

const app = new App();
```

---

## 🚀 Progressive Enhancement

### Capas de Funcionalidad

1. **HTML** → Contenido accesible (funciona sin CSS/JS)
2. **CSS** → Presentación (funciona sin JavaScript)
3. **JavaScript** → Mejoras interactivas

### Ejemplo

```html
<!-- Funciona sin JavaScript -->
<a href="https://wa.me/573001234567" class="whatsapp-float">
  Contactar por WhatsApp
</a>

<!-- JavaScript solo mejora la experiencia -->
<script type="module">
  import { WhatsAppButton } from "./js/components/WhatsAppButton.js";
  new WhatsAppButton(); // Añade analytics, animaciones, etc.
</script>
```

---

## 📦 Escalabilidad

### Agregar Nueva Sección

1. Crear archivo CSS:

   ```
   /css/06-components/sections/_nueva-seccion.css
   ```

2. Crear breakpoints (si es compleja):

   ```
   /css/06-components/mobile-first/_nueva-seccion.mobile.css
   /css/06-components/mobile-first/_nueva-seccion.tablet.css
   /css/06-components/mobile-first/_nueva-seccion.desktop.css
   ```

3. Importar en `main.css`:

   ```css
   @import url("./06-components/sections/_nueva-seccion.css");
   ```

4. Si requiere JS, crear componente:
   ```
   /js/components/NuevaSeccion.js
   ```

### Agregar Nuevo Componente UI

1. Crear `/css/06-components/ui/_nuevo-comp.css`
2. Seguir nomenclatura BEM estricta
3. Mobile First
4. Importar en `main.css`

---

## 🔍 Convenciones de Código

### CSS

- **Indentación**: 2 espacios
- **Nombres**: lowercase, kebab-case
- **Orden de propiedades**:
  1. Positioning
  2. Box Model
  3. Typography
  4. Visual
  5. Misc

### JavaScript

- **Indentación**: 2 espacios
- **Nombres de clases**: PascalCase
- **Nombres de funciones**: camelCase
- **Constantes**: UPPER_SNAKE_CASE

---

## 📚 Recursos

- [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)
- [BEM Methodology](https://getbem.com/)
- [Mobile First](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Responsive/Mobile_first)

---

**Última actualización**: 9 de diciembre de 2025
