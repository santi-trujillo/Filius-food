# DESIGN TOKENS - FILIUS FOOD

## Análisis Completo de Diseño desde Figma

**Fecha de análisis**: 10 de diciembre de 2025  
**Fuente**: Imágenes exportadas de Figma + Análisis visual detallado  
**Estado**: ✅ Completo y listo para implementación

---

## 🎨 PALETA DE COLORES

### Colores Principales

```css
/* Dorado/Beige cálido - Color brand principal */
--color-primary: #d4af7a;
--color-primary-dark: #c9a870;
--color-primary-light: #e0c89a;

/* Rojo intenso/Terracota - Usado en logo y detalles */
--color-secondary: #c73e3a;
--color-secondary-dark: #b8342b;
--color-secondary-light: #d45550;

/* Verde WhatsApp */
--color-whatsapp: #25d366;
```

### Colores de Texto

```css
--color-text-primary: #333333; /* Gris muy oscuro, casi negro */
--color-text-secondary: #666666; /* Gris medio para precios */
--color-text-light: #707070; /* Gris claro para textos secundarios */
--color-text-white: #ffffff; /* Texto blanco sobre fondos oscuros */
```

### Colores de Fondo

```css
--color-bg-primary: #ffffff; /* Blanco puro */
--color-bg-secondary: #f5f0e8; /* Beige/crema claro para alternancia */
--color-bg-dark: rgba(0, 0, 0, 0.6); /* Overlay oscuro para hero */
```

### Colores de Borde

```css
--color-border-light: #e5e5e5; /* Bordes sutiles */
--color-border-medium: #cccccc; /* Bordes inputs */
```

---

## ✏️ TIPOGRAFÍA

### Familias

```css
/* Sans-serif moderna para cuerpo y menú */
--font-primary: "Montserrat", "Poppins", -apple-system, BlinkMacSystemFont, sans-serif;

/* Script/caligráfica para logo "Alice" y decorativos */
--font-secondary: "Dancing Script", "Pacifico", cursive;
```

### Tamaños Base (Mobile First)

```css
/* Mobile */
--font-size-xs: 0.75rem; /* 12px - Textos muy pequeños, legal */
--font-size-sm: 0.875rem; /* 14px - Descripciones, precios */
--font-size-base: 1rem; /* 16px - Texto de cuerpo */
--font-size-lg: 1.125rem; /* 18px - Subtítulos */
--font-size-xl: 1.25rem; /* 20px - Nombres de productos */
--font-size-2xl: 1.5rem; /* 24px - Títulos H3 */
--font-size-3xl: 2rem; /* 32px - Títulos H2 */
--font-size-4xl: 2.5rem; /* 40px - Títulos H1 hero */
```

### Pesos

```css
--font-weight-regular: 400; /* Textos de cuerpo, descripciones */
--font-weight-medium: 500; /* Énfasis medio */
--font-weight-semibold: 600; /* Nombres de productos, subtítulos */
--font-weight-bold: 700; /* Títulos de secciones, CTAs */
```

---

## 📏 ESPACIADO

### Sistema de Espaciado (múltiplos de 8px)

```css
--space-xs: 0.25rem; /* 4px - Espaciado mínimo */
--space-sm: 0.5rem; /* 8px - Espaciado pequeño */
--space-md: 1rem; /* 16px - Espaciado base */
--space-lg: 1.5rem; /* 24px - Espaciado medio */
--space-xl: 2rem; /* 32px - Espaciado grande */
--space-2xl: 3rem; /* 48px - Espaciado muy grande */
--space-3xl: 4rem; /* 64px - Separación entre secciones */
```

---

## 🎯 BORDER RADIUS

```css
--radius-sm: 4px; /* Botones, inputs pequeños */
--radius-md: 8px; /* Cards, botones principales */
--radius-lg: 12px; /* Cards grandes */
--radius-full: 50%; /* Botón WhatsApp, íconos circulares */
```

