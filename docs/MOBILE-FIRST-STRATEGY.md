# ESTRATEGIA MOBILE FIRST

## 🎯 Filosofía

**Mobile First** significa diseñar y desarrollar primero para dispositivos móviles, y luego escalar hacia pantallas más grandes. Esto garantiza:

- Mejor performance en móviles
- Contenido priorizado
- Progressive Enhancement natural
- Código más limpio y mantenible

---

## 📱 Breakpoints del Proyecto

```javascript
Mobile:  320px - 767px   (Base, sin media query)
Tablet:  768px - 1023px  (@media min-width: 768px)
Desktop: 1024px - 1439px (@media min-width: 1024px)
Wide:    1440px+         (@media min-width: 1440px)
```

---

## ✅ Reglas Estrictas

### 1. NUNCA usar `max-width`

```css
/* ❌ MAL - Desktop First */
.container {
  width: 1200px;
}

@media (max-width: 768px) {
  .container {
    width: 100%;
  }
}

/* ✅ BIEN - Mobile First */
.container {
  width: 100%;
}

@media (min-width: 768px) {
  .container {
    width: 720px;
  }
}

@media (min-width: 1024px) {
  .container {
    width: 960px;
  }
}
```

### 2. Base = Mobile (sin media query)

```css
/* ✅ Estilos base para mobile */
.card {
  display: flex;
  flex-direction: column;
  padding: var(--space-md);
}

/* Tablet */
@media (min-width: 768px) {
  .card {
    padding: var(--space-lg);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .card {
    flex-direction: row;
    padding: var(--space-xl);
  }
}
```

### 3. Content First (Priorizar contenido)

```css
/* Mobile: Stack vertical */
.hero {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.hero__image {
  order: -1; /* Imagen primero en mobile */
}

.hero__content {
  order: 1;
}

/* Desktop: Layout horizontal */
@media (min-width: 1024px) {
  .hero {
    flex-direction: row;
    text-align: left;
  }

  .hero__image {
    order: 1;
  }

  .hero__content {
    order: 1;
  }
}
```

---

## 📐 Patrones Comunes

### Patrón: Grid Responsive

```css
/* Mobile: 1 columna */
.o-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);
}

/* Tablet: 2 columnas */
@media (min-width: 768px) {
  .o-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-lg);
  }
}

/* Desktop: 3 columnas */
@media (min-width: 1024px) {
  .o-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-xl);
  }
}
```

### Patrón: Tipografía Fluida

```css
/* Mobile */
.hero__title {
  font-size: var(--font-size-3xl); /* 30px */
  line-height: var(--line-height-tight);
}

/* Tablet */
@media (min-width: 768px) {
  .hero__title {
    font-size: var(--font-size-4xl); /* 48px */
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .hero__title {
    font-size: var(--font-size-5xl); /* 72px */
  }
}
```

### Patrón: Espaciado Progresivo

```css
/* Mobile */
.o-section {
  padding-block: var(--space-2xl); /* 48px */
}

/* Tablet */
@media (min-width: 768px) {
  .o-section {
    padding-block: var(--space-3xl); /* 64px */
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .o-section {
    padding-block: var(--space-4xl); /* 96px */
  }
}
```

### Patrón: Navegación

```css
/* Mobile: Menú hamburguesa */
.nav__toggle {
  display: block;
}

.nav__menu {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  background: var(--color-white);
}

.nav__menu--open {
  display: flex;
}

/* Desktop: Menú horizontal */
@media (min-width: 1024px) {
  .nav__toggle {
    display: none;
  }

  .nav__menu {
    display: flex;
    position: static;
    width: auto;
    height: auto;
    flex-direction: row;
    background: transparent;
  }
}
```

---

## 🗂️ Organización de Archivos

Para componentes complejos, usar archivos separados por viewport:

```
/css/06-components/mobile-first/
├── _header.mobile.css   → Base (320px+)
├── _header.tablet.css   → Tablet (768px+)
├── _header.desktop.css  → Desktop (1024px+)
├── _nav.mobile.css
├── _nav.tablet.css
└── _nav.desktop.css
```

### Ejemplo: Header

**\_header.mobile.css** (Base)

```css
.header {
  position: fixed;
  top: 0;
  width: 100%;
  padding: var(--space-sm);
  background: var(--color-white);
}

.header__logo {
  width: 100px;
}
```

**\_header.tablet.css**

```css
@media (min-width: 768px) {
  .header {
    padding: var(--space-md);
  }

  .header__logo {
    width: 140px;
  }
}
```

**\_header.desktop.css**

```css
@media (min-width: 1024px) {
  .header {
    padding: var(--space-lg) var(--space-2xl);
  }

  .header__logo {
    width: 180px;
  }
}
```

---

## 🎨 Variables Responsive

Las variables CSS también siguen Mobile First:

**\_typography.css**

```css
:root {
  /* Mobile Base */
  --font-size-base: 1rem; /* 16px */
  --font-size-lg: 1.125rem; /* 18px */
  --font-size-xl: 1.25rem; /* 20px */
  --font-size-5xl: 3rem; /* 48px */
}

/* Tablet */
@media (min-width: 768px) {
  :root {
    --font-size-base: 1.125rem; /* 18px */
    --font-size-5xl: 3.75rem; /* 60px */
  }
}

/* Desktop */
@media (min-width: 1024px) {
  :root {
    --font-size-5xl: 4.5rem; /* 72px */
  }
}
```

---

## ⚡ Performance Mobile

### 1. Touch Targets (Mínimo 44x44px)

```css
.button {
  min-width: 44px;
  min-height: 44px;
  padding: var(--space-sm) var(--space-md);
}

.nav__link {
  padding: var(--space-md);
  min-height: 44px;
  display: flex;
  align-items: center;
}
```

### 2. Imágenes Responsive

```html
<picture>
  <source media="(min-width: 1024px)" srcset="hero-desktop.webp" />
  <source media="(min-width: 768px)" srcset="hero-tablet.webp" />
  <img src="hero-mobile.webp" alt="Hero" loading="lazy" />
</picture>
```

### 3. Lazy Loading

```html
<img
  src="placeholder.svg"
  data-src="product.webp"
  loading="lazy"
  alt="Producto"
/>
```

---

## 🧪 Testing Responsive

### Viewports de Prueba

```javascript
// Mobile
iPhone SE:       375px × 667px
iPhone 12 Pro:   390px × 844px
Samsung S20:     360px × 800px

// Tablet
iPad:            768px × 1024px
iPad Pro:        1024px × 1366px

// Desktop
Laptop:          1366px × 768px
Desktop:         1920px × 1080px
Wide:            2560px × 1440px
```

### DevTools Chrome

1. Abrir DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Seleccionar dispositivo o ingresar dimensiones custom
4. Verificar touch events

---

## 📊 Utilidades Responsive

```css
/* Visibilidad por viewport */
.u-visible-mobile {
  display: block;
}

.u-hidden-mobile {
  display: none;
}

@media (min-width: 768px) {
  .u-visible-mobile {
    display: none;
  }

  .u-hidden-mobile {
    display: block;
  }

  .u-visible-tablet {
    display: block;
  }
}

@media (min-width: 1024px) {
  .u-visible-tablet {
    display: none;
  }

  .u-visible-desktop {
    display: block;
  }
}
```

---

## 🎓 Recursos

- [Mobile First Design](https://www.lukew.com/ff/entry.asp?933)
- [Responsive Web Design](https://alistapart.com/article/responsive-web-design/)
- [Touch Target Sizes](https://web.dev/accessible-tap-targets/)

---

**Última actualización**: 9 de diciembre de 2025
