# 👥 Guía de Colaboración - Filius Food

## 📋 Bienvenido al Proyecto

Has sido invitado a colaborar en **Filius Food**, un proyecto de chocolatería artesanal desarrollado como SPA con PWA.

---

## 🚀 Configuración Inicial

### 1. Aceptar la Invitación

1. Revisa tu email (la dirección con la que te invitaron)
2. Busca el email de GitHub: **"[santi-trujillo] has invited you to collaborate..."**
3. Click en **"View invitation"**
4. Click en **"Accept invitation"**

### 2. Clonar el Repositorio

Abre tu terminal y ejecuta:

```bash
# Clonar el proyecto
git clone https://github.com/santi-trujillo/Filius-food.git

# Entrar al directorio
cd Filius-food

# Ver las ramas disponibles
git branch -a
```

Deberías ver:

```
* main
  remotes/origin/HEAD -> origin/main
  remotes/origin/development
  remotes/origin/main
```

### 3. Cambiar a la Rama de Desarrollo

```bash
# Cambiar a development (rama donde trabajaremos)
git checkout development

# Verificar que estás en development
git branch
```

Deberías ver:

```
* development
  main
```

---

## 🌿 Workflow de Trabajo

### Estructura de Ramas

```
main (producción - NO TOCAR)
  ↓
development (desarrollo colaborativo)
  ↓
feature/tu-funcionalidad (tus cambios)
```

**IMPORTANTE:**

- ❌ **NUNCA** trabajes directamente en `main`
- ❌ **NUNCA** hagas push directo a `main`
- ✅ **SIEMPRE** trabaja en `development` o en ramas `feature/`
- ✅ **SIEMPRE** crea Pull Requests para fusionar cambios

---

## 📝 Flujo de Trabajo Diario

### Opción A: Trabajar Directo en Development (cambios pequeños)

```bash
# 1. Asegurarte de estar en development
git checkout development

# 2. Actualizar con últimos cambios
git pull origin development

# 3. Hacer tus cambios
# (editar archivos en VS Code)

# 4. Ver qué archivos cambiaron
git status

# 5. Añadir cambios al staging
git add .

# 6. Hacer commit con mensaje descriptivo
git commit -m "feat: Descripción de tu cambio"

# 7. Subir a GitHub
git push origin development
```

### Opción B: Crear Rama Feature (cambios grandes/experimentales)

```bash
# 1. Actualizar development primero
git checkout development
git pull origin development

# 2. Crear nueva rama para tu feature
git checkout -b feature/nombre-descriptivo

# Ejemplos de nombres:
# - feature/agregar-carrito-compras
# - feature/optimizar-imagenes
# - feature/nueva-seccion-contacto

# 3. Trabajar en tu feature
# (editar archivos)

# 4. Hacer commits
git add .
git commit -m "feat: Descripción del cambio"

# 5. Subir la rama a GitHub
git push -u origin feature/nombre-descriptivo
```

### Crear Pull Request

1. Ve a: https://github.com/santi-trujillo/Filius-food
2. Verás un banner: **"feature/tu-rama had recent pushes"**
3. Click en **"Compare & pull request"**
4. Configura:
   - **Base:** `development` ← **Compare:** `feature/tu-rama`
5. Escribe:
   - **Título:** Descripción breve del cambio
   - **Descripción:** Explica qué hiciste y por qué
6. Click en **"Create pull request"**
7. Espera a que Santiago lo revise
8. Una vez aprobado, Santiago hará el merge

---

## 📦 Convenciones de Commits

Usa este formato para tus commits:

```
tipo: Descripción corta (máx 50 caracteres)

[Opcional] Descripción larga con más detalles
```

**Tipos de commits:**

- `feat:` - Nueva funcionalidad

  ```bash
  git commit -m "feat: Agregar sistema de búsqueda de productos"
  ```

- `fix:` - Corrección de bug

  ```bash
  git commit -m "fix: Corregir error en carga de imágenes"
  ```

- `style:` - Cambios de formato (CSS, espacios, etc)

  ```bash
  git commit -m "style: Ajustar espaciado del header"
  ```

- `refactor:` - Refactorización de código

  ```bash
  git commit -m "refactor: Mejorar estructura de ProductCatalog"
  ```

- `docs:` - Cambios en documentación

  ```bash
  git commit -m "docs: Actualizar README con instrucciones"
  ```

- `perf:` - Mejoras de rendimiento

  ```bash
  git commit -m "perf: Optimizar lazy loading de imágenes"
  ```

- `test:` - Agregar o modificar tests

  ```bash
  git commit -m "test: Agregar tests para ProductFilter"
  ```

- `chore:` - Tareas de mantenimiento
  ```bash
  git commit -m "chore: Actualizar dependencias"
  ```

---

## 🔄 Sincronizar Cambios

### Actualizar tu Rama con Cambios Remotos

```bash
# Si estás en development
git checkout development
git pull origin development

# Si estás en una feature
git checkout feature/tu-rama
git pull origin development  # Traer cambios de development
```