---

## 💫 SOMBRAS

```css
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1); /* Cards sutiles */
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1); /* Cards hover */
--shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.15); /* Elevación importante */
--shadow-nav: 0 2px 4px rgba(0, 0, 0, 0.08); /* Sombra del nav */
```

---

## ⚡ TRANSICIONES

```css
--transition-fast: 150ms ease-in-out; /* Hover rápido */
--transition-base: 300ms ease-in-out; /* Transiciones standard */
--transition-slow: 500ms ease-in-out; /* Animaciones lentas */
```

---

## 🧩 COMPONENTES COMPARTIDOS

### 1. Header/Nav

**Especificaciones:**

- **Posición**: Fixed top
- **Altura**: ~80px desktop, ~60px mobile
- **Background**: Blanco (#FFFFFF)
- **Box-shadow**: var(--shadow-nav)
- **Z-index**: 100

**Logo:**

- Circular rojo (#C73E3A)
- Diámetro: ~60px desktop, ~50px mobile
- Posición: Centrado en el nav

**Layout Desktop:**

- Menú dividido: mitad izquierda + LOGO central + mitad derecha
- Links horizontales a ambos lados del logo

**Links de Navegación:**

1. Inicio
2. Tienda Virtual (con dropdown)
3. Chocolatería
4. Nuestro Entorno (con dropdown)
5. Políticas (con dropdown)
6. Domicilios
7. Contáctenos

**Estilos de Links:**

- Color: #333333
- Hover: #D4AF7A
- Font-weight: 500
- Transition: 150ms

**Mobile:**

- Menú hamburguesa (3 líneas horizontales)
- Menu desplegable desde arriba o lateral
- Logo centrado

---

### 2. Footer

**Especificaciones:**

- **Background**: Dorado (#C9A870)
- **Altura**: Variable (~300px)
- **Padding**: Generoso (32px - 48px)
- **Color de texto**: Blanco o muy claro

**Sección 1: Suscripción Newsletter**

- Logo "Alice" (fuente script/caligráfica)
- Iconos de redes sociales:
  - Facebook
  - Instagram
  - TikTok (posiblemente)
- Input de email + Botón "Suscríbete"

**Sección 2: Copyright**

- Texto pequeño (12px)
- Políticas de privacidad y términos
- Copyright © Filius Food

**Layout:**

- Mobile: Stack vertical
- Desktop: Posiblemente dos columnas o centrado

---

### 3. Botón Flotante WhatsApp

**Especificaciones:**

```css
.whatsapp-float {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 56px;
  height: 56px;
  background: #25d366;
  border-radius: 50%;
  box-shadow: var(--shadow-lg);
  z-index: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-base);
}

.whatsapp-float:hover {
  transform: scale(1.1);
  box-shadow: var(--shadow-xl);
}

/* Animación opcional */
@keyframes pulse-whatsapp {
  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(37, 211, 102, 0);
  }
}

.whatsapp-float {
  animation: pulse-whatsapp 2s infinite;
}
```

---

## 📄 PÁGINAS - ANÁLISIS DETALLADO

### PÁGINA 1: INICIO

#### Sección Hero

```
Altura: ~500px mobile, ~700px desktop
Background: Imagen con overlay oscuro rgba(0, 0, 0, 0.6)
Contenido:
  - Título: "Nuestro secreto:" (fuente script, blanco, grande)
  - Descripción/subtítulo sobre calidad artesanal
  - Posible CTA button
```

#### Sección Destacados

```
Grid de productos destacados (5 productos)
Desktop: 5 columnas inline
Tablet: 3 columnas
Mobile: 2 columnas
Gap: 16px
```

#### Card Destacado

- Imagen del producto
- Nombre
- Precio
- Botón "Ver detalles" (dorado)

---

### PÁGINA 2: TIENDA VIRTUAL / POSTRES

**Título de Página:**

- "TIENDA VIRTUAL"
- Font-size: 3xl o 4xl
- Font-weight: bold
- Color: #333333
- Margin-bottom: 32px

**Grid de Productos:**

```
Desktop: 4 columnas
Tablet: 3 columnas
Mobile: 2 columnas
Gap: 16px mobile, 20px tablet, 24px desktop
```

**Card de Producto - Estructura:**

```html
<div class="product-card">
  <img class="product-card__image" />
  <!-- 60% del card -->
  <h3 class="product-card__title">Nombre</h3>
  <p class="product-card__price">$XX,XXX</p>
  <button class="product-card__button">Ver detalles</button>
</div>
```

**Card - Estilos:**

```css
.product-card {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: 300ms ease-in-out;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.product-card__image {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 4px;
}

.product-card__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333333;
  margin-top: 8px;
}

.product-card__price {
  font-size: 0.875rem;
  color: #666666;
  margin-top: 4px;
}

.product-card__button {
  width: 100%;
  margin-top: 12px;
  padding: 10px;
  background: #d4af7a;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
}
```

**Paginación:**

- Puntos indicadores: 1, 2, 3, 4
- Color activo: dorado
- Color inactivo: gris claro
- Centrado horizontalmente
- Margin-top: 48px

---

### PÁGINA 3: CHOCOLATERÍA

**Idéntica a Tienda Virtual/Postres**, solo cambia:

- Título: "CHOCOLATERÍA"
- Productos mostrados (chocolates, bombones, cajas de regalo)

Reutilizar mismos componentes y estilos.

---

### PÁGINA 4: DOMICILIOS

**Layout:**

- Una columna (responsive)
- Fondo blanco
- Padding generoso

**Estructura:**

```html
<section class="domicilios">
  <div class="o-container">
    <h1>Domicilios</h1>

    <div class="info-section">
      <h2>Entregamos</h2>
      <p>Descripción del servicio...</p>
    </div>

    <div class="info-section">
      <h2>Horarios</h2>
      <p>Lunes a Viernes: 8am - 6pm...</p>
    </div>

    <div class="info-section">
      <h2>Productos</h2>
      <p>Todos nuestros productos...</p>
    </div>

    <div class="info-section">
      <h2>Ubicación</h2>
      <p>Zonas de cobertura...</p>
    </div>

    <div class="map-container">
      <iframe src="Google Maps embed"></iframe>
    </div>

    <div class="info-section">
      <h3>Costos y condiciones</h3>
      <p>Información adicional...</p>
    </div>
  </div>
</section>
```

**Estilos:**

```css
.info-section {
  margin-bottom: 32px;
}

.info-section h2 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #d4af7a; /* o #333 */
  margin-bottom: 12px;
}

.info-section p {
  line-height: 1.7;
  color: #666666;
}

.map-container {
  width: 100%;
  height: 400px;
  margin: 48px 0;
  border-radius: 8px;
  overflow: hidden;
}
```

---

### PÁGINA 5: CONTACTO

**Layout Desktop:**

```
┌──────────────────────────────────────────┐
│ CONTÁCTENOS (H1, centrado)               │
├──────────────────┬───────────────────────┤
│ FORMULARIO (50%) │ INFO CONTACTO (50%)   │
│                  │                       │
│ [Nombre]         │ 📍 Dirección física   │
│ [Email]          │ ☎️ Teléfono click     │
│ [Mensaje]        │ ✉️ Email click        │
│                  │ 🕐 Horarios           │
│ [Enviar]         │                       │
├──────────────────┴───────────────────────┤
│ MAPA (100% width, 400px height)          │
└──────────────────────────────────────────┘
```

**Layout Mobile:**
Stack vertical: Formulario → Info → Mapa

**Formulario - HTML:**

```html
<form class="contact-form">
  <div class="form-group">
    <label for="name">Nombre</label>
    <input type="text" id="name" class="input" />
  </div>

  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" class="input" />
  </div>

  <div class="form-group">
    <label for="message">Mensaje</label>
    <textarea id="message" class="input" rows="5"></textarea>
  </div>

  <button type="submit" class="button--primary">Enviar</button>
</form>
```

**Info de Contacto - HTML:**

```html
<div class="contact-info">
  <div class="contact-item">
    <span class="icon">📍</span>
    <div>
      <h3>Dirección</h3>
      <p>Calle Principal #123, Pereira</p>
    </div>
  </div>

  <div class="contact-item">
    <span class="icon">☎️</span>
    <div>
      <h3>Teléfono</h3>
      <a href="tel:+573001234567">+57 300 123 4567</a>
    </div>
  </div>

  <div class="contact-item">
    <span class="icon">✉️</span>
    <div>
      <h3>Email</h3>
      <a href="mailto:info@filiusfood.com">info@filiusfood.com</a>
    </div>
  </div>

  <div class="contact-item">
    <span class="icon">🕐</span>
    <div>
      <h3>Horarios</h3>
      <p>Lunes a Sábado: 8am - 6pm</p>
    </div>
  </div>
</div>
```

**Estilos:**

```css
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333333;
}

.input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  font-size: 1rem;
  transition: 150ms;
}

.input:focus {
  outline: none;
  border-color: #d4af7a;
  box-shadow: 0 0 0 3px rgba(212, 175, 122, 0.1);
}

.contact-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 24px;
}

.contact-item .icon {
  font-size: 24px;
  color: #d4af7a;
}

.contact-item a {
  color: #d4af7a;
  text-decoration: none;
}

.contact-item a:hover {
  text-decoration: underline;
}
```

---

## 🎨 COMPONENTES UI - ESPECIFICACIONES

### Botones

```css
/* Botón Primario */
.button--primary {
  background: #d4af7a;
  color: #ffffff;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 150ms ease-in-out;
  display: inline-block;
  text-align: center;
}

.button--primary:hover {
  background: #c9a870;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.button--primary:active {
  transform: translateY(0);
}

/* Botón Secundario (Outline) */
.button--secondary {
  background: transparent;
  color: #d4af7a;
  border: 2px solid #d4af7a;
  padding: 10px 24px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: 150ms;
}

.button--secondary:hover {
  background: #d4af7a;
  color: #ffffff;
}

/* Full width (mobile) */
.button--full {
  width: 100%;
}
```

---

## 📐 CONTAINERS Y LAYOUTS

```css
/* Container Principal */
.o-container {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 16px;
}

@media (min-width: 768px) {
  .o-container {
    max-width: 720px;
    padding: 0 24px;
  }
}

@media (min-width: 1024px) {
  .o-container {
    max-width: 1140px;
    padding: 0 32px;
  }
}

@media (min-width: 1440px) {
  .o-container {
    max-width: 1320px;
  }
}
```

---

## 🎯 ICONOS

### Ubicaciones

- **Redes sociales**: Font Awesome o SVG colored
- **WhatsApp**: SVG blanco sobre verde
- **Contacto**: Outline style, color dorado (#D4AF7A)
- **Hamburguesa**: 3 líneas, color #333333

### Tamaños

```css
--icon-sm: 16px;
--icon-md: 24px;
--icon-lg: 32px;
--icon-xl: 48px;
```

---

## 📱 RESPONSIVE BREAKPOINTS

```css
/* Mobile (320px - 767px) - Base sin media query */

/* Tablet (768px - 1023px) */
@media (min-width: 768px) {
  /* Grid 3 cols, nav horizontal parcial */
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  /* Grid 4 cols, nav completo horizontal */
}

/* Wide (1440px+) */
@media (min-width: 1440px) {
  /* Containers más anchos */
}
```

---

**Documento completado**: 10 de diciembre de 2025  
**Estado**: ✅ Completo y listo para implementación pixel-perfect
