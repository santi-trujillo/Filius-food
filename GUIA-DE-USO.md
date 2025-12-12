# 🚀 GUÍA DE USO - FILIUS FOOD

## ⚡ Inicio Rápido (3 pasos)

### 1️⃣ Iniciar Servidor de Desarrollo

```bash
cd "/home/santiagotrujllo/Documentos/Proyectos web/Filius-Foods"
python3 -m http.server 8080
```

Luego abre en tu navegador: http://localhost:8080

---

### 2️⃣ Generar Build para Producción

```bash
./build.sh
```

Esto creará la carpeta `/build` con:

- CSS minificado (168KB → 36KB)
- Todos los assets copiados
- HTML optimizado
- JavaScript listo para producción

---

### 3️⃣ Probar Build Optimizado

```bash
cd build
python3 -m http.server 8080
```

Luego abre en tu navegador: http://localhost:8080

---

## 📁 Estructura del Proyecto

```
Filius-Foods/
├── 📄 index.html                 - Página principal (532 líneas)
│
├── 🎨 css/                        - 38 archivos CSS (ITCSS)
│   ├── 01-settings/              - Variables
│   ├── 02-tools/                 - Mixins (vacío por ahora)
│   ├── 03-generic/               - Normalize, box-sizing
│   ├── 04-elements/              - Estilos base (html, body, links)
│   ├── 05-objects/               - Layouts (container, grid)
│   ├── 06-components/            - Componentes (header, footer, cards)
│   └── 07-utilities/             - Utilidades (spacing, display)
│
├── 💻 js/                         - JavaScript modular (ES6)
│   ├── main.js                   - Entry point
│   ├── config/                   - Configuración
│   │   └── constants.js          - Constantes (URLs, teléfonos)
│   ├── core/                     - Funcionalidad core
│   │   └── router.js             - SPA routing (hash-based) ✅
│   ├── components/               - Componentes JS
│   │   ├── Navigation.js         - Menú hamburguesa
│   │   ├── ProductCatalog.js     - Grid de productos ✅
│   │   └── ContactForm.js        - Formulario de contacto
│   └── utils/                    - Utilidades
│       └── scroll.js             - Smooth scroll
│
├── 🖼️ assets/                     - Assets estáticos
│   └── images/
│       ├── icons/                - Logo + favicons ✅
│       │   ├── logo.svg          - 120x40 SVG
│       │   ├── favicon-32x32.png
│       │   └── favicon-16x16.png
│       ├── hero/                 - Imagen hero ✅
│       │   └── hero-home.webp    - 1920x800 SVG
│       └── products/             - Imágenes de productos ✅
│           ├── postres/          - 8 imágenes SVG
│           └── sanduches/        - 8 imágenes SVG
│
├── 📊 data/                       - Datos JSON
│   └── products.json             - 16 productos (8 postres + 8 sándwiches)
│
├── 🏗️ build/                      - Build de producción (generado)
│   ├── index.html
│   ├── css/
│   │   ├── bundle.css            - CSS concatenado (48KB)
│   │   └── main.min.css          - CSS minificado (36KB) ✅
│   ├── js/                       - JavaScript copiado
│   ├── assets/                   - Assets copiados
│   └── data/                     - Datos copiados
│
├── 📝 build.sh                    - Script de build automático ✅
│
└── 📚 Documentación/
    ├── AUDITORIA-TECNICA.md      - Análisis completo (31 páginas)
    ├── CORRECCIONES-COMPLETADAS.md - Resumen de correcciones
    ├── RESUMEN-FINAL.txt         - Resumen visual
    └── GUIA-DE-USO.md            - Este archivo
```

---

## 🔧 Comandos Útiles

### Desarrollo

```bash
# Iniciar servidor local
python3 -m http.server 8080

# Ver en el navegador
open http://localhost:8080  # macOS
xdg-open http://localhost:8080  # Linux
start http://localhost:8080  # Windows
```

### Build

```bash
# Generar build optimizado
./build.sh

# Ver estadísticas del build
du -h build/css/main.min.css  # Tamaño CSS minificado
find build/assets/images -type f | wc -l  # Contar imágenes
```

### Verificación