### Resolver Conflictos

Si hay conflictos al hacer pull:

```bash
# 1. Git te dirá qué archivos tienen conflictos
git status

# 2. Abrir los archivos en conflicto
# Busca las marcas:
<<<<<<< HEAD
Tu código
=======
Código del otro
>>>>>>> origin/development

# 3. Edita manualmente y quédate con el código correcto
# Elimina las marcas <<<<<<< ======= >>>>>>>

# 4. Marcar como resuelto
git add archivo-resuelto.js

# 5. Completar el merge
git commit -m "merge: Resolver conflictos con development"

# 6. Subir
git push origin tu-rama
```

---

## 🛠️ Comandos Git Útiles

### Información

```bash
# Ver estado actual
git status

# Ver historial de commits
git log --oneline --graph --all

# Ver diferencias antes de commit
git diff

# Ver ramas locales y remotas
git branch -a
```

### Deshacer Cambios

```bash
# Descartar cambios en un archivo (antes de add)
git restore archivo.js

# Quitar archivo del staging (después de add, antes de commit)
git restore --staged archivo.js

# Ver último commit
git show
```

### Cambiar de Rama

```bash
# Cambiar a otra rama
git checkout nombre-rama

# Crear y cambiar a nueva rama
git checkout -b nueva-rama
```

### Eliminar Ramas

```bash
# Eliminar rama local (después de fusionar)
git branch -d feature/mi-rama

# Eliminar rama remota
git push origin --delete feature/mi-rama
```

---

## 📂 Estructura del Proyecto

```
Filius-Food/
├── index.html              # SPA principal
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker
├── build.sh                # Script de build
│
├── css/                    # ITCSS Architecture
│   ├── 01-settings/       # Variables, colores
│   ├── 02-tools/          # Mixins, funciones
│   ├── 03-generic/        # Reset, normalize
│   ├── 04-elements/       # HTML elementos base
│   ├── 05-objects/        # Layouts, grids
│   ├── 06-components/     # Componentes UI
│   ├── 07-utilities/      # Helpers, utilities
│   ├── critical.css       # Critical CSS
│   └── main.css           # CSS principal
│
├── js/                     # JavaScript modular
│   ├── components/        # Componentes (Catalog, Cart, etc)
│   ├── config/            # Configuración
│   ├── core/              # Router, State, DOM
│   ├── services/          # API services
│   ├── utils/             # Utilidades (performance, etc)
│   └── main.js            # Entry point
│
├── assets/
│   ├── images/
│   │   └── products/      # Imágenes de productos
│   └── fonts/             # Fuentes
│
├── data/
│   └── products.json      # Catálogo de productos
│
└── docs/                   # Documentación
    ├── README.md
    ├── GUIA-DE-USO.md
    ├── GITHUB-SETUP.md
    └── COLABORACION.md     # Este archivo
```

---

## ✅ Checklist Antes de Hacer Push

- [ ] ¿Probé los cambios localmente?
- [ ] ¿El código funciona sin errores en consola?
- [ ] ¿Actualicé desde origin/development? (`git pull`)
- [ ] ¿El commit tiene un mensaje descriptivo?
- [ ] ¿Estoy en la rama correcta? (development o feature/\*)
- [ ] ¿No hay archivos innecesarios en el commit? (build/, node_modules/)

---

## 🚨 Reglas Importantes

### ❌ NO HACER:

- Commit directo a `main`
- Push forzado (`git push -f`)
- Commit de archivos grandes (>10MB)
- Commit de contraseñas, tokens, API keys
- Commit de carpetas: `node_modules/`, `build/`, `.vscode/`
- Borrar ramas sin confirmar con Santiago

### ✅ SÍ HACER:

- Pull antes de empezar a trabajar
- Commits pequeños y frecuentes
- Mensajes de commit descriptivos
- Code review antes de merge
- Comunicar cambios importantes
- Pedir ayuda si tienes dudas

---

## 🏗️ Build del Proyecto

Para generar la versión optimizada:

```bash
# Ejecutar build
./build.sh

# Esto genera la carpeta build/ con:
# - CSS minificado y comprimido (8KB gzipped)
# - JavaScript minificado
# - Archivos gzip para producción
```

**NOTA:** La carpeta `build/` NO se sube a Git (está en .gitignore)

---

## 📞 Contacto y Ayuda

**Coordinador del Proyecto:** Santiago Trujillo  
**GitHub:** @santi-trujillo  
**Repositorio:** https://github.com/santi-trujillo/Filius-food

**Recursos Git:**

- [GitHub Guides](https://guides.github.com/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Learn Git Branching](https://learngitbranching.js.org/)

---

## 🎯 Siguiente Paso

1. **Acepta la invitación** del email de GitHub
2. **Clona el repositorio**: `git clone https://github.com/santi-trujillo/Filius-food.git`
3. **Cambia a development**: `git checkout development`
4. **¡Empieza a desarrollar!** 🚀

---

**¡Bienvenido al equipo! 🎉**
