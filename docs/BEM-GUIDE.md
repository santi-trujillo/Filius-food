# GUÍA DE NOMENCLATURA BEM

## 🎯 Filosofía BEM

BEM (Block Element Modifier) es una metodología de nomenclatura que hace el código CSS más legible, reutilizable y escalable.

---

## 📐 Estructura Básica

```
.block {}
.block__element {}
.block--modifier {}
.block__element--modifier {}
```

### Block (Bloque)

Componente independiente que tiene sentido por sí mismo.

```css
.card {
}
.nav {
}
.hero {
}
.footer {
}
```

### Element (Elemento)

Parte de un bloque que no tiene sentido por sí sola.

```css
.card__image {
}
.card__title {
}
.card__description {
}
.card__price {
}
.card__button {
}

.nav__menu {
}
.nav__link {
}
.nav__toggle {
}
```

### Modifier (Modificador)

Variación de un bloque o elemento.

```css
/* Modificadores de bloque */
.card--featured {
}
.card--large {
}
.button--primary {
}
.button--disabled {
}

/* Modificadores de elemento */
.card__button--primary {
}
.card__button--secondary {
}
.nav__link--active {
}
```

---

## ✅ Reglas Estrictas

### 1. Nunca anidar selectores

```css
/* ❌ MAL */
.card .image {
}
.nav > ul > li > a {
}

/* ✅ BIEN */
.card__image {
}
.nav__link {
}
```

### 2. Nunca usar camelCase

```css
/* ❌ MAL */
.cardImage {
}
.navToggleButton {
}

/* ✅ BIEN */
.card__image {
}
.nav__toggle-button {
}
```

### 3. Máximo 2 niveles de profundidad

```css
/* ❌ MAL */
.card__body__header__title {
}

/* ✅ BIEN */
.card__header-title {
}
/* o dividir en bloques más pequeños */
.card-header__title {
}
```

### 4. Usar prefijos para capas ITCSS

```css
/* Objects (patrones de layout) */
.o-container {
}
.o-grid {
}
.o-flex {
}

/* Components (sin prefijo) */
.card {
}
.hero {
}
.nav {
}

/* Utilities (helpers atómicos) */
.u-mt-16 {
}
.u-text-center {
}
.u-hidden {
}
```

---

## 📚 Ejemplos Completos

### Ejemplo 1: Card de Producto

```css
/* Block */
.card {
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-md);
}

/* Elements */
.card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card__body {
  padding: var(--space-md);
}

.card__category {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
}

.card__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin-top: var(--space-xs);
}

.card__description {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
  margin-top: var(--space-sm);
}

.card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--space-md);
}

.card__price {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.card__button {
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-sm);
}

/* Modifiers */
.card--featured {
  border: 2px solid var(--color-primary);
}

.card--horizontal {
  flex-direction: row;
}

.card__button--primary {
  background: var(--color-primary);
  color: var(--color-white);
}

.card__button--secondary {
  background: transparent;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
}
```

### Ejemplo 2: Navegación

```css
/* Block */
.nav {
  position: fixed;
  top: 0;
  width: 100%;
  background: var(--color-white);
  z-index: var(--z-index-sticky);
}

/* Elements */
.nav__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md);
}

.nav__logo {
  width: 120px;
}

.nav__toggle {
  display: block;
  width: 40px;
  height: 40px;
}

.nav__menu {
  display: none;
  flex-direction: column;
  gap: var(--space-md);
}

.nav__link {
  color: var(--color-gray-900);
  font-weight: var(--font-weight-medium);
  transition: color var(--transition-fast);
}

/* Modifiers */
.nav--transparent {
  background: transparent;
}

.nav__menu--open {
  display: flex;
}

.nav__link--active {
  color: var(--color-primary);
  border-bottom: 2px solid var(--color-primary);
}

.nav__toggle--active {
  /* Estilos para hamburguesa activa */
}
```

### Ejemplo 3: Hero Section

```css
/* Block */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Elements */
.hero__background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.hero__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: -1;
}

.hero__content {
  text-align: center;
  color: var(--color-white);
  max-width: 800px;
  padding: var(--space-md);
}

.hero__title {
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
}

.hero__subtitle {
  font-size: var(--font-size-xl);
  margin-top: var(--space-md);
  opacity: 0.9;
}

.hero__cta {
  margin-top: var(--space-2xl);
  display: inline-flex;
  gap: var(--space-md);
}

.hero__button {
  padding: var(--space-md) var(--space-xl);
  font-size: var(--font-size-lg);
  border-radius: var(--radius-md);
}

/* Modifiers */
.hero--small {
  min-height: 60vh;
}

.hero__button--primary {
  background: var(--color-primary);
  color: var(--color-white);
}

.hero__button--outline {
  background: transparent;
  border: 2px solid var(--color-white);
  color: var(--color-white);
}
```

---

## 🚫 Anti-patrones Comunes

### ❌ Anidar demasiado

```css
/* MAL */
.header__nav__menu__item__link__icon {
}

/* BIEN - Dividir en bloques */
.nav__link-icon {
}
/* o crear un bloque nuevo */
.menu-item__icon {
}
```

### ❌ Usar ID en vez de clases

```css
/* MAL */
#card {
}
#nav {
}

/* BIEN */
.card {
}
.nav {
}
```

### ❌ Mezclar BEM con anidación

```css
/* MAL */
.card {
  .card__title {
    /* ... */
  }
}

/* BIEN */
.card {
}
.card__title {
}
```

### ❌ Modificadores globales

```css
/* MAL */
.active {
}
.disabled {
}

/* BIEN */
.nav__link--active {
}
.button--disabled {
}
```

---

## 📝 Convenciones Adicionales

### Guiones vs Underscores

- `__` (doble underscore) → Separa bloque de elemento
- `--` (doble guion) → Separa de modificador
- `-` (guion simple) → Palabras compuestas

```css
.product-card {
} /* Bloque con nombre compuesto */
.product-card__image {
} /* Elemento */
.product-card--featured {
} /* Modificador */
.product-card__buy-button {
} /* Elemento con nombre compuesto */
```

### Estados vs Modificadores

```css
/* Estados (temporales, controlados por JS) */
.modal.is-open {
}
.dropdown.is-active {
}

/* Modificadores (permanentes o variaciones de diseño) */
.button--primary {
}
.card--featured {
}
```

---

## 🎓 Recursos

- [BEM Official](https://getbem.com/)
- [BEM by Example](https://sparkbox.com/foundry/bem_by_example)
- [CSS Tricks BEM](https://css-tricks.com/bem-101/)

---

**Última actualización**: 9 de diciembre de 2025