```bash
# Verificar que el servidor responda
curl -I http://localhost:8080

# Verificar assets
curl -I http://localhost:8080/data/products.json
curl -I http://localhost:8080/assets/images/icons/logo.svg

# Ver errores de consola (desde navegador)
# F12 → Console
```

---

## 🎯 Flujo de Trabajo

### Para Desarrollar

1. **Editar archivos fuente:**

   - HTML: `index.html`
   - CSS: archivos en `/css/**`
   - JS: archivos en `/js/**`
   - Imágenes: `/assets/images/**`
   - Datos: `/data/products.json`

2. **Ver cambios:**

   - Servidor detecta cambios automáticamente
   - Refresca el navegador (F5)
   - Revisa la consola (F12)

3. **Antes de subir a producción:**
   ```bash
   ./build.sh
   ```

### Para Producción

1. **Generar build:**

   ```bash
   ./build.sh
   ```

2. **Verificar build:**

   ```bash
   cd build
   python3 -m http.server 8080
   # Probar en navegador
   ```

3. **Desplegar:**

   - **Opción A - Netlify:**

     ```bash
     # Drag & drop carpeta /build en netlify.com/drop
     ```

   - **Opción B - Vercel:**

     ```bash
     vercel --prod build/
     ```

   - **Opción C - GitHub Pages:**
     ```bash
     git add build/
     git commit -m "Build optimizado"
     git subtree push --prefix build origin gh-pages
     ```

---

## 🎨 Personalización

### Cambiar Colores

Edita `/css/01-settings/_variables.css`:

```css
:root {
  /* Dorado principal */
  --color-primary: #c9a870; /* ← Cambiar aquí */

  /* Rojo secundario */
  --color-secondary: #c73e3a; /* ← Cambiar aquí */

  /* Verde WhatsApp (no cambiar) */
  --color-whatsapp: #25d366;
}
```

Ejecuta `./build.sh` para regenerar CSS minificado.

---

### Cambiar Teléfono/WhatsApp

**Opción 1 - Variables JS:**
Edita `/js/config/constants.js`:

```javascript
export const CONTACT_INFO = {
  phoneNumber: "573001234567", // ← Cambiar aquí
  whatsappNumber: "573001234567", // ← Cambiar aquí
  email: "info@filiusfood.com",
};
```

**Opción 2 - HTML directo:**
Busca y reemplaza en `index.html`:

- `+57 300 123 4567` → tu nuevo número
- `573001234567` → tu nuevo número sin espacios

---

### Agregar Productos

Edita `/data/products.json`:

```json
{
  "products": [
    {
      "id": 17, // ← Incrementar ID
      "name": "Nuevo Producto",
      "category": "postres", // o "sanduches"
      "description": "Descripción del producto",
      "price": 15000,
      "image": "/assets/images/products/postres/nuevo-producto.jpg",
      "featured": false,
      "ingredients": ["Ingrediente 1", "Ingrediente 2"],
      "available": true
    }
  ]
}
```

No olvides agregar la imagen en `/assets/images/products/`.

---

### Cambiar Imágenes Placeholder

Las imágenes actuales son SVG placeholder. Para usar fotos reales:

1. **Agrega tus imágenes:**

   ```bash
   # Postres
   cp mi-foto-brownie.jpg assets/images/products/postres/brownie.jpg

   # Sándwiches
   cp mi-foto-club.jpg assets/images/products/sanduches/club-sandwich.jpg
   ```

2. **Optimiza para web:**

   ```bash
   # Instalar cwebp (si no lo tienes)
   sudo apt install webp  # Linux
   brew install webp      # macOS

   # Convertir a WebP
   cwebp -q 85 brownie.jpg -o brownie.webp
   ```

3. **Actualiza products.json:**
   ```json
   "image": "/assets/images/products/postres/brownie.webp"
   ```

---

## 🐛 Solución de Problemas

### El servidor no inicia

```bash
# Ver qué está usando el puerto 8080
lsof -i :8080  # macOS/Linux
netstat -ano | findstr :8080  # Windows

# Usar otro puerto
python3 -m http.server 3000
```

### Products.json retorna 404

```bash
# Verificar que existe
ls -la data/products.json

# Verificar permisos
chmod 644 data/products.json

# Verificar contenido
cat data/products.json | python3 -m json.tool
```

### CSS no se actualiza

```bash
# Limpiar caché del navegador:
# Chrome/Edge: Ctrl + Shift + R (Windows/Linux)
# Chrome/Edge: Cmd + Shift + R (macOS)

# O abrir en modo incógnito:
# Ctrl + Shift + N (Windows/Linux)
# Cmd + Shift + N (macOS)

# Regenerar build
./build.sh
```

### Router no cambia de página

1. **Verifica la consola:** F12 → Console
2. **Busca errores en:** `js/core/router.js`
3. **Verifica que los enlaces tengan:** `href="#postres"` (con #)

### Imágenes no cargan

```bash
# Verificar rutas
ls -R assets/images/

# Verificar que el servidor sirva los archivos
curl -I http://localhost:8080/assets/images/icons/logo.svg

# Debería retornar: HTTP/1.0 200 OK
```

---

## 📊 Análisis de Performance

### Lighthouse (Chrome DevTools)

1. Abre DevTools (F12)
2. Ve a la pestaña "Lighthouse"
3. Selecciona:
   - ✅ Performance
   - ✅ Accessibility
   - ✅ Best Practices
   - ✅ SEO
4. Click "Analyze page load"

**Resultados esperados:**

- Performance: >90
- Accessibility: >95
- Best Practices: >90
- SEO: >95

### Verificar Tamaño de Assets

```bash
# Tamaño CSS
du -sh css/                    # ~168KB (desarrollo)
du -sh build/css/main.min.css  # ~36KB (producción)

# Tamaño imágenes
du -sh assets/images/

# Tamaño total
du -sh .
```

---

## 🔐 Seguridad

### Antes de Producción

1. **Cambiar número de teléfono:**

   - Busca: `573001234567`
   - Reemplaza por tu número real

2. **Revisar enlaces externos:**

   ```bash
   grep -r "http://" index.html
   # Asegúrate que sean https://
   ```

3. **Validar datos:**
   ```bash
   cat data/products.json | python3 -m json.tool
   # No debe mostrar errores
   ```

---

## 📚 Recursos Adicionales

### Documentación

- [AUDITORIA-TECNICA.md](AUDITORIA-TECNICA.md) - Análisis completo (31 páginas)
- [CORRECCIONES-COMPLETADAS.md](CORRECCIONES-COMPLETADAS.md) - Qué se corrigió
- [RESUMEN-FINAL.txt](RESUMEN-FINAL.txt) - Resumen visual

### Tecnologías Usadas

- **HTML5** - Semántico
- **CSS3** - ITCSS + BEM
- **JavaScript ES6+** - Módulos nativos
- **No frameworks** - Vanilla JS puro

### Metodologías

- **ITCSS** - 8 capas de CSS
- **BEM** - Block Element Modifier
- **Mobile First** - Progressive enhancement
- **Progressive Enhancement** - Funciona sin JS

---

## 📞 Soporte

Si tienes problemas:

1. **Revisa la documentación** en `/AUDITORIA-TECNICA.md`
2. **Verifica la consola** del navegador (F12)
3. **Busca en los archivos:**
   ```bash
   grep -r "tu-problema" .
   ```

---

## ✅ Checklist de Deployment

Antes de subir a producción:

- [ ] Ejecutar `./build.sh`
- [ ] Probar `/build` localmente
- [ ] Cambiar número de teléfono real
- [ ] Reemplazar imágenes placeholder
- [ ] Verificar todos los enlaces
- [ ] Probar en mobile (Chrome DevTools)
- [ ] Ejecutar Lighthouse (score >90)
- [ ] Verificar Schema Markup (Google Rich Results Test)
- [ ] Probar formulario de contacto
- [ ] Verificar navegación (todas las páginas)

---

**Creado el:** 11 de diciembre de 2025  
**Proyecto:** Filius Food - Chocolatería Artesanal  
**Stack:** HTML5 + CSS3 + Vanilla JavaScript ES6+  
**Estado:** ✅ Listo para producción (9.3/10)
